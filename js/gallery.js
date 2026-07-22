document.addEventListener("DOMContentLoaded", () => {
  const images = [
    { src: "assets/carousel/slider.png", alt: "Erdoor premium composite door collection presentation", label: "Collection presentation", category: "fairs" },
    { src: "assets/carousel/carousel-image-fire-rated.png", alt: "Erdoor fire-rated door exhibition presentation", label: "Fire-rated presentation", category: "fairs" },
    { src: "assets/carousel/tall-door.png", alt: "Erdoor tall door product presentation", label: "Tall door presentation", category: "fairs" },
    { src: "assets/carousel/wider-locations.png", alt: "Erdoor wide opening product presentation", label: "Wide opening presentation", category: "fairs" },
    { src: "assets/gallery/soho.jpg", alt: "Soho door exhibition display", label: "Soho display", category: "doors" },
    { src: "assets/gallery/vista.jpg", alt: "Vista door exhibition display", label: "Vista display", category: "doors" },
    { src: "assets/gallery/vouage kapi.jpg", alt: "Vouge door exhibition display", label: "Vouge display", category: "doors" },
    { src: "assets/gallery/zen.jpg", alt: "Zen door exhibition display", label: "Zen display", category: "doors" },
    { src: "assets/gallery/signatura.jpg", alt: "Signatura fire-resistant door exhibition display", label: "Signatura display", category: "doors" },
    { src: "assets/gallery/vera.jpg", alt: "Vera door exhibition display", label: "Vera display", category: "doors" },
    { src: "assets/gallery/luna.jpg", alt: "Luna door exhibition display", label: "Luna display", category: "doors" },
    { src: "assets/gallery/4.jpg", alt: "Erdoor doors installed in a coordinated interior", label: "Interior application", category: "doors" },
    { src: "assets/gallery/baseboard.jpg", alt: "Erdoor coordinated baseboard product display", label: "Baseboard display", category: "doors" },
    { src: "assets/about-us/Turkiye-fabrika.JPG", alt: "Ergünbaş Group production facility in Türkiye", label: "Türkiye production campus", category: "group" },
    { src: "assets/about-us/cezayir-fabrika.JPG", alt: "Ergünbaş Group production facility in Algeria", label: "Algeria production campus", category: "group" }
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
