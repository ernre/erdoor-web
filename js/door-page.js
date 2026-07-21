const ERDOOR_FINISHES = [
    { name: 'Straight White', colorImage: 'assets/colors/Straight-White.png', key: 'straightWhite' },
    { name: 'Ash Wood', colorImage: 'assets/colors/ashwoodcolor.avif', key: 'ash' },
    { name: 'Blue Slate', colorImage: 'assets/colors/blue-slate.png', key: 'blueSlate' },
    { name: 'White Teak', colorImage: 'assets/colors/whiteteakcolor.avif', key: 'whiteTeak' },
    { name: 'Italian Chestnut', colorImage: 'assets/colors/italian-nut.png', key: 'italianChestnut' },
    { name: 'Dark Chestnut', colorImage: 'assets/colors/dark-nut.png', key: 'darkChestnut' },
];

function renderDoorPage(config) {
    const root = document.getElementById('doorPageRoot');
    if (!root || !config) return;

    const finishes = ERDOOR_FINISHES.map((finish, index) => {
        const doorImage = config.images[finish.key];
        return `
            <button type="button" class="finish-swatch h-16 w-16 overflow-hidden rounded-md bg-white shadow-sm ${index === 0 ? 'ring-2 ring-gray-950' : 'ring-1 ring-gray-200'} ring-offset-2 transition hover:-translate-y-0.5 hover:shadow-md sm:h-20 sm:w-20" aria-label="${finish.name} finish" data-door-image="${doorImage}" data-color-name="${finish.name}">
                <img src="${finish.colorImage}" alt="${finish.name} color texture" class="h-full w-full object-cover">
            </button>
        `;
    }).join('');

    const relatedProducts = config.related.map((item) => `
        <article class="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200">
            <img src="${item.image}" alt="${item.name} interior door" class="h-64 w-full object-cover ${item.objectClass || ''}">
            <div class="flex flex-1 flex-col p-5">
                <h3 class="text-xl font-bold text-gray-950">${item.name}</h3>
                <p class="mt-3 flex-1 text-sm leading-relaxed text-gray-600">${item.description}</p>
                <a href="${item.href}" class="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-950 px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-gray-950 hover:text-white">Learn More</a>
            </div>
        </article>
    `).join('');

    root.innerHTML = `
        <section class="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 xl:py-20">
            <div class="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-[380px] xl:max-w-md">
                <div class="aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-50 shadow-2xl shadow-gray-200/80">
                    <img id="productImage" src="${config.images.straightWhite}" alt="${config.name} Premium Straight White finish door" class="h-full w-full object-contain transition-opacity duration-300">
                </div>
            </div>

            <div class="mx-auto w-full max-w-xl lg:mx-0">
                <p class="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">Interior Door Collection</p>
                <h1 class="font-felix text-4xl leading-tight text-gray-950 sm:text-5xl lg:text-6xl">${config.name}</h1>
                <p class="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl lg:leading-loose">${config.description}</p>

                <div class="mt-9">
                    <h2 class="text-sm font-semibold uppercase tracking-[0.22em] text-gray-500">Select Finish</h2>
                    <div class="mt-4 grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-4">
                        ${finishes}
                    </div>
                </div>

                <div class="mt-10">
                    <a href="contact.html" class="inline-flex w-full items-center justify-center rounded-md bg-gray-950 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#c0392b] sm:w-auto">
                        Request a Quote
                    </a>
                </div>
            </div>
        </section>

        <section class="mx-auto max-w-7xl border-t border-gray-200 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
            <div class="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] lg:gap-16 xl:gap-24">
                <div class="w-full">
                <p class="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Technical Details</p>
                <h2 class="font-felix text-3xl text-gray-950 sm:text-4xl">Specifications</h2>

                <div class="mt-7 w-full overflow-hidden rounded-lg text-left">
                    <div class="grid grid-cols-[minmax(120px,0.85fr)_minmax(0,1.15fr)] gap-3 rounded-md px-3 py-2.5 text-sm transition hover:bg-gray-50 sm:px-4 sm:text-base">
                        <span class="font-medium text-gray-500">Door Type</span>
                        <span class="text-right font-semibold text-gray-900">Interior Door</span>
                    </div>
                    <div class="grid grid-cols-[minmax(120px,0.85fr)_minmax(0,1.15fr)] gap-3 rounded-md px-3 py-2.5 text-sm transition hover:bg-gray-50 sm:px-4 sm:text-base">
                        <span class="font-medium text-gray-500">Slab Construction</span>
                        <span class="text-right font-semibold text-gray-900">Solid Core</span>
                    </div>
                    <div class="grid grid-cols-[minmax(120px,0.85fr)_minmax(0,1.15fr)] gap-3 rounded-md px-3 py-2.5 text-sm transition hover:bg-gray-50 sm:px-4 sm:text-base">
                        <span class="font-medium text-gray-500">Slab Height</span>
                        <span class="text-right font-semibold text-gray-900">80", 84", 96"</span>
                    </div>
                    <div class="grid grid-cols-[minmax(120px,0.85fr)_minmax(0,1.15fr)] gap-3 rounded-md px-3 py-2.5 text-sm transition hover:bg-gray-50 sm:px-4 sm:text-base">
                        <span class="font-medium text-gray-500">Slab Width</span>
                        <span class="text-right font-semibold text-gray-900">24", 26", 28", 30", 32", 34", 36"</span>
                    </div>
                    <div class="grid grid-cols-[minmax(120px,0.85fr)_minmax(0,1.15fr)] gap-3 rounded-md px-3 py-2.5 text-sm transition hover:bg-gray-50 sm:px-4 sm:text-base">
                        <span class="font-medium text-gray-500">Slab Thickness</span>
                        <span class="text-right font-semibold text-gray-900">1-5/8"</span>
                    </div>
                    <div class="grid grid-cols-[minmax(120px,0.85fr)_minmax(0,1.15fr)] gap-3 rounded-md px-3 py-2.5 text-sm transition hover:bg-gray-50 sm:px-4 sm:text-base">
                        <span class="font-medium text-gray-500">Jamb Width</span>
                        <span class="text-right font-semibold text-gray-900">3-15/16" - 5-1/2" - 7-7/8"</span>
                    </div>
                    <div class="grid grid-cols-[minmax(120px,0.85fr)_minmax(0,1.15fr)] gap-3 rounded-md px-3 py-2.5 text-sm transition hover:bg-gray-50 sm:px-4 sm:text-base">
                        <span class="font-medium text-gray-500">Jamb Thickness</span>
                        <span class="text-right font-semibold text-gray-900">1-3/8"</span>
                    </div>
                    <div class="grid grid-cols-[minmax(120px,0.85fr)_minmax(0,1.15fr)] gap-3 rounded-md px-3 py-2.5 text-sm transition hover:bg-gray-50 sm:px-4 sm:text-base">
                        <span class="font-medium text-gray-500">Casing (Adjustable)</span>
                        <span class="text-right font-semibold text-gray-900">3-1/8" - 3-15/16" - 5-7/8"</span>
                    </div>
                </div>
                </div>

                <button type="button" class="detail-lightbox-trigger group mx-auto block w-full max-w-[430px] overflow-hidden rounded-lg bg-gray-50 shadow-xl shadow-gray-200/70 transition hover:-translate-y-1 hover:shadow-2xl lg:mx-0 lg:justify-self-end" data-lightbox-src="assets/gallery/kapi-ozellik.png" aria-label="Open technical feature diagram">
                    <img src="assets/gallery/kapi-ozellik.png" alt="${config.name} Premium technical feature diagram" class="block h-auto w-full object-contain transition duration-300 group-hover:scale-[1.02]">
                </button>
            </div>
        </section>

        <section class="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 xl:pb-20">
            <div class="rounded-lg bg-gray-50 px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
                <div class="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p class="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Explore More</p>
                        <h2 class="font-felix text-3xl text-gray-950 sm:text-4xl">Related Products</h2>
                    </div>
                </div>

                <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                    ${relatedProducts}
                </div>
            </div>
        </section>
    `;

    initDoorPageInteractions();
}

