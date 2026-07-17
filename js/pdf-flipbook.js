document.addEventListener("DOMContentLoaded", () => {
  const viewer = document.querySelector("[data-pdf-viewer]");
  const bookElement = document.getElementById("book");
  const bookStage = document.querySelector(".book-stage");
  const zoomShell = document.getElementById("bookZoomShell");
  const loadingState = document.getElementById("loadingState");
  const pageCounter = document.getElementById("pageCounter");
  const prevBtn = document.getElementById("btnPrev");
  const nextBtn = document.getElementById("btnNext");
  const zoomInBtn = document.getElementById("btnZoomIn");
  const zoomOutBtn = document.getElementById("btnZoomOut");

  if (!viewer || !bookElement || !window.pdfjsLib || !window.St?.PageFlip) {
    return;
  }

  const pdfPath = viewer.dataset.pdfSrc;
  const renderScale = Number(viewer.dataset.renderScale || 2);
  const isMobileViewer = window.matchMedia("(max-width: 768px)").matches;
  let pdfDoc = null;
  let pageFlip = null;
  let currentZoom = 1;
  let currentPage = 1;
  let baseBookWidth = 0;
  let baseBookHeight = 0;
  let isPanning = false;
  let panStartX = 0;
  let panStartY = 0;
  let panScrollLeft = 0;
  let panScrollTop = 0;
  const renderedPages = new Set();
  const renderingPages = new Set();

  init();

  async function init() {
    try {
      if (!pdfPath) throw new Error("Missing PDF path.");

      pdfDoc = await pdfjsLib.getDocument(pdfPath).promise;
      if (isMobileViewer) {
        createMobileReader();
      } else {
        createPageSkeleton(pdfDoc.numPages);
        createFlipBook();
      }
      await renderAround(1);
      if (loadingState) loadingState.style.display = "none";
      updateCounter(1);
      if (isMobileViewer && pdfDoc.numPages > 3) {
        renderRemainingPages(4, pdfDoc.numPages);
      }
    } catch (error) {
      console.error("PDF flipbook error:", error);
      if (loadingState) {
        loadingState.innerHTML =
          "<p class='flipbook-error'>This PDF could not be loaded.</p>";
      }
    }
  }

  function createMobileReader() {
    viewer.classList.add("is-mobile-reader");
    bookStage.classList.add("mobile-pdf-stage");
    zoomShell.classList.add("mobile-pdf-shell");
    bookElement.classList.add("mobile-pdf-list");
    bookElement.innerHTML = "";

    for (let pageNumber = 1; pageNumber <= pdfDoc.numPages; pageNumber += 1) {
      const page = document.createElement("div");
      page.className = "page-wrapper mobile-page-wrapper";
      page.dataset.pageNumber = String(pageNumber);
      page.innerHTML = `
        <div class="page-loader">
          <i class="fas fa-circle-notch fa-spin"></i>
        </div>
        <canvas id="page-canvas-${pageNumber}" class="page-canvas mobile-page-canvas"></canvas>
      `;
      bookElement.appendChild(page);
    }

    currentZoom = 1;
    applyMobileZoom();
    observeMobilePage();

    if (prevBtn) prevBtn.addEventListener("click", () => goToMobilePage(currentPage - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goToMobilePage(currentPage + 1));
    if (zoomInBtn) zoomInBtn.addEventListener("click", () => setMobileZoom(0.1));
    if (zoomOutBtn) zoomOutBtn.addEventListener("click", () => setMobileZoom(-0.1));
  }

  function createPageSkeleton(numPages) {
    bookElement.innerHTML = "";

    for (let pageNumber = 1; pageNumber <= numPages; pageNumber += 1) {
      const page = document.createElement("div");
      page.className = "page-wrapper";
      page.dataset.pageNumber = String(pageNumber);
      page.innerHTML = `
        <div class="page-loader">
          <i class="fas fa-circle-notch fa-spin"></i>
        </div>
        <canvas id="page-canvas-${pageNumber}" class="page-canvas"></canvas>
      `;
      bookElement.appendChild(page);
    }
  }

  function createFlipBook() {
    const stageRect = bookStage?.getBoundingClientRect();
    const stageStyles = bookStage ? getComputedStyle(bookStage) : null;
    const horizontalPadding =
      parseFloat(stageStyles?.paddingLeft || 0) +
      parseFloat(stageStyles?.paddingRight || 0);
    const verticalPadding =
      parseFloat(stageStyles?.paddingTop || 0) +
      parseFloat(stageStyles?.paddingBottom || 0);
    const availableWidth = Math.max(
      280,
      (stageRect?.width || window.innerWidth) - horizontalPadding
    );
    const availableHeight = Math.max(
      360,
      (stageRect?.height || window.innerHeight) - verticalPadding
    );
    const pageAspectRatio = 0.707;
    const spreadPages = 2;

    let pageHeight = availableHeight * 0.96;
    let pageWidth = pageHeight * pageAspectRatio;

    if (pageWidth * spreadPages > availableWidth * 0.96) {
      pageWidth = (availableWidth * 0.96) / spreadPages;
      pageHeight = pageWidth / pageAspectRatio;
    }

    pageFlip = new St.PageFlip(bookElement, {
      width: Math.floor(pageWidth),
      height: Math.floor(pageHeight),
      size: "fixed",
      minWidth: 220,
      maxWidth: 1600,
      minHeight: 300,
      maxHeight: 2200,
      showCover: true,
      usePortrait: false,
      maxShadowOpacity: 0.45,
      mobileScrollSupport: false,
      flippingTime: 700,
    });

    pageFlip.loadFromHTML(document.querySelectorAll(".page-wrapper"));
    setBaseBookSize();
    applyZoom();

    pageFlip.on("flip", (event) => {
      const pageNumber = event.data + 1;
      updateCounter(pageNumber);
      renderAround(pageNumber);
    });

    if (prevBtn) prevBtn.addEventListener("click", () => pageFlip.flipPrev());
    if (nextBtn) nextBtn.addEventListener("click", () => pageFlip.flipNext());
    if (zoomInBtn) zoomInBtn.addEventListener("click", () => setZoom(0.1));
    if (zoomOutBtn) zoomOutBtn.addEventListener("click", () => setZoom(-0.1));
    addZoomNavigation();
  }

  async function renderAround(pageNumber) {
    if (isMobileViewer) {
      const pages = [pageNumber, pageNumber + 1, pageNumber + 2].filter(
        (page) => page >= 1 && page <= pdfDoc.numPages
      );
      await Promise.all(pages.map((page) => renderPage(page)));
      return;
    }

    const pages = [
      pageNumber - 2,
      pageNumber - 1,
      pageNumber,
      pageNumber + 1,
      pageNumber + 2,
    ].filter((page) => page >= 1 && page <= pdfDoc.numPages);

    await Promise.all(pages.map((page) => renderPage(page)));
  }

  async function renderRemainingPages(start, end) {
    for (let pageNumber = start; pageNumber <= end; pageNumber += 1) {
      await new Promise((resolve) => setTimeout(resolve, 60));
      await renderPage(pageNumber);
    }
  }

  async function renderPage(pageNumber) {
    if (renderedPages.has(pageNumber) || renderingPages.has(pageNumber)) {
      return;
    }

    renderingPages.add(pageNumber);

    try {
      const page = await pdfDoc.getPage(pageNumber);
      const scale = isMobileViewer ? Math.min(renderScale, 1.7) : renderScale;
      const viewport = page.getViewport({ scale });
      const canvas = document.getElementById(`page-canvas-${pageNumber}`);
      const context = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;

      canvas.style.opacity = "1";
      const loader = canvas.parentElement.querySelector(".page-loader");
      if (loader) loader.style.display = "none";
      renderedPages.add(pageNumber);
    } catch (error) {
      console.error(`Page ${pageNumber} render error:`, error);
    } finally {
      renderingPages.delete(pageNumber);
    }
  }

  function updateCounter(pageNumber) {
    if (!pageCounter || !pdfDoc) return;
    const total = pageFlip ? pageFlip.getPageCount() : pdfDoc.numPages;
    pageCounter.innerText =
      pageNumber === 1 ? `Cover / ${total}` : `Page ${pageNumber} of ${total}`;
  }

  function setZoom(delta) {
    currentZoom = Math.min(2.4, Math.max(0.7, currentZoom + delta));
    applyZoom(true);
  }

  function addZoomNavigation() {
    if (!bookStage) return;

    bookStage.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        const direction = event.deltaY < 0 ? 1 : -1;
        setZoom(direction * 0.1);
      },
      { passive: false, capture: true }
    );

    bookStage.addEventListener("pointerdown", (event) => {
      if (currentZoom <= 1 || event.button !== 0) return;

      event.preventDefault();
      event.stopPropagation();
      isPanning = true;
      panStartX = event.clientX;
      panStartY = event.clientY;
      panScrollLeft = bookStage.scrollLeft;
      panScrollTop = bookStage.scrollTop;
      bookStage.classList.add("is-panning");
      bookStage.setPointerCapture(event.pointerId);
    }, true);

    bookStage.addEventListener("pointermove", (event) => {
      if (!isPanning) return;

      event.preventDefault();
      event.stopPropagation();
      bookStage.scrollLeft = panScrollLeft - (event.clientX - panStartX);
      bookStage.scrollTop = panScrollTop - (event.clientY - panStartY);
    }, true);

    bookStage.addEventListener("pointerup", endPan, true);
    bookStage.addEventListener("pointercancel", endPan, true);
    bookStage.addEventListener("lostpointercapture", endPan, true);
    bookStage.addEventListener("dblclick", () => {
      currentZoom = 1;
      applyZoom(true);
    });
  }

  function endPan() {
    if (!isPanning) return;
    isPanning = false;
    bookStage.classList.remove("is-panning");
  }

  function setBaseBookSize() {
    const wrapper = bookElement.querySelector(".stf__wrapper");
    const rect = wrapper?.getBoundingClientRect();
    baseBookWidth = rect?.width || bookElement.offsetWidth;
    baseBookHeight = rect?.height || bookElement.offsetHeight;
  }

  function applyZoom(keepCenter = false) {
    if (!zoomShell || !bookStage) {
      bookElement.style.transform = `scale(${currentZoom})`;
      return;
    }

    const previousCenterX = bookStage.scrollLeft + bookStage.clientWidth / 2;
    const previousCenterY = bookStage.scrollTop + bookStage.clientHeight / 2;
    const previousZoom = Number(bookStage.dataset.zoom || 1);

    zoomShell.style.width = `${baseBookWidth * currentZoom}px`;
    zoomShell.style.height = `${baseBookHeight * currentZoom}px`;
    bookElement.style.transform = `scale(${currentZoom})`;
    bookStage.classList.toggle("is-zoomed", currentZoom > 1);

    if (keepCenter && previousZoom > 0) {
      const ratio = currentZoom / previousZoom;
      bookStage.scrollLeft = previousCenterX * ratio - bookStage.clientWidth / 2;
      bookStage.scrollTop = previousCenterY * ratio - bookStage.clientHeight / 2;
    }

    bookStage.dataset.zoom = String(currentZoom);
  }

  function observeMobilePage() {
    if (!window.IntersectionObserver) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) return;
        currentPage = Number(visibleEntry.target.dataset.pageNumber || 1);
        updateCounter(currentPage);
        renderAround(currentPage);
      },
      { root: bookStage, threshold: [0.45, 0.65, 0.85] }
    );

    document.querySelectorAll(".mobile-page-wrapper").forEach((page) => {
      observer.observe(page);
    });
  }

  function goToMobilePage(pageNumber) {
    const nextPage = Math.min(pdfDoc.numPages, Math.max(1, pageNumber));
    const page = document.querySelector(
      `.mobile-page-wrapper[data-page-number="${nextPage}"]`
    );

    if (!page) return;
    currentPage = nextPage;
    updateCounter(currentPage);
    renderAround(currentPage);
    page.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  function setMobileZoom(delta) {
    currentZoom = Math.min(1.8, Math.max(0.85, currentZoom + delta));
    applyMobileZoom();
  }

  function applyMobileZoom() {
    bookElement.style.width = `${Math.round(currentZoom * 100)}%`;
    bookStage.classList.toggle("is-zoomed", currentZoom > 1);
    bookStage.dataset.zoom = String(currentZoom);
  }
});

