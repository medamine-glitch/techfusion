// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme Switcher
    const themeSwitch = document.getElementById('theme-switch');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use the system preference
    const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Set the initial theme
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Theme switch event listener
    if (themeSwitch) {
        themeSwitch.addEventListener('click', function() {
            let theme = document.documentElement.getAttribute('data-theme');
            
            if (theme === 'light') {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // Mobile Navigation Toggle
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    const navbarClose = document.getElementById('navbar-close');
    
    function toggleMenu(show) {
        if (show) {
            navbarMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Hide hamburger button with a slight delay
            setTimeout(() => {
                navbarToggle.style.opacity = '0';
                navbarToggle.style.visibility = 'hidden';
            }, 100);
        } else {
            navbarMenu.classList.remove('active');
            document.body.style.overflow = '';
            // Show hamburger button immediately
            navbarToggle.style.opacity = '1';
            navbarToggle.style.visibility = 'visible';
        }
    }
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = navbarMenu.classList.contains('active');
            toggleMenu(!isActive);
        });
    }
    
    if (navbarClose && navbarMenu) {
        navbarClose.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu(false);
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navbarMenu && navbarMenu.classList.contains('active')) {
            if (!navbarMenu.contains(e.target) && !navbarToggle.contains(e.target)) {
                toggleMenu(false);
            }
        }
    });
    
    // Close mobile menu when pressing escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbarMenu && navbarMenu.classList.contains('active')) {
            toggleMenu(false);
        }
    });
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Project Filters (for projects.html)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Project Modal (for projects.html)
    const modalTriggers = document.querySelectorAll('.project-modal-trigger');
    const modals = document.querySelectorAll('.project-modal');
    const modalCloses = document.querySelectorAll('.project-modal-close');
    
    if (modalTriggers.length > 0) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                const modalId = this.getAttribute('href');
                const modal = document.querySelector(modalId);
                
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }
    
    if (modalCloses.length > 0) {
        modalCloses.forEach(close => {
            close.addEventListener('click', function() {
                const modal = this.closest('.project-modal');
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    // Close modal when clicking outside the content
    if (modals.length > 0) {
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });
    }
    
    // FAQ Accordion (for contact.html)
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', function() {
                // Toggle active class
                item.classList.toggle('active');
                
                // Toggle display of answer
                if (item.classList.contains('active')) {
                    answer.style.display = 'block';
                } else {
                    answer.style.display = 'none';
                }
            });
        });
    }
    
    // Contact Form Submission (for contact.html)
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = 'Sending...';
            submitButton.disabled = true;
            
            try {
                console.log("Attempting to submit form to:", this.action);
                // Submit the form to Formspree
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                console.log("Form submission response:", response);
                
                if (response.ok) {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.style.backgroundColor = 'var(--secondary)';
                    successMessage.style.color = 'white';
                    successMessage.style.padding = '1rem';
                    successMessage.style.borderRadius = '8px';
                    successMessage.style.marginTop = '1rem';
                    successMessage.innerHTML = '<p>Thank you for your message! We will get back to you soon.</p>';
                    
                    this.reset();
                    this.appendChild(successMessage);
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                } else {
                    const responseData = await response.json().catch(() => null);
                    console.error("Form submission error:", responseData);
                    throw new Error('Form submission failed: ' + (responseData?.error || response.statusText));
                }
            } catch (error) {
                console.error("Form submission error:", error);
                
                // Try traditional form submission as a fallback
                console.log("Attempting traditional form submission as fallback");
                const formData = new FormData(this);
                
                // Create a hidden iframe for submission to prevent page reload
                const iframe = document.createElement('iframe');
                iframe.name = 'hidden_iframe';
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
                
                // Set form to submit to the iframe
                this.target = 'hidden_iframe';
                this.method = 'POST';
                
                // Submit the form traditionally
                this.submit();
                
                // Show a neutral message
                const pendingMessage = document.createElement('div');
                pendingMessage.className = 'success-message';
                pendingMessage.style.backgroundColor = 'var(--secondary)';
                pendingMessage.style.color = 'white';
                pendingMessage.style.padding = '1rem';
                pendingMessage.style.borderRadius = '8px';
                pendingMessage.style.marginTop = '1rem';
                pendingMessage.innerHTML = '<p>Thank you for your message! We are processing your submission.</p>';
                
                this.appendChild(pendingMessage);
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    pendingMessage.remove();
                    iframe.remove();
                }, 5000);
                
                return; // Skip the error message since we're using traditional submission
                
                // Show error message - commented out since we're using traditional submission
                /*
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.style.backgroundColor = '#ef4444';
                errorMessage.style.color = 'white';
                errorMessage.style.padding = '1rem';
                errorMessage.style.borderRadius = '8px';
                errorMessage.style.marginTop = '1rem';
                errorMessage.innerHTML = '<p>Oops! There was a problem sending your message. Please try again.</p><p><small>Error: ' + error.message + '</small></p>';
                
                this.appendChild(errorMessage);
                
                // Remove error message after 5 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
                */
            } finally {
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
    
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.animate-fadeInUp, .animate-fadeIn');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animateElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            // Check if element is in viewport
            if (
                (elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)
            ) {
                element.classList.add('visible');
            }
        });
    }
    
    // Run on initial load
    checkIfInView();
    
    // Run on scroll
    window.addEventListener('scroll', checkIfInView);
});
