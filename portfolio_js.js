// ===================================
// Navigation Functionality
// ===================================

// Get navigation elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// Scroll Effects
// ===================================

// Add scrolled class to navbar when scrolling
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class for navbar background
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
    
    // Update active navigation link based on section
    updateActiveNavLink();
});

// ===================================
// Active Navigation Link
// ===================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===================================
// Smooth Scroll with Offset
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Offset for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Intersection Observer for Fade-in Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll(
    '.skill-card, .project-card, .service-card, .about-grid, .contact-grid'
);

animatedElements.forEach(el => {
    observer.observe(el);
});

// ===================================
// Contact Form Handling
// ===================================

const sendMessageBtn = document.getElementById('sendMessage');

sendMessageBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields before sending.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Success message (front-end only)
    alert('Thank you for your message! This is a demo form. To make it functional, connect it to a backend service like Formspree, EmailJS, or Netlify Forms.');
    
    // Clear form
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactMessage').value = '';
});

// ===================================
// Project Link Click Handling
// ===================================

const projectLinks = document.querySelectorAll('.project-link');

projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Project details would open here. Add your project URLs or create detail pages!');
    });
});

// ===================================
// Dynamic Year in Footer (Optional)
// ===================================

// Update copyright year dynamically
const footerYear = document.querySelector('.footer p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = `&copy; ${currentYear} Muhammad Mustakeem. All rights reserved.`;
}

// ===================================
// Add Loading Animation on Page Load
// ===================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Parallax Effect for Hero Section (Optional)
// ===================================

const heroSection = document.querySelector('.hero-section');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroSection && scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===================================
// Add Hover Effect Sound (Optional Enhancement)
// ===================================

// Uncomment to add subtle hover sounds if you add audio files
/*
const hoverSound = new Audio('path/to/hover-sound.mp3');
hoverSound.volume = 0.1;

document.querySelectorAll('.btn, .project-card, .skill-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
});
*/

// ===================================
// Load projects dynamically from projects.json
fetch('projects.json')
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById('projectsContainer');
    projects.forEach(p => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <div class="project-image">
          <img src="${p.image}" alt="${p.title}">
          <span class="project-category">${p.category}</span>
        </div>
        <div class="project-content">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="project-tags">
            ${p.tech.split(',').map(t => `<span>${t.trim()}</span>`).join('')}
          </div>
          <a href="${p.link}" class="project-link">View Details →</a>
        </div>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error("Error loading projects:", err));


// Console Message
// ===================================

console.log('%c🎮 Muhammad Mustakeem - Unity Developer Portfolio', 
    'color: #9333ea; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and Vanilla JavaScript', 
    'color: #ec4899; font-size: 14px;');
console.log('%cInterested in working together? Get in touch!', 
    'color: #a855f7; font-size: 12px;');