// Function to load external HTML files
function loadComponent(elementId, filePath) {
    return fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            const placeholder = document.getElementById(elementId);
            if (!placeholder) return;
            placeholder.innerHTML = data;

            if (filePath === 'header.html') {
                initHeaderLogic();
                initLanguageLogic();
            }
        })
        .catch(error => console.error('Error loading component:', error));
}

function initHeaderLogic() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!mobileToggle || !navLinks) return;

    mobileToggle.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = '';
            navLinks.style.flexDirection = '';
            navLinks.style.position = '';
            navLinks.style.top = '';
            navLinks.style.left = '';
            navLinks.style.width = '';
            navLinks.style.background = '';
            navLinks.style.padding = '';
            navLinks.style.boxShadow = '';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'white';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        }
    });
}

const translations = {
    en: {
        menu_products: 'PRODUCTS',
        menu_resource: 'RESOURCE',
        menu_about: 'ABOUT US',
        menu_contact: 'CONTACT',
        menu_faq: 'FAQ',
    },
    es: {
        menu_products: 'PRODUCTOS',
        menu_resource: 'RECURSOS',
        menu_about: 'SOBRE NOSOTROS',
        menu_contact: 'CONTACTO',
        menu_faq: 'PREGUNTAS',
    },
};

function initLanguageLogic() {
    const langBtns = document.querySelectorAll('.lang-btn');

    langBtns.forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault();
            langBtns.forEach(item => item.classList.remove('active'));
            btn.classList.add('active');
            translatePage(btn.getAttribute('data-lang'));
        });
    });
}

function translatePage(lang) {
    const dictionary = translations[lang];
    if (!dictionary) return;

    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (dictionary[key]) {
            element.textContent = dictionary[key];
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Load Header and Footer
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');
});
