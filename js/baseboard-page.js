document.addEventListener('DOMContentLoaded', () => {
    const productImage = document.getElementById('baseboardProductImage');
    const finishTooltip = document.getElementById('finishTooltip');
    const swatches = Array.from(document.querySelectorAll('.finish-swatch'));

    if (!productImage || !finishTooltip || !swatches.length) return;

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
            productImage.alt = `${swatch.dataset.colorName || 'Selected finish'} Erdoor baseboard`;
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
});
