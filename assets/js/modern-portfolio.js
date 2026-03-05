// Modern Portfolio JavaScript
(function() {
    'use strict';

    // Preloader
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    });

    // Dark Mode / Theme Switching
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on load
    if (currentTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Theme toggle function
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            html.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    }
    
    // Add click event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Check system preference on first visit
    if (!localStorage.getItem('theme')) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            html.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                html.setAttribute('data-theme', 'dark');
                if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                html.removeAttribute('data-theme');
                if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
        }
    });

    // Typing Animation
    const typingElement = document.querySelector('.typing-text');
    const phrases = [
        'web applications',
        'embedded systems',
        'innovative solutions',
        'clean code'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing
        }

        setTimeout(type, typingSpeed);
    }

    if (typingElement) {
        setTimeout(type, 1000);
    }

    // Navbar Scroll Effect - with passive listener
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Active Navigation Link on Scroll - throttled
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let ticking = false;

    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateActiveNav);
            ticking = true;
        }
    }, { passive: true });

    // Skill Progress Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !bar.classList.contains('animated')) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
                bar.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', animateSkills, { passive: true });
    window.addEventListener('load', animateSkills);

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lightbox Functionality for Certificates
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    let currentImageIndex = 0;
    let certificateImages = [];

    // Collect all certificate images
    function collectCertificateImages() {
        const cards = document.querySelectorAll('.certificate-card');
        certificateImages = Array.from(cards).map(card => {
            const img = card.querySelector('.certificate-image img');
            return img ? img.src : null;
        }).filter(src => src !== null);
    }

    // Open lightbox
    window.openLightbox = function(element) {
        collectCertificateImages();
        const card = element.closest ? element.closest('.certificate-card') : element;
        const img = card.querySelector('.certificate-image img');
        
        if (img) {
            currentImageIndex = certificateImages.indexOf(img.src);
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    // Close lightbox
    window.closeLightbox = function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Change image in lightbox
    window.changeImage = function(direction) {
        if (certificateImages.length === 0) return;
        
        currentImageIndex += direction;
        
        // Wrap around
        if (currentImageIndex >= certificateImages.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = certificateImages.length - 1;
        }
        
        lightboxImg.src = certificateImages[currentImageIndex];
    };

    // Close lightbox on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    });

    // Add click handlers to certificate cards
    function attachCertificateClickHandlers() {
        const certCards = document.querySelectorAll('.certificate-card');
        certCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function(e) {
                // Don't open lightbox if clicking on links or buttons within the card
                if (e.target.closest('a') || e.target.closest('button')) return;
                openLightbox(this);
            });
        });
    }

    // Attach certificate click handlers on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachCertificateClickHandlers);
    } else {
        attachCertificateClickHandlers();
    }

    // Video Modal Functions
    const videoModal = document.getElementById('videoModal');
    const videoIframe = document.getElementById('videoIframe');
    const videoLocal = document.getElementById('videoLocal');
    let currentVideoId = null;
    let isMinimized = false;

    // Open video modal (supports both YouTube IDs and local video paths)
    window.openVideoModal = function(videoIdOrPath) {
        if (!videoModal) return;
        
        currentVideoId = videoIdOrPath;
        
        // Check if it's a local video path (contains '/' or '.mp4') or YouTube ID
        const isLocalVideo = videoIdOrPath.includes('/') || videoIdOrPath.endsWith('.mp4') || videoIdOrPath.endsWith('.webm');
        
        if (isLocalVideo) {
            // Local video - use HTML5 video element
            if (videoLocal) {
                videoLocal.style.display = 'block';
                videoLocal.querySelector('source').src = videoIdOrPath;
                videoLocal.load();
                videoLocal.play();
            }
            if (videoIframe) videoIframe.style.display = 'none';
        } else {
            // YouTube video - use iframe
            if (videoIframe) {
                const embedUrl = `https://www.youtube.com/embed/${videoIdOrPath}?autoplay=1&rel=0`;
                videoIframe.src = embedUrl;
                videoIframe.style.display = 'block';
            }
            if (videoLocal) {
                videoLocal.style.display = 'none';
                videoLocal.pause();
            }
        }
        
        // Reset any minimized state
        videoModal.classList.remove('minimized', 'minimizing');
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        isMinimized = false;
    };

    // Close video modal
    window.closeVideoModal = function() {
        if (!videoModal) return;
        
        videoModal.classList.remove('active', 'minimized', 'minimizing');
        
        // Stop both video types
        if (videoIframe) videoIframe.src = '';
        if (videoLocal) {
            videoLocal.pause();
            videoLocal.querySelector('source').src = '';
            videoLocal.load();
        }
        
        document.body.style.overflow = '';
        currentVideoId = null;
        isMinimized = false;
    };

    // Minimize video modal with animation
    window.minimizeVideoModal = function() {
        if (!videoModal) return;
        
        videoModal.classList.add('minimizing');
        document.body.style.overflow = '';
        
        // Pause video when minimizing
        if (videoLocal && !videoLocal.paused) {
            videoLocal.pause();
        }
        
        // Wait for animation to complete before showing minimized pill
        setTimeout(() => {
            videoModal.classList.remove('minimizing');
            videoModal.classList.add('minimized');
            isMinimized = true;
        }, 400);
    };

    // Restore minimized video modal
    window.restoreVideoModal = function() {
        if (!videoModal || !isMinimized) return;
        
        videoModal.classList.remove('minimized');
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Resume video when restoring
        if (videoLocal && videoLocal.style.display !== 'none') {
            videoLocal.play();
        }
        
        isMinimized = false;
    };

    // Close video from minimized pill
    window.closeMinimizedVideo = function(event) {
        event.stopPropagation();
        closeVideoModal();
    };

    // Close modal when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
            if (isMinimized) {
                closeVideoModal();
            } else {
                minimizeVideoModal();
            }
        }
    });

    // Project Modal Functions
    const projectModal = document.getElementById('projectModal');
    const projectModalImg = document.getElementById('projectModalImg');
    const projectModalTags = document.getElementById('projectModalTags');
    const projectModalTitle = document.getElementById('projectModalTitle');
    const projectModalDesc = document.getElementById('projectModalDesc');
    let isProjectMinimized = false;

    // Open project modal
    window.openProjectModal = function(imgSrc, title, desc, tagsHtml) {
        if (!projectModal) return;
        
        projectModalImg.src = imgSrc;
        projectModalTitle.textContent = title;
        projectModalDesc.textContent = desc;
        projectModalTags.innerHTML = tagsHtml;
        
        projectModal.classList.remove('minimized', 'minimizing');
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        isProjectMinimized = false;
    };

    // Close project modal
    window.closeProjectModal = function() {
        if (!projectModal) return;
        
        projectModal.classList.remove('active', 'minimized', 'minimizing');
        projectModalImg.src = '';
        document.body.style.overflow = '';
        isProjectMinimized = false;
    };

    // Minimize project modal with animation
    window.minimizeProjectModal = function() {
        if (!projectModal) return;
        
        projectModal.classList.add('minimizing');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            projectModal.classList.remove('minimizing');
            projectModal.classList.add('minimized');
            isProjectMinimized = true;
        }, 400);
    };

    // Restore minimized project modal
    window.restoreProjectModal = function() {
        if (!projectModal || !isProjectMinimized) return;
        
        projectModal.classList.remove('minimized');
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        isProjectMinimized = false;
    };

    // Close project from minimized pill
    window.closeMinimizedProject = function(event) {
        event.stopPropagation();
        closeProjectModal();
    };

    // Close modal when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
            if (isProjectMinimized) {
                closeProjectModal();
            } else {
                minimizeProjectModal();
            }
        }
    });

    // Attach project card click handlers
    function attachProjectCardHandlers() {
        document.querySelectorAll('.project-card').forEach(function(card) {
            card.addEventListener('click', function() {
                const img = this.querySelector('.project-image img');
                const title = this.querySelector('.project-title').textContent;
                const desc = this.querySelector('.project-description').textContent;
                const tags = this.querySelector('.project-tags').innerHTML;
                
                if (img) {
                    openProjectModal(img.src, title, desc, tags);
                }
            });
        });
    }

    // Attach handlers on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachProjectCardHandlers);
    } else {
        attachProjectCardHandlers();
    }

    // Error handling
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.message);
    });

})();
