// Main JavaScript file for Siam Blend website

// Example: Smooth scrolling for anchor links (if needed later)
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });

console.log("Siam Blend JavaScript loaded.");

// Sticky header functionality
window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    const heroSection = document.querySelector('.hero'); // Assuming hero section is first
    let scrollThreshold = 50; // Default scroll threshold

    if (heroSection) {
        scrollThreshold = heroSection.offsetHeight * 0.8; // Change state after scrolling 80% of hero height
    }

    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Testimonial Carousel
document.addEventListener('DOMContentLoaded', function() {
    const testimonials = document.querySelectorAll('#customer-testimonials .testimonial-item');
    const dotsContainer = document.querySelector('#customer-testimonials .testimonial-dots');
    let currentIndex = 0;
    let intervalTime = 7000; // Time in ms for auto-rotation

    if (testimonials.length > 0) {
        // Create dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('data-index', index);
            dot.addEventListener('click', function() {
                showTestimonial(parseInt(this.getAttribute('data-index')));
                resetInterval();
            });
            if (dotsContainer) dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('#customer-testimonials .testimonial-dot');

        function showTestimonial(index) {
            testimonials.forEach(item => item.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        }

        function nextTestimonial() {
            let nextIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(nextIndex);
        }

        // Auto-rotate
        let autoRotateInterval = setInterval(nextTestimonial, intervalTime);

        function resetInterval() {
            clearInterval(autoRotateInterval);
            autoRotateInterval = setInterval(nextTestimonial, intervalTime);
        }

        // Initial display
        showTestimonial(0);
    }
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active'); // For X animation on hamburger
        });

        // Optional: Close nav when a link is clicked (for single-page apps or smoother experience)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });
    }
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            // Optional: Close other active accordions
            // faqQuestions.forEach(q => {
            //     q.classList.remove('active');
            //     q.nextElementSibling.classList.remove('active');
            //     q.nextElementSibling.style.maxHeight = null;
            //     q.nextElementSibling.style.padding = null;
            // });

            if (isActive) {
                this.classList.remove('active');
                answer.classList.remove('active'); // For CSS transitions if padding is involved
                answer.style.maxHeight = null;
                answer.style.padding = "0 1em"; // Collapse padding
            } else {
                this.classList.add('active');
                answer.classList.add('active');
                answer.style.padding = "1em 1em"; // Expand padding before maxHeight
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});


// Reservation Form (Placeholder Submission)
document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.getElementById('reservation-form');
    const bookingConfirmation = document.getElementById('booking-confirmation');

    if (reservationForm && bookingConfirmation) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission

            // In a real application, you'd send data to a server here.
            // For this static site, we'll just show the confirmation.

            reservationForm.style.display = 'none'; // Hide the form
            bookingConfirmation.style.display = 'block'; // Show confirmation message

            // Optional: scroll to confirmation
            bookingConfirmation.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Fade-in on Scroll
document.addEventListener('DOMContentLoaded', function() {
    const elementsToObserve = document.querySelectorAll('.page-section, .fade-in-section, .parallax-candidate');

    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of item visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: stop observing after it's visible
            }
        });
    }, observerOptions);

    elementsToObserve.forEach(element => {
        // Exclude hero sections from this generic fade-in as they have their own animations
        if (!element.classList.contains('hero') && !element.classList.contains('page-hero')) {
            // Add the .fade-in-section class if it's not already there for .page-section targets
            // and it's not a parallax-candidate (which has its own base styles)
            if (element.classList.contains('page-section') &&
                !element.classList.contains('fade-in-section') &&
                !element.classList.contains('parallax-candidate')) {
                element.classList.add('fade-in-section');
            }
            observer.observe(element);
        }
    });
});


// Button Ripple Effect
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Remove existing ripples
            const existingRipple = button.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }

            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            ripple.style.width = ripple.style.height = `${diameter}px`;
            ripple.style.left = `${e.clientX - rect.left - radius}px`;
            ripple.style.top = `${e.clientY - rect.top - radius}px`;
            ripple.classList.add('ripple');

            button.appendChild(ripple);

            // Clean up ripple element after animation
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });
});

// Gallery Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    let currentIndex;
    const images = [];

    if (galleryItems.length > 0 && lightboxModal) {
        galleryItems.forEach((item, index) => {
            images.push({
                src: item.href,
                alt: item.querySelector('img').alt,
                caption: item.querySelector('.gallery-item-overlay span') ? item.querySelector('.gallery-item-overlay span').textContent : item.querySelector('img').alt
            });

            item.addEventListener('click', function(e) {
                e.preventDefault();
                currentIndex = index;
                openLightbox();
                showImage(currentIndex);
            });
        });

        function openLightbox() {
            lightboxModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling background
        }

        function closeLightbox() {
            lightboxModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        function showImage(index) {
            if (index >= images.length) { currentIndex = 0; }
            else if (index < 0) { currentIndex = images.length - 1; }
            else { currentIndex = index; }

            lightboxImage.src = images[currentIndex].src;
            lightboxImage.alt = images[currentIndex].alt;
            lightboxCaption.textContent = images[currentIndex].caption;
        }

        if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if(prevBtn) prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
        if(nextBtn) nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

        // Close lightbox on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightboxModal.style.display === 'block') {
                closeLightbox();
            }
            if (e.key === 'ArrowLeft' && lightboxModal.style.display === 'block') {
                showImage(currentIndex - 1);
            }
            if (e.key === 'ArrowRight' && lightboxModal.style.display === 'block') {
                showImage(currentIndex + 1);
            }
        });

        // Close lightbox if background is clicked (optional)
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === lightboxModal) { // Clicked on the modal background itself
                closeLightbox();
            }
        });
    }
});