function initDoorPageInteractions() {
    const productImage = document.getElementById('productImage');
    const finishTooltip = document.getElementById('finishTooltip');
    const swatches = Array.from(document.querySelectorAll('.finish-swatch'));
    const imageLightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const detailImages = Array.from(document.querySelectorAll('.detail-lightbox-trigger'));
    let currentImage = productImage.getAttribute('src');
    let swapTimer;

    const activateSwatch = (swatch) => {
        const nextImage = swatch.dataset.doorImage;
        if (!nextImage || nextImage === currentImage) return;

        window.clearTimeout(swapTimer);
        currentImage = nextImage;
        productImage.classList.add('opacity-0');

        swatches.forEach((button) => {
            button.classList.remove('ring-2', 'ring-gray-950');
            button.classList.add('ring-1', 'ring-gray-200');
        });
        swatch.classList.remove('ring-1', 'ring-gray-200');
        swatch.classList.add('ring-2', 'ring-gray-950');

        swapTimer = window.setTimeout(() => {
            productImage.src = nextImage;
            productImage.classList.remove('opacity-0');
        }, 150);
    };

    const moveTooltip = (event, swatch) => {
        const offset = 14;
        finishTooltip.textContent = swatch.dataset.colorName || 'Finish';
        finishTooltip.classList.remove('invisible', 'opacity-0');
        finishTooltip.classList.add('opacity-100');

        const tooltipWidth = finishTooltip.offsetWidth;
        const tooltipHeight = finishTooltip.offsetHeight;
        const maxLeft = window.innerWidth - tooltipWidth - 8;
        const maxTop = window.innerHeight - tooltipHeight - 8;
        const left = Math.min(Math.max(event.clientX + offset, 8), maxLeft);
        const top = Math.min(Math.max(event.clientY + offset, 8), maxTop);

        finishTooltip.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    };

    const hideTooltip = () => {
        finishTooltip.classList.add('invisible', 'opacity-0');
        finishTooltip.classList.remove('opacity-100');
    };

    swatches.forEach((swatch) => {
        swatch.addEventListener('mouseenter', () => activateSwatch(swatch));
        swatch.addEventListener('mousemove', (event) => {
            activateSwatch(swatch);
            moveTooltip(event, swatch);
        });
        swatch.addEventListener('mouseleave', hideTooltip);
        swatch.addEventListener('pointerenter', () => activateSwatch(swatch));
        swatch.addEventListener('pointerleave', hideTooltip);
        swatch.addEventListener('mouseout', hideTooltip);
        swatch.addEventListener('click', () => activateSwatch(swatch));
        swatch.addEventListener('touchstart', () => activateSwatch(swatch), { passive: true });
    });

    document.addEventListener('mousemove', (event) => {
        if (!event.target.closest('.finish-swatch')) {
            hideTooltip();
        }
    });

    swatches.forEach((swatch) => {
        const image = new Image();
        image.src = swatch.dataset.doorImage;
    });

    const closeLightbox = () => {
        imageLightbox.classList.add('hidden');
        imageLightbox.classList.remove('flex');
        lightboxImage.src = '';
        document.body.classList.remove('overflow-hidden');
    };

    detailImages.forEach((button) => {
        button.addEventListener('click', () => {
            const image = button.querySelector('img');
            lightboxImage.src = button.dataset.lightboxSrc || image.src;
            lightboxImage.alt = image.alt || 'Expanded product detail';
            imageLightbox.classList.remove('hidden');
            imageLightbox.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    imageLightbox.addEventListener('click', (event) => {
        if (event.target === imageLightbox) closeLightbox();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !imageLightbox.classList.contains('hidden')) {
            closeLightbox();
        }
    });
}
