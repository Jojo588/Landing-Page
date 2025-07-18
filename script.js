     // Loading Screen
        window.addEventListener('load', () => {
            const loadingScreen = document.getElementById('loadingScreen');
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        });

        // Mobile Menu Toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');

        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Navbar Scroll Effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Active Navigation Link
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        function updateActiveLink() {
            const scrollPosition = window.scrollY + 100;

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

        window.addEventListener('scroll', updateActiveLink);

        // Smooth Scrolling for Navigation Links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu if open
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });

        // Intersection Observer for Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe all reveal elements
        document.querySelectorAll('.reveal, .feature-card, .stat-item, .pricing-card').forEach(el => {
            observer.observe(el);
        });

        // Animated Counter for Stats
        function animateCounter(element, target, duration = 2000) {
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (target === 99.9) {
                    element.textContent = current.toFixed(1) + '%';
                } else {
                    element.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        }

        // Stats Counter Animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target.querySelector('.stat-number');
                    const target = parseInt(statNumber.getAttribute('data-target'));
                    animateCounter(statNumber, target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-item').forEach(item => {
            statsObserver.observe(item);
        });

        // Form Validation
        const contactForm = document.getElementById('contactForm');
        
        function validateField(field) {
            const value = field.value.trim();
            const formGroup = field.closest('.form-group');
            const errorMessage = formGroup.querySelector('.error-message');
            
            formGroup.classList.remove('error');
            errorMessage.textContent = '';

            if (field.hasAttribute('required') && !value) {
                formGroup.classList.add('error');
                errorMessage.textContent = 'This field is required';
                return false;
            }

            if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    formGroup.classList.add('error');
                    errorMessage.textContent = 'Please enter a valid email address';
                    return false;
                }
            }

            return true;
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const fields = contactForm.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            fields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    alert('Thank you for your message! We\'ll get back to you soon.');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });

        // Real-time validation
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => validateField(field));
        });

        // Back to Top Button
        const backToTop = document.getElementById('backToTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Enhanced Parallax Effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.parallax');
            
            if (parallax && window.innerWidth > 768) {
                const rect = parallax.getBoundingClientRect();
                const speed = 0.5;
                
                // Only apply parallax when the element is in viewport
                if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                    const yPos = -(scrolled - parallax.offsetTop) * speed;
                    parallax.style.backgroundPosition = `center ${yPos}px`;
                }
            }
        });

        // Add stagger animation to feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });

        // Add stagger animation to pricing cards
        const pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });

        // Interactive Pricing Plan Selection
        const pricingCards2 = document.querySelectorAll('.pricing-card');

        pricingCards2.forEach(card => {
            card.addEventListener('click', () => {
                // Remove featured class from all cards
                pricingCards2.forEach(c => c.classList.remove('featured'));
                
                // Add featured class to clicked card
                card.classList.add('featured');
                
                // Add a subtle click animation
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);
            });
            
            // Add hover cursor to indicate clickability
            card.style.cursor = 'pointer';
        });