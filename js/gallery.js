document.addEventListener("DOMContentLoaded", () => {
  const images = [
    { src: "assets/gallery/soho.jpg", alt: "Soho interior door in a contemporary space", label: "Soho" },
    { src: "assets/gallery/vista.jpg", alt: "Vista interior door design", label: "Vista" },
    { src: "assets/gallery/vouage kapi.jpg", alt: "Vouge interior door design", label: "Vouge" },
    { src: "assets/gallery/zen.jpg", alt: "Zen interior door design", label: "Zen" },
    { src: "assets/gallery/signatura.jpg", alt: "Signatura interior door design", label: "Signatura" },
    { src: "assets/gallery/vera.jpg", alt: "Vera interior door design", label: "Vera" },
    { src: "assets/gallery/luna.jpg", alt: "Luna interior door design", label: "Luna" },
    { src: "assets/gallery/4.jpg", alt: "Erdoor interior project inspiration", label: "Project inspiration" },
    { src: "assets/gallery/baseboard.jpg", alt: "Erdoor coordinated baseboard finish", label: "Coordinated details" },
    { src: "assets/gallery/beyaz-kapi.png", alt: "White Erdoor interior door", label: "White finish" },
    { src: "assets/gallery/maplewood-kapi.png", alt: "Erdoor door in maple wood finish", label: "Maple wood" },
    { src: "assets/gallery/whiteteak-kapi-removebg-preview.png", alt: "Erdoor door in white teak finish", label: "White teak" },
    { src: "assets/gallery/ceviz-kapi-removebg-preview.png", alt: "Erdoor door in walnut finish", label: "Walnut" },
    { src: "assets/gallery/disbudak-kapi-removebg-preview.png", alt: "Erdoor door in ash wood finish", label: "Ash wood" },
    { src: "assets/gallery/koyu-ceviz-kapi-removebg-preview.png", alt: "Erdoor door in dark walnut finish", label: "Dark walnut" }
  ];

  const batchSize = 6;
  const grid = document.getElementById("galleryGrid");
  const loadMore = document.getElementById("loadMoreBtn");
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImage = lightbox?.querySelector("[data-lightbox-image]");
  const lightboxCaption = lightbox?.querySelector("[data-lightbox-caption]");
  let visibleCount = 0;
  let activeIndex = 0;

  if (!grid) return;

  const renderMore = () => {
    const nextCount = Math.min(visibleCount + batchSize, images.length);
    const fragment = document.createDocumentFragment();

    for (let index = visibleCount; index < nextCount; index += 1) {
      const image = images[index];
      const button = document.createElement("button");
      button.type = "button";
      button.className = "gallery-item";
      button.dataset.galleryIndex = String(index);
      button.setAttribute("aria-label", `Open ${image.label} image`);
      button.innerHTML = `<img src="${image.src}" alt="${image.alt}" loading="lazy"><span>${image.label}</span>`;
      fragment.appendChild(button);
    }

    grid.appendChild(fragment);
    visibleCount = nextCount;
    if (loadMore) loadMore.hidden = visibleCount >= images.length;
  };

  const showImage = (index) => {
    activeIndex = (index + images.length) % images.length;
    const image = images[activeIndex];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.label;
  };

  const openLightbox = (index) => {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    showImage(index);
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    lightbox.querySelector("[data-lightbox-close]")?.focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
  };

  grid.addEventListener("click", (event) => {
    const item = event.target.closest("[data-gallery-index]");
    if (item) openLightbox(Number(item.dataset.galleryIndex));
  });

  loadMore?.addEventListener("click", renderMore);
  lightbox?.querySelector("[data-lightbox-close]")?.addEventListener("click", closeLightbox);
  lightbox?.querySelector("[data-lightbox-prev]")?.addEventListener("click", () => showImage(activeIndex - 1));
  lightbox?.querySelector("[data-lightbox-next]")?.addEventListener("click", () => showImage(activeIndex + 1));
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox || lightbox.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showImage(activeIndex - 1);
    if (event.key === "ArrowRight") showImage(activeIndex + 1);
  });

  renderMore();
});
