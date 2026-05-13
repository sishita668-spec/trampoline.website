/* ============================================
   YOOHOO! TRAMPOLINE PARK - JAVASCRIPT
   ============================================ */

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSwiper();
    initializeScrollReveals();
    initializeBackToTop();
    initializeNavigation();
    initializeContactForm();
    initializeBookingForm();
    initializePricingToggle();
});

/* ============================================
   SWIPER/CAROUSEL INITIALIZATION
   ============================================ */

function initializeSwiper() {
    const swiper = new Swiper('.heroSwiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
        spaceBetween: 0
    });
}

/* ============================================
   SCROLL REVEAL ANIMATIONS
   ============================================ */

function initializeScrollReveals() {
    // Create Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    const revealElements = document.querySelectorAll(
        '.game-card, .party-card, .pricing-card, .offer-card, .event-card, ' +
        '.contact-card, .feature-card, .event-highlight-card'
    );

    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */

function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Scroll to top smoothly
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   NAVIGATION & SMOOTH SCROLLING
   ============================================ */

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navMenu = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu
            const bsCollapse = new bootstrap.Collapse(navMenu, { toggle: false });
            bsCollapse.hide();

            // Smooth scroll to section
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Update active nav link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/* ============================================
   CONTACT FORM
   ============================================ */

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name') || this.querySelector('input[type="text"]').value,
                email: formData.get('email') || this.querySelector('input[type="email"]').value,
                phone: formData.get('phone') || this.querySelector('input[type="tel"]').value,
                message: this.querySelector('textarea').value
            };

            // Validate
            if (!data.name || !data.email || !data.phone || !data.message) {
                showNotification('Please fill all fields', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Simulate API call
            setTimeout(() => {
                showNotification('Message sent successfully! We will get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        });
    }
}

/* ============================================
   BOOKING FORM
   ============================================ */

function initializeBookingForm() {
    const bookingForm = document.getElementById('bookingForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const inputs = this.querySelectorAll('input, select, textarea');
            const data = {};
            inputs.forEach(input => {
                if (input.value) {
                    data[input.name || input.placeholder] = input.value;
                }
            });

            // Validate
            if (Object.keys(data).length < 4) {
                showNotification('Please fill all fields', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Confirming...';

            // Simulate API call
            setTimeout(() => {
                showNotification('Booking confirmed! Check your email for confirmation details.', 'success');
                bookingForm.reset();

                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
                if (modal) {
                    modal.hide();
                }

                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        });
    }
}

/* ============================================
   PRICING TOGGLE
   ============================================ */

function initializePricingToggle() {
    const weekdayRadio = document.getElementById('weekday');
    const weekendRadio = document.getElementById('weekend');

    if (weekdayRadio && weekendRadio) {
        weekdayRadio.addEventListener('change', updatePrices);
        weekendRadio.addEventListener('change', updatePrices);
    }

    function updatePrices() {
        const priceElements = document.querySelectorAll('.weekday-price');
        const isWeekend = weekendRadio.checked;

        priceElements.forEach(el => {
            const weekdayPrice = el.dataset.weekday;
            const weekendPrice = el.dataset.weekend;

            // Animate price change
            el.style.opacity = '0.5';
            setTimeout(() => {
                el.textContent = isWeekend ? weekendPrice : weekdayPrice;
                el.style.opacity = '1';
            }, 150);
        });
    }
}

/* ============================================
   NOTIFICATION SYSTEM
   ============================================ */

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;

    // Set icon based on type
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';

    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas ${icon} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
        </div>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

/* ============================================
   ADDITIONAL ENHANCEMENTS
   ============================================ */

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ============================================
   LAZY LOADING FOR IMAGES
   ============================================ */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.backgroundImage = img.dataset.src || '';
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('[data-src]').forEach(img => imageObserver.observe(img));
}

/* ============================================
   SMOOTH SCROLL OFFSET FOR STICKY NAVBAR
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();

            const target = document.querySelector(href);
            const offset = 70; // Navbar height
            const targetPosition = target.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ============================================
   HEADER SHADOW ON SCROLL
   ============================================ */

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar-container');
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
});

/* ============================================
   PRELOADER ANIMATION
   ============================================ */

window.addEventListener('load', function() {
    // Remove any preloader if it exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }

    // Trigger animations for visible elements
    document.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.add('animated');
    });
});

/* ============================================
   FORM VALIDATION ENHANCEMENT
   ============================================ */

function setupFormValidation(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });

    function validateField(field) {
        let isValid = true;
        let errorMessage = '';

        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(field.value);
            errorMessage = 'Please enter a valid email address';
        } else if (field.type === 'tel') {
            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
            isValid = phoneRegex.test(field.value) || field.value === '';
            errorMessage = 'Please enter a valid phone number';
        } else if (field.type === 'date') {
            isValid = field.value !== '';
            errorMessage = 'Please select a date';
        } else if (field.required) {
            isValid = field.value.trim() !== '';
            errorMessage = 'This field is required';
        }

        if (!isValid) {
            field.classList.add('is-invalid');
            let feedback = field.parentElement.querySelector('.invalid-feedback');
            if (!feedback) {
                feedback = document.createElement('div');
                feedback.className = 'invalid-feedback d-block';
                field.parentElement.appendChild(feedback);
            }
            feedback.textContent = errorMessage;
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            const feedback = field.parentElement.querySelector('.invalid-feedback');
            if (feedback) feedback.remove();
        }

        return isValid;
    }
}

// Initialize form validation for contact and booking forms
setupFormValidation('#contactForm');
setupFormValidation('#bookingForm');

/* ============================================
   COUNTER ANIMATION (Optional for stats)
   ============================================ */

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

/* ============================================
   MODAL FOCUS MANAGEMENT
   ============================================ */

document.addEventListener('shown.bs.modal', function(e) {
    const modal = e.target;
    const firstInput = modal.querySelector('input, select, textarea, button');
    if (firstInput) {
        firstInput.focus();
    }
});

/* ============================================
   KEYBOARD SHORTCUTS
   ============================================ */

document.addEventListener('keydown', function(e) {
    // ESC to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            bootstrap.Modal.getInstance(modal)?.hide();
        });
    }

    // Ctrl/Cmd + K to focus search (if search exists)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('[data-search]');
        if (searchInput) searchInput.focus();
    }
});

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(updateActiveNavLink, 100);
window.addEventListener('scroll', debouncedScroll);

/* ============================================
   CONSOLE LOG WELCOME MESSAGE
   ============================================ */

console.log('%c🎉 Welcome to YooHoo! Trampoline & Amusement Park 🎉', 
    'font-size: 20px; font-weight: bold; color: #FF6B35; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
console.log('%cBooking: +91 9950 000 000', 
    'font-size: 14px; color: #4DA6FF; font-weight: 600;');
console.log('%cWebsite by: Professional Development Team', 
    'font-size: 12px; color: #999;');

/* ============================================
   READY FOR PRODUCTION
   ============================================ */

console.log('All scripts initialized successfully! ✅');
