const ERDOOR_RELATED_POOL = {
    soho: {
        name: 'SOHO',
        image: 'assets/products/soho.jpg',
        href: 'soho-door.html',
        objectClass: 'object-right',
        description: 'A flawless surface and elegant simplicity for sophisticated modern spaces.',
    },
    vera: {
        name: 'VERA',
        image: 'assets/products/vera.jpg',
        href: 'vera-door.html',
        objectClass: 'object-right',
        description: 'A prestigious profile with balanced lines and timeless interior presence.',
    },
    vista: {
        name: 'VISTA',
        image: 'assets/products/vista.jpg',
        href: 'vista-door.html',
        description: 'A clean modern door enhanced with a sleek detail line for refined spaces.',
    },
    zen: {
        name: 'ZEN',
        image: 'assets/products/zen.jpg',
        href: 'zen-door.html',
        objectClass: 'object-right',
        description: 'Soft geometry and quiet detail create a composed architectural rhythm.',
    },
    vouge: {
        name: 'VOUGE',
        image: 'assets/products/vouage kapi.jpg',
        href: 'vouge-door.html',
        description: 'Defined lines and balanced proportions enhance the perception of space.',
    },
    luna: {
        name: 'LUNA',
        image: 'assets/products/luna.jpg',
        href: 'luna-door.html',
        description: 'A quiet architectural signature with refined movement and visual continuity.',
    },
    signatura: {
        name: 'SIGNATURA',
        image: 'assets/products/signatura.jpg',
        href: 'signatura-door.html',
        description: 'Advanced protection and refined aesthetics brought together with confidence.',
    },
};

const ERDOOR_DOORS = {
    soho: {
        name: 'SOHO',
        description: 'With the flawless surface and elegant simplicity, SOHO transforms living spaces into a sophisticated and elite atmosphere. Its timeless minimalism seamlessly integrates with any interior design.',
        images: doorImages('Soho', 'Soho'),
        relatedKeys: ['vera', 'vista', 'zen'],
    },
    vera: {
        name: 'VERA',
        description: 'It presents a harmonious blend of modern and classic aesthetics. Flawless craftsmanship and meticulous attention to detail impart a distinguished presence to any space. Its elegant design adds a prestigious character to interiors.',
        images: doorImages('Vera', 'Vera'),
        relatedKeys: ['soho', 'vista', 'signatura'],
    },
    vista: {
        name: 'VISTA',
        description: 'Featuring a clean surface complemented by a sleek aluminum line, VISTA brings contemporary and refined aesthetics to interiors. Its elegant line offers a simple yet striking presence that seamlessly complements any decor style.',
        images: doorImages('Vista', 'Vista'),
        relatedKeys: ['soho', 'vera', 'zen'],
    },
    vouge: {
        name: 'VOUGE',
        description: 'Defined lines and balanced proportions enhance the perception of space. More than a passage, the door becomes a focal point that shapes the room identity. It carries a quiet yet commanding presence.',
        images: doorImages('Vouge', 'Vouge'),
        relatedKeys: ['vista', 'luna', 'signatura'],
    },
    zen: {
        name: 'ZEN',
        description: 'The design gives the door a distinctive character, while balanced lines and coherent planes create a smooth rhythm within the space. Thoughtfully crafted details make the door a feature that enhances both visual appeal and spatial experience.',
        images: doorImages('Zen', 'Zen'),
        relatedKeys: ['soho', 'vista', 'luna'],
    },
    luna: {
        name: 'LUNA',
        description: 'Its refined movement system gently orchestrates the rhythm of the space. Opening with a sense of expansion and closing with impeccable visual continuity, Luna becomes a silent architectural signature rather than a mere door.',
        images: {
            maple: 'assets/doors/Luna/Luna-Maple.png',
            ash: 'assets/doors/Luna/Luna-AshWood.png',
            anthracite: 'assets/doors/Luna/Luna-Anthracite.png',
            whiteTeak: 'assets/doors/Luna/Luna-WhiteTeak.png',
            italianChestnut: 'assets/doors/Luna/Luna-ItalianChestnut.png',
            darkChestnut: 'assets/doors/Luna/Luna-DarkChestnut.png',
        },
        relatedKeys: ['soho', 'vista', 'zen'],
    },
    signatura: {
        name: 'SIGNATURA',
        description: 'SIGNATURA merges advanced protection with refined aesthetic. Its fire-resistant design instills a sense of security, while its elegant form adds a quiet touch of prestige to any interior.',
        images: doorImages('Signatura', 'Signatura'),
        relatedKeys: ['soho', 'vera', 'luna'],
    },
};

function doorImages(folder, prefix) {
    return {
        maple: `assets/doors/${folder}/${prefix}-MapleWood.png`,
        ash: `assets/doors/${folder}/${prefix}-AshWood.png`,
        anthracite: `assets/doors/${folder}/${prefix}-Anthracite.png`,
        whiteTeak: `assets/doors/${folder}/${prefix}-WhiteTeak.png`,
        italianChestnut: `assets/doors/${folder}/${prefix}-ItalianChestnut.png`,
        darkChestnut: `assets/doors/${folder}/${prefix}-DarkChestnut.png`,
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const key = document.body.dataset.door;
    const config = ERDOOR_DOORS[key];
    if (!config) return;

    renderDoorPage({
        ...config,
        related: config.relatedKeys.map((relatedKey) => ERDOOR_RELATED_POOL[relatedKey]),
    });
});
