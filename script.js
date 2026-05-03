/**
 * LEKIE ART - HIGH CONVERSION ENGINE
 * Implements: Auto-rendering Gallery, Smooth UX, and Conversion Tracking.
 */

const GOOGLE_PHOTOS_URLS = [
  "https://lh3.googleusercontent.com/pw/AP1GczN0ZDXENqvdzAatU5EgvdWWEPgJ1stUb6kky7qGuTOdA46-qtMb6lpkwkloJ4Zq9YPghLLfjwJmjzuUfvjyaVw4zPquUUTiqOE29biJ6tlL6OF-V50=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczP4dQIBBVotS_jtjJnp9sKLzruAUqhMxHumhxBW5XoSNMDYR--uMN8Xb8tub9FPpuq5xAyDcCZ65u-YtlrCeI_0YnhIMIGHE0jyleSlO87Er714FqY=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczMyXDhuj4c7VA0lA7_V4XqohxdsrXSnK5e8oRMh91q67Pxgds5a7VrWBV5Am5s_yAcayJm-RN2yfS0JMCl5hkZA_pIr6pYq9JxaNamobTI1npdFzFA=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczNaSUUV-lx4p1SuENZPl9EFYrqXYLhteTUT5yAAabHEdKpocQUvbm1c00x9u9VON2KlMaNBTHWB0B938yAW_g11JbaZRQ0ubFQ8uvTK0--ew1AiBSg=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczPxTQyBmtuDfP-gJTnqjWt-uozCdzkrp4J-rAgB-c-QvdHhN0loJo8TkCv4TRDAkorMQTC-1EcsQwd6UNAXLAXKdM0pEgw2v-vILppDH0-3uGbcexg=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczNIRNOJ_KVhFRjgnNBTd2ckhRXCjHQcCYJKCvYFHrLhC348kIAjt4OnYSBm1Y3dwXqMkoEHcLZgOlMSRyIHXXlmVJysFADfiSGv-6_gNsM1fTjD_6E=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczOLXJURKtQlojk2Yk-1fffevsDK9bMVbURZj0Rd49NqwD7PEGwg56geWBjh3PvwFi14vZt4Hl4fa6x5L0i94_XmmD5eHlYZ_SO6NSACAur4wpJMSvo=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczOyTUkYgCdMAAW0nb-kPETmjZQ6nS9F9ZR981XqrOAu-ApGogU2wYqlQsH4CCnKzO5dSbti_lu9Y9EFn6ltyCtebEOiIxyyzR5FXuZU__qgKSHE90k=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczOkX3dzSfwZ2lcHVJFZ8zUkdUU2-vb9xA138XA98ZqP8PMZNg9RF4quq0SKSR6CmU47G--8sX6-9XjN0SFO6hLjR3D1KCeKTTbwwjZLYOIweadzcRE=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczMGSm-bZeTIZb7qQDPMNrzIxMgTmLqGm0sz9hpYajtfH-E4pO7nDr1UjZapRUQzbI-PKHCGfVksMRycrynv6yRExTO1uNEaJqpLobN8vYp6CTWjcqE=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczNzcKvPr8fQ5GDRiUlr-P1bnJNhouy9KzcR92dvLzxWDNlMH52K_e1NWxbg6nCq4ztfhJX1nOZYywW-SPYg6MyhzJAKzFwWthUKSbTIo6UeeUYUz7g=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczOhOQx1TqAq3IYuMtusn6HvGn8IPzCKhoER8eDU8Q35Tne_iFlpS5HgGekLYIYyOFBvieD8pVban8BmMFfhyf6XwjuzK44pQVUGz4OlUYStZcAaCZU=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczMbQROAr2niQlk-suR77UAep7Y8O7L1KpwDtwMOD_rrNUp2_biBpABpJnMJcKadSQrR2_olOp4NcWbHnmSNau-tDI0pHAANcqMm7BX4_445sSV3HkM=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczPfgz-jIjTgGUKhU_C1srDqM2xaWS7JGQSInTe4zizJkL1stZHwyWzeoyZNJaxFw3fRZ1er0H-H7AVuzyKKXugOERjr8QGwgoOd9oVR9FkVLeJUllE=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczPdUxJGokIvmwXSAmquLAUK8haj6mGkuF8B1h_kCpaqSetOGoGPF88rf0g9EvFXoDX0vCc9wqexH3YqJf3iAIgPs3uUHzlOiy3bdYc6PVxsqfQ2alA=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczN12OP87c8Fy1ZQPzSYZgGoYMn9tNrr_Ph5TpbW4m4LnuAOLKDutKc0MhTeKycewI0EKtGkiBN0_JF8gyJ3TBaTdOD6X_47R9H_pspPEj7BubJso98=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczPnlI6rXlaXknUYc4Wf_JXLw5JGKfJNvQmQ8y0WaXHvS5s79YHkPxWEserCcqW7hPame5zLnTPX49Yr-NUIMA5KHUHHP93CH93p2FPGFyRg5exH8V0=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczOFsNOr7oFNTPcGr3Qg5G-CcgttvwKzCZ1jI3vJYPwbo7yW4Fe8LStsLpZBTD2u_iEpzoPakBwOlPFpHXXeNchx17FEORSMOtA5dQJJmLCYmGi5ysQ=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczN5orZOTtpCyKkMZj3hEizyuI9ktCQT-eNdh855owF99CGgodp7LaMwEh-S6ZYv-NTKVOg2O5Fuvl4v5ON1cXhYsXpGOQqnmjH-RvenU6ZutZyPQzo=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczOp6mVR5m3rYESQSz1Fwq_dhLqTtGTYJh9OmQr4OWbXCoJGEDuN9-AK6X-k-knfZ_CgiFwagVFB5lppizaErkFCWWA6zMkNwBa7HOG9CW4wLmn8vSQ=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczNXKIrjcWaDlU6_I6J2uFyj-oNZmxWX3KCpeeV_DKIRBzdYQ91--YM14T6WE6z7wU1Xh4WwR_BuTlD75GimyEUWgje7oebJC-ZVJA9GLxTlfH37SYk=w1200",
  "https://lh3.googleusercontent.com/pw/AP1GczPMmZNNy7uCNRolDH2y1utfpP2yJIbt_vWfk8eKBCg7JG_37yWoQaqhfRhF9Ree53AblU9ZPY3sHQrrLhkPqo7HH23meQkHRrmdCYhqJR1w5xgUFuY=w1200"
];

