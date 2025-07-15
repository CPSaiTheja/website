document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        once: false, // Keep this false if you want re-triggering on scroll up/down
        mirror: true, // This is key for up/down animations
        duration: 500, // Adjust for smoothness
        easing: 'ease-in-out', // Good all-around easing
        offset: 120, // Default offset, adjust as needed
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Check if mobileMenuBtn and nav exist and are active before trying to remove classes
            if (mobileMenuBtn && nav && mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });

    // Sticky Header on Scroll
    const header = document.querySelector('.header');
    const scrollThreshold = 100;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Contact Form Submission (Frontend validation only)
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Simple validation
            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // In a real application, you would send the form data to a server here
            // Since no backend is required, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Slideshow functionality for brand pages (basic, manual control)
    document.querySelectorAll('.slideshow').forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slide');
        const prevButton = slideshow.querySelector('.prev-slide');
        const nextButton = slideshow.querySelector('.next-slide');
        let currentSlide = 0;

        if (slides.length > 0 && prevButton && nextButton) {
            slides[currentSlide].classList.add('active'); // Show the first slide initially

            function showSlide(index) {
                slides.forEach(slide => slide.classList.remove('active'));
                slides[index].classList.add('active');
            }

            prevButton.addEventListener('click', function() {
                currentSlide--;
                if (currentSlide < 0) {
                    currentSlide = slides.length - 1;
                }
                showSlide(currentSlide);
            });

            nextButton.addEventListener('click', function() {
                currentSlide++;
                if (currentSlide >= slides.length) {
                    currentSlide = 0;
                }
                showSlide(currentSlide);
            });
            // Auto-advance removed from this slideshow, it is now manual
        }
    });


    // NEW: Image Stack Carousel Functionality (Full-screen with auto-play)
    const carouselItems = document.querySelectorAll('.image-stack-carousel .carousel-item');
    const carouselPrevBtn = document.querySelector('.image-stack-carousel .carousel-prev-btn');
    const carouselNextBtn = document.querySelector('.image-stack-carousel .carousel-next-btn');

    if (carouselItems.length > 0 && carouselPrevBtn && carouselNextBtn) {
        let currentCarouselIndex = 0;
        let carouselAutoPlayInterval = 3000; // 3 seconds
        let carouselIntervalId;

        function updateCarousel() {
            carouselItems.forEach((item, index) => {
                item.classList.remove('active');
                // Ensure other classes are removed if they somehow persist from old logic
                item.classList.remove('prev', 'next', 'stacked-left', 'stacked-right');
            });
            carouselItems[currentCarouselIndex].classList.add('active');
        }

        function showNextCarouselImage() {
            currentCarouselIndex = (currentCarouselIndex + 1) % carouselItems.length;
            updateCarousel();
        }

        function showPrevCarouselImage() {
            currentCarouselIndex = (currentCarouselIndex - 1 + carouselItems.length) % carouselItems.length;
            updateCarousel();
        }

        function startCarouselAutoPlay() {
            stopCarouselAutoPlay(); // Clear any existing interval first
            carouselIntervalId = setInterval(showNextCarouselImage, carouselAutoPlayInterval);
        }

        function stopCarouselAutoPlay() {
            clearInterval(carouselIntervalId);
        }

        carouselNextBtn.addEventListener('click', () => {
            stopCarouselAutoPlay();
            showNextCarouselImage();
            startCarouselAutoPlay();
        });

        carouselPrevBtn.addEventListener('click', () => {
            stopCarouselAutoPlay();
            showPrevCarouselImage();
            startCarouselAutoPlay();
        });

        // Initialize image-stack-carousel and start auto-play
        updateCarousel();
        startCarouselAutoPlay();
    }


    // --- Particles.js Initialization ---
    // Only initialize if the particles-js element exists on the page
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80, // Number of particles
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#007bff" // Particles are now blue
                },
                "shape": {
                    "type": "circle", // Particle shape: "circle", "edge", "triangle", "polygon", "star", "image"
                },
                "opacity": {
                    "value": 0.8, // Increased opacity for better visibility
                    "random": false,
                    "anim": {
                        "enable": false,
                    }
                },
                "size": {
                    "value": 3, // Particle size
                    "random": true,
                    "anim": {
                        "enable": false,
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150, // Max distance to link particles
                    "color": "#ffffff", // Lines are white
                    "opacity": 1,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 4, // Particle movement speed
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas", // Detect interaction on the particles canvas
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab" // Grab effect on hover
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "grab" // Grab effect on click (connecting lines to cursor)
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 250, // Increased distance for grab effect on both hover/click
                        "line_linked": {
                            "opacity": 10
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 10,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
}); // End of DOMContentLoaded