/*==================================
* Professional Portfolio Animations
* JavaScript for scroll reveals and interactions
==================================== */

(function($) {
    "use strict";

    // Preloader
    $(window).on('load', function() {
        $('#preloader').addClass('fade-out');
        setTimeout(function() {
            $('#preloader').css('display', 'none');
        }, 500);
    });

    // Scroll Reveal Animation
    function reveal() {
        var reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }

    window.addEventListener('scroll', reveal);
    $(document).ready(function() {
        reveal();
    });

    // Typing Animation Trigger
    $(document).ready(function() {
        setTimeout(function() {
            $('.typing-text').css('animation', 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite');
        }, 500);
    });

    // Navbar Background on Scroll
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 100) {
            $('.navbar').addClass('navbar-scrolled');
        } else {
            $('.navbar').removeClass('navbar-scrolled');
        }
    });

    // Active Navigation Link on Scroll
    $(window).on('scroll', function() {
        var scrollPosition = $(window).scrollTop();
        
        $('section').each(function() {
            var top = $(this).offset().top - 100;
            var bottom = top + $(this).outerHeight();
            var id = $(this).attr('id');
            
            if (scrollPosition >= top && scrollPosition <= bottom) {
                $('.nav li').removeClass('active');
                $('a[href="#' + id + '"]').parent().addClass('active');
            }
        });
    });

    // Parallax Effect for Hero Section
    $(window).on('scroll', function() {
        var scrolled = $(window).scrollTop();
        $('.welcome-hero').css({
            'transform': 'translateY(' + (scrolled * 0.5) + 'px)'
        });
    });

    // Progress Bar Animation
    function animateProgressBars() {
        $('.progress-fill').each(function() {
            var $this = $(this);
            var width = $this.data('width');
            
            if ($this.visible(true)) {
                $this.css('--progress-width', width + '%');
                $this.addClass('animate');
            }
        });
    }

    $(window).on('scroll', animateProgressBars);

    // Counter Animation
    function animateCounters() {
        $('.counter').each(function() {
            var $this = $(this);
            
            if ($this.visible(true) && !$this.hasClass('animated')) {
                $this.addClass('animated');
                
                var countTo = $this.data('count');
                $({ countNum: 0 }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                    }
                });
            }
        });
    }

    $(window).on('scroll', animateCounters);

    // Button Ripple Effect
    $('.btn-ripple').on('click', function(e) {
        var $this = $(this);
        var offset = $this.offset();
        var x = e.pageX - offset.left;
        var y = e.pageY - offset.top;
        
        var ripple = $('<span class="ripple"></span>');
        ripple.css({
            left: x + 'px',
            top: y + 'px'
        });
        
        $this.append(ripple);
        
        setTimeout(function() {
            ripple.remove();
        }, 600);
    });

    // Hover Lift Effect Enhancement
    $('.hover-lift').on('mouseenter', function() {
        $(this).css('transform', 'translateY(-10px)');
    }).on('mouseleave', function() {
        $(this).css('transform', 'translateY(0)');
    });

    // Image Zoom Effect
    $('.img-zoom').on('mouseenter', function() {
        $(this).find('img').css('transform', 'scale(1.1)');
    }).on('mouseleave', function() {
        $(this).find('img').css('transform', 'scale(1)');
    });

    // Stagger Animation for List Items
    function staggerAnimation() {
        $('.stagger-1, .stagger-2, .stagger-3, .stagger-4, .stagger-5, .stagger-6').each(function() {
            var $this = $(this);
            
            if ($this.visible(true) && !$this.hasClass('staggered')) {
                $this.addClass('staggered');
                
                var delay = 0;
                if ($this.hasClass('stagger-1')) delay = 100;
                if ($this.hasClass('stagger-2')) delay = 200;
                if ($this.hasClass('stagger-3')) delay = 300;
                if ($this.hasClass('stagger-4')) delay = 400;
                if ($this.hasClass('stagger-5')) delay = 500;
                if ($this.hasClass('stagger-6')) delay = 600;
                
                setTimeout(function() {
                    $this.css('opacity', '1');
                    $this.css('transform', 'translateY(0)');
                }, delay);
            }
        });
    }

    $(window).on('scroll', staggerAnimation);
    $(document).ready(function() {
        staggerAnimation();
    });

    // Particle Animation Enhancement
    function animateParticles() {
        var particles = document.querySelectorAll('.particle');
        particles.forEach(function(particle, index) {
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';
        });
    }

    $(document).ready(function() {
        animateParticles();
    });

    // Glow Effect on Scroll
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        
        if (scroll > 500) {
            $('.return-to-top').addClass('glow');
        } else {
            $('.return-to-top').removeClass('glow');
        }
    });

    // Form Input Animation
    $('input, textarea').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        if ($(this).val() === '') {
            $(this).parent().removeClass('focused');
        }
    });

    // Card Flip on Click (for mobile)
    $('.card-flip').on('click', function() {
        if ($(window).width() < 768) {
            $(this).toggleClass('flipped');
        }
    });

    // Video Section Enhancement
    $('.video-item').on('mouseenter', function() {
        $(this).find('iframe').css('transform', 'scale(1.02)');
    }).on('mouseleave', function() {
        $(this).find('iframe').css('transform', 'scale(1)');
    });

    // Brand/Skills Carousel Enhancement
    if ($('.brand-item').length) {
        $('.brand-item').owlCarousel({
            loop: true,
            margin: 30,
            autoplay: true,
            autoplayTimeout: 3000,
            responsive: {
                0: { items: 2 },
                576: { items: 3 },
                768: { items: 4 },
                992: { items: 6 }
            }
        });
    }

    // Initialize Owl Carousel for New Cars (Projects)
    if ($('#new-cars-carousel').length) {
        $('#new-cars-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            responsive: {
                0: { items: 1 },
                768: { items: 1 },
                992: { items: 1 }
            }
        });
    }

    // Performance: Pause animations when tab is hidden
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            $('.animated-bg').css('animation-play-state', 'paused');
        } else {
            $('.animated-bg').css('animation-play-state', 'running');
        }
    });

    // Initialize WOW.js-style animations on load
    $(window).on('load', function() {
        $('.reveal, .reveal-left, .reveal-right, .reveal-scale').each(function(index) {
            var $this = $(this);
            setTimeout(function() {
                if ($this.visible(true)) {
                    $this.addClass('active');
                }
            }, index * 100);
        });
    });

})(jQuery);

