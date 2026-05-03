/**
 * LEKIE ART - CORE LOGIC
 * Artist: Olamilekan Muraina
 * Implements: Lightbox, Scroll Animations, Language Detection, 
 * Currency Conversion, Background Particles, Pencil Animation, and Social Interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    initBackgroundExperience();
    initGallery();
    initScrollAnimations();
    initLightbox();
    initLanguage();
    initCurrency();
    initMobileMenu();
    initSocialInteractions();
}

/* --- 1. BACKGROUND EXPERIENCE (Particles & Pencil) --- */

function initBackgroundExperience() {
    // Particles
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random styling for particles
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.opacity = Math.random() * 0.5;
        
        // Animation
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        particle.style.animation = `floatParticle ${duration}s linear infinite ${delay}s`;
        
        particlesContainer.appendChild(particle);
    }

    // Pencil Drawing Animation (Canvas)
    const canvas = document.getElementById('pencil-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    let lines = [];
    const maxLines = 5;

    class Line {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.length = Math.random() * 100 + 50;
            this.angle = Math.random() * Math.PI * 2;
            this.speed = Math.random() * 0.5 + 0.1;
            this.opacity = 0;
            this.maxOpacity = Math.random() * 0.3;
            this.life = 0;
            this.maxLife = Math.random() * 200 + 100;
        }
        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            const endX = this.x + Math.cos(this.angle) * this.length;
            const endY = this.y + Math.sin(this.angle) * this.length;
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            // Life cycle
            if (this.life < 50) this.opacity += this.maxOpacity / 50;
            if (this.life > this.maxLife - 50) this.opacity -= this.maxOpacity / 50;
            
            this.life++;
            if (this.life >= this.maxLife) this.reset();
        }
    }

    for (let i = 0; i < maxLines; i++) lines.push(new Line());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        lines.forEach(line => line.draw());
        requestAnimationFrame(animate);
    }
    animate();
}

// Add particle animation style dynamically
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: absolute;
        background: white;
        border-radius: 50%;
        pointer-events: none;
    }
    @keyframes floatParticle {
        0% { transform: translateY(0) translateX(0); }
        33% { transform: translateY(-50px) translateX(20px); }
        66% { transform: translateY(20px) translateX(-20px); }
        100% { transform: translateY(0) translateX(0); }
    }