document.addEventListener('DOMContentLoaded', () => {
    initAutoGallery();
    initScrollEffects();
    initPencilAnimation();
    initParticles();
    initLightbox();
    initFormHandling();
});

/**
 * Auto-renders images from the Google Photos array
 */
function initAutoGallery() {
    const gallery = document.getElementById('auto-gallery');
    if (!gallery) return;

    GOOGLE_PHOTOS_URLS.forEach((url, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item reveal';
        item.innerHTML = `<img src="${url}" alt="Lekie Art Portrait ${index + 1}" loading="lazy">`;
        item.addEventListener('click', () => openLightbox(url));
        gallery.appendChild(item);
    });
}

/**
 * Lightbox functionality
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    if (!lightbox) return;

    window.openLightbox = (url) => {
        lightboxImg.src = url;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    closeBtn.onclick = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    lightbox.onclick = (e) => {
        if (e.target === lightbox) closeBtn.onclick();
    };
}

/**
 * Scroll reveal and nav effects
 */
function initScrollEffects() {
    const nav = document.querySelector('.main-nav');
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

/**
 * Background Pencil Drawing Animation
 */
function initPencilAnimation() {
    const canvas = document.getElementById('pencil-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    let lines = [];
    for (let i = 0; i < 5; i++) {
        lines.push({
            x: Math.random() * width,
            y: Math.random() * height,
            length: Math.random() * 100 + 50,
            angle: Math.random() * Math.PI * 2,
            opacity: 0,
            speed: Math.random() * 0.01 + 0.005
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 0.5;

        lines.forEach(line => {
            ctx.beginPath();
            ctx.moveTo(line.x, line.y);
            const tx = line.x + Math.cos(line.angle) * line.length;
            const ty = line.y + Math.sin(line.angle) * line.length;
            ctx.lineTo(tx, ty);
            ctx.stroke();

            line.angle += line.speed;
            line.x += Math.cos(line.angle) * 0.2;
            line.y += Math.sin(line.angle) * 0.2;
        });

        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * Floating Particles
 */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5};
            animation: float ${Math.random() * 10 + 10}s linear infinite;
        `;
        container.appendChild(p);
    }
}

/**
 * Form Handling (Conversion Tracking Simulation)
 */
function initFormHandling() {
    const form = document.getElementById('commission-form');
    if (!form) return;

    form.onsubmit = (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        btn.innerText = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerText = 'Inquiry Sent!';
            form.reset();
            alert('Thank you for your inquiry. Olamilekan will reach out to you shortly.');
        }, 1500);
    };
}
