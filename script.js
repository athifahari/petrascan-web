// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const menuOverlay = document.getElementById('menuOverlay');
const menuIcon = mobileMenuBtn.querySelector('i');

function toggleMenu() {
    // Toggle class 'active' untuk menampilkan/menyembunyikan menu dan overlay
    navLinks.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    // Toggle icon fa-bars (tiga garis) dan fa-times (silang)
    if (navLinks.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

// Event listener untuk tombol menu
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
}

// Event listener untuk overlay (menutup menu jika mengklik di luar area menu)
if (menuOverlay) {
    menuOverlay.addEventListener('click', toggleMenu);
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        // Hanya tutup menu jika di tampilan mobile (lebar <= 968px)
        if (window.innerWidth <= 968 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// ===== FIXED SMOOTH SCROLL =====
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const nav = document.querySelector("nav");
      const navHeight = nav ? nav.offsetHeight : 0;
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    });
  });
});



// ===== SCROLL ANIMATION =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.feature-card, .team-card, .step, .benefit-card, .parameter-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            showNotification('Terima kasih! Pesan Anda telah diterima. Tim kami akan segera menghubungi Anda.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Log form data (in production, send to server)
            console.log('Form submitted:', formData);
        }, 1500);
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">✕</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#4A9B4E' : '#FF6B35'};
        color: white;
        padding: 1.2rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-icon').style.cssText = `
        font-size: 1.5rem;
        font-weight: bold;
    `;
    
    notification.querySelector('.notification-message').style.cssText = `
        flex: 1;
        line-height: 1.5;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.3rem;
        cursor: pointer;
        padding: 0;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to page
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-close:hover {
        background: rgba(255,255,255,0.2);
    }
    
    /* Mobile Menu Styles */
    @media (max-width: 968px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: linear-gradient(135deg, var(--primary-green), var(--dark-green));
            flex-direction: column;
            padding: 2rem;
            transition: left 0.3s ease;
            overflow-y: auto;
        }
        
        .nav-links.active {
            left: 0;
        }
        
        .nav-links li {
            width: 100%;
            margin-bottom: 0.5rem;
        }
        
        .nav-links a {
            display: block;
            width: 100%;
            padding: 1rem;
            text-align: center;
            font-size: 1.1rem;
        }
    }
`;
document.head.appendChild(style);

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate stats when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            
            // Check if it's a number
            if (!isNaN(text.replace('%', ''))) {
                const target = parseInt(text.replace('%', ''));
                statNumber.textContent = '0';
                animateCounter(statNumber, target);
                if (text.includes('%')) {
                    setTimeout(() => {
                        statNumber.textContent += '%';
                    }, 2000);
                }
            }
            
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});


// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    z-index: 999;
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// Scroll to top on click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect
scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0) scale(1)';
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Add active link styles
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-links a.active {
        background: rgba(255,255,255,0.2);
    }
    
    .nav-links a.active::before {
        width: 80%;
    }
`;
document.head.appendChild(navStyle);

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== PREVENT FORM DOUBLE SUBMISSION =====
if (contactForm) {
    contactForm.addEventListener('submit', function() {
        const submitBtn = this.querySelector('.submit-button');
        submitBtn.disabled = true;
    });
}

// ===== CONSOLE MESSAGE =====
console.log('%c🔬 PetraScan', 'font-size: 24px; font-weight: bold; color: #FF6B35;');
console.log('%cBiosensor Multiparameter untuk Deteksi Dini Mastitis', 'font-size: 14px; color: #2A9D4E;');
console.log('%c© 2025 PetraScan. All rights reserved.', 'font-size: 12px; color: #6C757D;');


// ===== PRINT STYLES =====
const printStyles = document.createElement('style');
printStyles.media = 'print';
printStyles.textContent = `
    @media print {
        nav, .hero, .contact-form, footer, .scroll-top-btn {
            display: none !important;
        }
        
        section {
            page-break-inside: avoid;
        }
        
        body {
            font-size: 12pt;
            line-height: 1.5;
            color: black;
        }
        
        h1, h2, h3 {
            page-break-after: avoid;
        }
        
        .feature-card, .team-card, .benefit-card {
            box-shadow: none;
            border: 1px solid #ddd;
        }
    }
`;
document.head.appendChild(printStyles);

// ===== INITIALIZE =====
console.log('✅ PetraScan website initialized successfully!');