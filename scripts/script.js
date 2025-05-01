document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializePortfolio();
    
    function initializePortfolio() {
        // Set up navigation
        setupNavigation();
        
        // Animate elements when they come into view
        setupScrollAnimations();
        
        // Set up page-specific initializations
        const currentPage = getCurrentPage();
        
        switch(currentPage) {
            case 'index.html':
            case '':
            case '/':
                setupTypingEffect();
                break;
            case 'skills.html':
                setupSkillCards();
                break;
            case 'projects.html':
                setupProjectCards();
                break;
            case 'education.html':
                setupEducationCards();
                break;
        }
        
        // Set up dark mode for all pages
        setupDarkMode();
        
        // Add page transition effect
        setupPageTransitions();
    }
    
    function getCurrentPage() {
        // Get the current page filename from the URL
        const path = window.location.pathname;
        const page = path.split("/").pop();
        return page;
    }
    
    function setupNavigation() {
        const navLinks = document.querySelectorAll('nav a');
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        
        // Highlight the current page in navigation
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            const currentPage = getCurrentPage() || 'index.html';
            
            if (linkHref === currentPage) {
                link.classList.add('active');
            }
        });
        
        // Mobile menu toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                nav.classList.toggle('mobile-active');
                this.classList.toggle('active');
            });
        }
        
        // Additional mobile menu handling
        if (window.innerWidth <= 768) {
            // Close the menu when clicking outside the menu
            document.addEventListener('click', function(e) {
                const nav = document.querySelector('nav');
                const menuToggle = document.querySelector('.menu-toggle');
                
                if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('mobile-active')) {
                    nav.classList.remove('mobile-active');
                    menuToggle.classList.remove('active');
                }
            });
            
            // Add a class to show the mobile menu is active
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    document.querySelector('nav').classList.remove('mobile-active');
                    document.querySelector('.menu-toggle').classList.remove('active');
                });
            });
        }
        
        // Add back to top button functionality
        const backToTopButton = document.querySelector('.back-to-top');
        if (backToTopButton) {
            // Show/hide back to top button based on scroll position
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            });
            
            // Scroll to top when clicked
            backToTopButton.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Add navigation arrow functionality
        document.querySelectorAll('.nav-arrow').forEach(arrow => {
            arrow.addEventListener('click', function() {
                const targetPage = this.getAttribute('data-target');
                if (targetPage) {
                    // Add the transition-out class to the body
                    document.body.classList.add('transition-out');
                    
                    // Navigate to the new page after transition completes
                    setTimeout(() => {
                        window.location.href = targetPage;
                    }, 500);
                }
            });
        });
    }
    
    function setupPageTransitions() {
        // Add transition class to the body when leaving the page
        document.querySelectorAll('a').forEach(link => {
            // Only for internal links
            if (link.hostname === window.location.hostname) {
                link.addEventListener('click', function(e) {
                    // Don't add transition for # links
                    if (this.getAttribute('href').startsWith('#')) {
                        return;
                    }
                    
                    e.preventDefault();
                    const targetPage = this.getAttribute('href');
                    
                    // Add the transition-out class to the body
                    document.body.classList.add('transition-out');
                    
                    // Navigate to the new page after transition completes
                    setTimeout(() => {
                        window.location.href = targetPage;
                    }, 500); // Match this timing with your CSS transition
                });
            }
        });
        
        // Add transition-in class when page loads
        document.body.classList.add('transition-in');
    }
    
    function setupScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');
        const slideElements = document.querySelectorAll('.slide-in');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const fadeObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
        
        const slideObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        slideElements.forEach(element => {
            slideObserver.observe(element);
        });
    }
    
    function setupTypingEffect() {
        const typeText = document.querySelector('.type-effect');
        if (typeText) {
            const text = typeText.textContent;
            typeText.innerHTML = '';
            let i = 0;
            
            function typing() {
                if (i < text.length) {
                    typeText.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typing, 100);
                } else {
                    // Add blinking cursor after typing completes
                    typeText.classList.add('typing-complete');
                }
            }
            
            typing();
        }
    }
    
    function setupDarkMode() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        const body = document.body;
        
        // Check if user previously enabled dark mode
        if (localStorage.getItem('darkMode') === 'enabled') {
            body.classList.add('dark-mode');
            if (darkModeToggle) {
                darkModeToggle.checked = true;
            }
        }
        
        if (darkModeToggle) {
            darkModeToggle.addEventListener('change', function() {
                if (this.checked) {
                    body.classList.add('dark-mode');
                    localStorage.setItem('darkMode', 'enabled');
                } else {
                    body.classList.remove('dark-mode');
                    localStorage.removeItem('darkMode');
                }
            });
        }
    }
    
    function setupSkillCards() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Add floating animation
                this.classList.add('floating');
                
                // Increase the size of the icon
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.2)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                // Remove floating animation
                this.classList.remove('floating');
                
                // Reset icon size
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    function setupProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('expanded');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('expanded');
            });
        });
    }
    
    function setupEducationCards() {
        const educationCards = document.querySelectorAll('.education-card');
        
        educationCards.forEach(card => {
            // Make the cards interactive
            card.addEventListener('click', function(e) {
                // Ignore clicks on the button
                if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
                    return;
                }
                
                this.classList.toggle('active-card');
            });
        });
    }
}); 