// jQuery Visible Plugin (Helper)
(function($) {
    var $w = $(window);
    $.fn.visible = function(partial, hidden, direction) {
        if (this.length < 1) return;
        
        var $t = this.length > 1 ? this.eq(0) : this,
            t = $t.get(0),
            vpWidth = $w.width(),
            vpHeight = $w.height(),
            direction = (direction) ? direction : 'both',
            clientSize = hidden === true ? t.offsetWidth * t.offsetHeight : true;
        
        if (typeof t.getBoundingClientRect === 'function') {
            var rec = t.getBoundingClientRect(),
                tViz = rec.top >= 0 && rec.top < vpHeight,
                bViz = rec.bottom > 0 && rec.bottom <= vpHeight,
                lViz = rec.left >= 0 && rec.left < vpWidth,
                rViz = rec.right > 0 && rec.right <= vpWidth,
                vVisible = partial ? tViz || bViz : tViz && bViz,
                hVisible = partial ? lViz || rViz : lViz && rViz;
            
            if (direction === 'both')
                return clientSize && vVisible && hVisible;
            else if (direction === 'vertical')
                return clientSize && vVisible;
            else if (direction === 'horizontal')
                return clientSize && hVisible;
        } else {
            var viewTop = $w.scrollTop(),
                viewBottom = viewTop + vpHeight,
                viewLeft = $w.scrollLeft(),
                viewRight = viewLeft + vpWidth,
                offset = $t.offset(),
                _top = offset.top,
                _bottom = _top + $t.height(),
                _left = offset.left,
                _right = _left + $t.width(),
                compareTop = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom,
                compareLeft = partial === true ? _right : _left,
                compareRight = partial === true ? _left : _right;
            
            if (direction === 'both')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) &&
                    ((compareRight <= viewRight) && (compareLeft >= viewLeft));
            else if (direction === 'vertical')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
            else if (direction === 'horizontal')
                return !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
        }
    };
})(jQuery);