`;
document.head.appendChild(style);

/* --- 2. DYNAMIC GALLERY SYSTEM --- */

const artworks = [
    {
        id: 1,
        title: "The Silent Gaze",
        desc: "Graphite on paper. A study of emotion and stillness.",
        price: 450000, // Base price in NGN
        url: "https://lh3.googleusercontent.com/pw/AP1GczMGSm-bZeTIZb7qQDPMNrzIxMgTmLqGm0sz9hpYajtfH-E4pO7nDr1UjZapRUQzbI-PKHCGfVksMRycrynv6yRExTO1uNEaJqpLobN8vYp6CTWjcqE=w1200"
    },
    {
        id: 2,
        title: "Fragments of Memory",
        desc: "Charcoal and white chalk. Capturing the fading nature of past moments.",
        price: 380000,
        url: "https://lh3.googleusercontent.com/pw/AP1GczP4dQIBBVotS_jtjJnp9sKLzruAUqhMxHumhxBW5XoSNMDYR--uMN8Xb8tub9FPpuq5xAyDcCZ65u-YtlrCeI_0YnhIMIGHE0jyleSlO87Er714FqY=w1200"
    },
    {
        id: 3,
        title: "Shadow's Embrace",
        desc: "Deep charcoal study. The weight of solitude.",
        price: 520000,
        url: "https://lh3.googleusercontent.com/pw/AP1GczOhOQx1TqAq3IYuMtusn6HvGn8IPzCKhoER8eDU8Q35Tne_iFlpS5HgGekLYIYyOFBvieD8pVban8BmMFfhyf6XwjuzK44pQVUGz4OlUYStZcAaCZU=w1200"
    },
    {
        id: 4,
        title: "The Unspoken",
        desc: "Mixed media on textured paper. A portrait of what remains unsaid.",
        price: 410000,
        url: "https://lh3.googleusercontent.com/pw/AP1GczOyTUkYgCdMAAW0nb-kPETmjZQ6nS9F9ZR981XqrOAu-ApGogU2wYqlQsH4CCnKzO5dSbti_lu9Y9EFn6ltyCtebEOiIxyyzR5FXuZU__qgKSHE90k=w1200"
    },
    {
        id: 5,
        title: "Ethereal Form",
        desc: "Soft graphite. The boundary between flesh and light.",
        price: 360000,
        url: "https://lh3.googleusercontent.com/pw/AP1GczMyXDhuj4c7VA0lA7_V4XqohxdsrXSnK5e8oRMh91q67Pxgds5a7VrWBV5Am5s_yAcayJm-RN2yfS0JMCl5hkZA_pIr6pYq9JxaNamobTI1npdFzFA=w1200"
    },
    {
        id: 6,
        title: "Nocturne",
        desc: "Heavy charcoal. The beauty found in absolute darkness.",
        price: 600000,
        url: "https://lh3.googleusercontent.com/pw/AP1GczPfgz-jIjTgGUKhU_C1srDqM2xaWS7JGQSInTe4zizJkL1stZHwyWzeoyZNJaxFw3fRZ1er0H-H7AVuzyKKXugOERjr8QGwgoOd9oVR9FkVLeJUllE=w1200"
    },
    {
        id: 7,
        title: "Soul Reflection",
        desc: "Graphite portrait. Capturing the essence of the subject.",
        price: 480000,
        url: "https://lh3.googleusercontent.com/pw/AP1GczOp6mVR5m3rYESQSz1Fwq_dhLqTtGTYJh9OmQr4OWbXCoJGEDuN9-AK6X-k-knfZ_CgiFwagVFB5lppizaErkFCWWA6zMkNwBa7HOG9CW4wLmn8vSQ=w1200"
    },
    {
        id: 8,
        title: "The Observer",
        desc: "Charcoal on paper. A study of focus and depth.",
        price: 420000,
        url: "https://lh3.googleusercontent.com/pw/AP1GczNXKIrjcWaDlU6_I6J2uFyj-oNZmxWX3KCpeeV_DKIRBzdYQ91--YM14T6WE6z7wU1Xh4WwR_BuTlD75GimyEUWgje7oebJC-ZVJA9GLxTlfH37SYk=w1200"
    },
    {
        id: 9,
        title: "The Vision",
        desc: "Detailed eye study. The window to the soul.",
        price: 250000,
        url: "https://lh3.googleusercontent.com/pw/AP1GczN5orZOTtpCyKkMZj3hEizyuI9ktCQT-eNdh855owF99CGgodp7LaMwEh-S6ZYv-NTKVOg2O5Fuvl4v5ON1cXhYsXpGOQqnmjH-RvenU6ZutZyPQzo=w1200"
    }
];

function initGallery() {
    const galleryGrid = document.getElementById('main-gallery');
    
    artworks.forEach(art => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${art.url}" alt="${art.title}" loading="lazy">
            <div class="item-info">
                <h3>${art.title}</h3>
                <p>${art.desc.substring(0, 40)}...</p>
            </div>
        `;
        item.addEventListener('click', () => openLightbox(art));
        galleryGrid.appendChild(item);
    });
}

/* --- 3. LIGHTBOX SYSTEM --- */

let currentArtIndex = 0;

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('prev-art');
    const nextBtn = document.getElementById('next-art');

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.remove('active');
    });

    prevBtn.addEventListener('click', () => {
        currentArtIndex = (currentArtIndex - 1 + artworks.length) % artworks.length;
        updateLightboxContent(artworks[currentArtIndex]);
    });

    nextBtn.addEventListener('click', () => {
        currentArtIndex = (currentArtIndex + 1) % artworks.length;
        updateLightboxContent(artworks[currentArtIndex]);
    });
}

function openLightbox(art) {
    currentArtIndex = artworks.findIndex(a => a.id === art.id);
    updateLightboxContent(art);
    document.getElementById('lightbox').classList.add('active');
}

function updateLightboxContent(art) {
    document.getElementById('lightbox-img').src = art.url;
    document.getElementById('lightbox-title').innerText = art.title;
    document.getElementById('lightbox-desc').innerText = art.desc;
    
    // Price with currency conversion
    const priceTag = document.getElementById('lightbox-price');
    formatPrice(art.price, priceTag);
}

/* --- 4. SCROLL ANIMATIONS --- */

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* --- 5. AUTO LANGUAGE DETECTION --- */

