document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LOAD DATA FROM content.js ---
    if(typeof portfolioData !== 'undefined') {
        loadDynamicContent();
    }

    // --- 2. 3D TILT EFFECT ---
    initTiltEffect();

    // --- 3. SCROLL ANIMATION ---
    initScrollAnimation();
});

function loadDynamicContent() {
    const data = portfolioData;

    // A. Update Personal Info (if elements exist)
    setSafeText('.hero-text h1 span', "Digital Reality"); // Example of keeping some static text or change via JS
    
    // B. Render Education Stats
    const eduContainer = document.querySelector('.glass-panel');
    if(eduContainer) {
        let eduHTML = `<h3><i class="fa-solid fa-graduation-cap"></i> Education Stats</h3>`;
        data.education.forEach(edu => {
            eduHTML += `
            <div class="stat-row">
                <div class="stat-info">
                    <span class="school">${edu.school}</span>
                    <span class="degree">${edu.degree}</span>
                </div>
                <span class="grade">${edu.grade}</span>
            </div>`;
        });
        eduContainer.innerHTML = eduHTML;
    }

    // C. Render Experience Timeline
    const expContainer = document.getElementById('experience');
    if(expContainer) {
        let expHTML = `<h3><i class="fa-solid fa-briefcase"></i> Journey</h3>`;
        data.experience.forEach(job => {
            expHTML += `
            <div class="timeline-item">
                <span class="time">${job.year}</span>
                <h4>${job.role}</h4>
                <span class="company">${job.company}</span>
                <p>${job.desc}</p>
            </div>`;
        });
        expContainer.innerHTML = expHTML;
    }

    // D. Render Certifications
    const certContainer = document.querySelector('.cert-grid-layout');
    if(certContainer) {
        let certHTML = ``;
        data.certs.forEach(cert => {
            certHTML += `
            <div class="cert-item">
                <div class="cert-icon"><i class="${cert.icon}"></i></div>
                <div class="cert-info">
                    <h4>${cert.name}</h4>
                    <span>${cert.source}</span>
                </div>
            </div>`;
        });
        certContainer.innerHTML = certHTML;
    }
    
    // E. Update Contact Details
    const contactSection = document.querySelector('.contact-details');
    if(contactSection) {
        contactSection.innerHTML = `
        <div class="detail-row"><i class="fa-solid fa-phone"></i> <span>${data.personal.phone}</span></div>
        <div class="detail-row"><i class="fa-solid fa-envelope"></i> <span>${data.personal.email}</span></div>
        <div class="detail-row"><i class="fa-solid fa-location-dot"></i> <span>${data.personal.location}</span></div>
        `;
    }
}

// Helper: Set text content safely
function setSafeText(selector, text) {
    const el = document.querySelector(selector);
    if(el) el.innerText = text;
}

function initTiltEffect() {
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}

function initScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .hero-text, .hero-card-3d').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}