const translations = {
    en: {
        nav_logo: "LEKIE ART",
        nav_home: "Home",
        nav_about: "About",
        nav_gallery: "Gallery",
        nav_process: "Process",
        nav_contact: "Contact",
        artist_name: "Olamilekan Muraina",
        hero_tagline: "Capturing the silence between breaths in charcoal and light.",
        scroll_down: "Scroll to Enter",
        about_title: "The Hand & The Shadow",
        about_p1: "I find beauty in the imperfections of a single stroke. My work is an exploration of the human soul through the raw, tactile medium of graphite and charcoal.",
        about_p2: "In this digital space, I invite you to step into my dream. Here, time slows down, and the only thing that matters is the emotion captured on paper.",
        gallery_title: "The Collection",
        process_title: "The Genesis",
        process_step1_title: "The Reference",
        process_step1_desc: "Finding the soul in a moment of stillness.",
        process_step2_title: "The Sketch",
        process_step2_desc: "Faint lines define the boundaries of existence.",
        process_step3_title: "The Depth",
        process_step3_desc: "Layering charcoal to build the weight of the world.",
        process_step4_title: "The Finality",
        process_step4_desc: "The last highlight, the deepest shadow.",
        testimonials_title: "Echoes",
        testimonial1_text: "\"Looking at Olamilekan's work is like remembering a dream you never had.\"",
        contact_title: "Reach Out",
        contact_invitation: "If this work speaks to you, reach out.",
        whatsapp_text: "Message on WhatsApp",
        footer_rights: "All rights reserved."
    },
    es: {
        nav_logo: "LEKIE ART",
        nav_home: "Inicio",
        nav_about: "Sobre mí",
        nav_gallery: "Galería",
        nav_process: "Proceso",
        nav_contact: "Contacto",
        artist_name: "Olamilekan Muraina",
        hero_tagline: "Capturando el silencio entre suspiros en carboncillo y luz.",
        scroll_down: "Desliza para Entrar",
        about_title: "La Mano y la Sombra",
        about_p1: "Encuentro belleza en las imperfecciones de un solo trazo. Mi trabajo es una exploración del alma humana.",
        gallery_title: "La Colección",
        contact_title: "Contáctame",
        whatsapp_text: "Mensaje por WhatsApp"
    }
};

function initLanguage() {
    const userLang = navigator.language.split('-')[0];
    const lang = translations[userLang] ? userLang : 'en';
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });
}

/* --- 6. AUTO CURRENCY DISPLAY --- */

let exchangeRates = { USD: 0.00065, EUR: 0.00060, GBP: 0.00052, NGN: 1 };
let userCurrency = 'NGN';

async function initCurrency() {
    try {
        // 1. Detect location/currency via IP (Simplified for demo)
        const geoRes = await fetch('https://ipapi.co/json/');
        const geoData = await geoRes.json();
        
        const currencyMap = { 'US': 'USD', 'GB': 'GBP', 'EU': 'EUR', 'NG': 'NGN' };
        userCurrency = currencyMap[geoData.country_code] || 'USD';

        // 2. Fetch real rates (Optional, using fallback if fails)
        const rateRes = await fetch('https://open.er-api.com/v6/latest/NGN');
        const rateData = await rateRes.json();
        exchangeRates = rateData.rates;
    } catch (e) {
        console.log("Currency detection failed, using defaults.");
    }
}

function formatPrice(basePriceNGN, element) {
    const rate = exchangeRates[userCurrency] || exchangeRates['USD'];
    const converted = basePriceNGN * rate;
    
    const formatter = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: userCurrency,
    });
    
    element.innerText = formatter.format(converted);
}

/* --- 7. MOBILE MENU --- */

function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    toggle.addEventListener('click', () => {
        const isVisible = navLinks.style.display === 'flex';
        navLinks.style.display = isVisible ? 'none' : 'flex';
        
        if (!isVisible) {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'fixed';
            navLinks.style.top = '0';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.height = '100vh';
            navLinks.style.background = 'var(--bg-color)';
            navLinks.style.justifyContent = 'center';
            navLinks.style.alignItems = 'center';
            navLinks.style.zIndex = '99';
            
            // Close menu on link click
            const links = navLinks.querySelectorAll('a');
            links.forEach(link => {
                link.onclick = () => {
                    navLinks.style.display = 'none';
                };
            });
        }
    });
}

/* --- 8. SOCIAL INTERACTIONS --- */

function initSocialInteractions() {
    // Subtle scroll effect for floating elements
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const sideDock = document.querySelector('.side-dock');
        const whatsapp = document.querySelector('.whatsapp-floating');
        
        if (sideDock) {
            sideDock.style.opacity = scrollY > 500 ? '1' : '0.4';
        }
        
        if (whatsapp) {
            whatsapp.style.transform = scrollY > 100 ? 'scale(1)' : 'scale(0)';
        }
    });
}
