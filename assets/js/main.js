        // Smooth Scroll initialization (Lenis)
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            smooth: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Navbar behavior on scroll (Blur + Hide/Show integrated with Lenis)
        let lastScrollY = 0;
        let isMenuOpen = false;
        const navbar = document.getElementById('navbar');

        // IMPROVED: Use Lenis scroll for all navbar logic
        lenis.on('scroll', ({ scroll, velocity, direction }) => {
            const currentScrollY = scroll;
            
            // 1. Handle background blur/shadow (Fixed threshold)
            if (currentScrollY > 60) {
                navbar.classList.add('shadow-md');
                navbar.classList.replace('bg-white/40', 'bg-white/70');
                navbar.classList.replace('backdrop-blur-md', 'backdrop-blur-xl');
            } else {
                navbar.classList.remove('shadow-md');
                navbar.classList.replace('bg-white/70', 'bg-white/40');
                navbar.classList.replace('backdrop-blur-xl', 'backdrop-blur-md');
            }

            // 2. SMART HIDE: Only hide if NOT at the top AND menu is NOT open
            if (!isMenuOpen) {
                if (direction === 1 && currentScrollY > 200) {
                    // Scrolling down (direction 1) and passed threshold
                    navbar.classList.add('nav-hidden');
                } else if (direction === -1 || currentScrollY < 50) {
                    // Scrolling up (direction -1) OR at the very top
                    navbar.classList.remove('nav-hidden');
                }
            }

            lastScrollY = currentScrollY;
        });

        // Trigger navbar load animation on start
        setTimeout(() => {
            if (navbar) navbar.classList.add('loaded');
        }, 100);

        // ==========================================
        // GSAP ScrollTrigger Animations (Rapdin Flow)
        // ==========================================
        gsap.registerPlugin(ScrollTrigger);

        // Make elements visible right before animating them to prevent FOUC (Flash of unstyled content)
        gsap.set('.gsap-reveal', { autoAlpha: 1 });

        // Hero Section Intro Animation
        const tlHero = gsap.timeline();
        tlHero.from(".hero-content > .gsap-reveal", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            filter: "blur(10px)" // Optional blur entrance
        })
            .from(".hero-widget", {
                x: 80,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                rotationY: 10
            }, "-=1");

        // Sessão 2: O Vazamento (Slide in Up com Stagger)

        gsap.from(".vazamento-header", {
            y: 40, opacity: 0, duration: 1, ease: "power3.out",
            scrollTrigger: {
                trigger: "#diagnostico",
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.from(".vazamento-card", {
            y: 100,
            scale: 0.9,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "expo.out",
            scrollTrigger: {
                trigger: "#diagnostico",
                start: "top 60%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.from(".vazamento-footer", {
            y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 1,
            scrollTrigger: {
                trigger: "#diagnostico",
                start: "top 60%",
                toggleActions: "play none none reverse"
            }
        });

        // Sessão 3: Agentes (Scale in effect similar to Rapdin)
        gsap.from(".agentes-header", {
            y: 40, opacity: 0, duration: 1, ease: "power3.out",
            scrollTrigger: {
                trigger: "#agentes",
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.from(".agent-card-wrapper", {
            scale: 0.85,
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.2, // Cascata elegante
            ease: "back.out(1.2)",
            scrollTrigger: {
                trigger: ".agent-card-wrapper",
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.from(".agent-footer", {
            y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 0.8,
            scrollTrigger: {
                trigger: ".agent-card-wrapper",
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // ==========================================
        // Sessão 4/5: The Pinned Scroll Journey (Removed - Section is now static)
        // ==========================================

        // ==========================================
        // Sessão Dashboard do Dono
        // ==========================================
        gsap.from(".dashboard-header", {
            y: 40, opacity: 0, duration: 1, ease: "power3.out",
            scrollTrigger: {
                trigger: "#dashboard",
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.from(".dashboard-mockup", {
            y: 80, opacity: 0, rotationX: 10, scale: 0.95, duration: 1.2, ease: "power3.out",
            scrollTrigger: {
                trigger: ".dashboard-mockup",
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // ==========================================
        // Sessão Final/CTA: (Slide Up e Scale)
        // ==========================================
        gsap.from(".cta-content > .gsap-reveal", {
            y: 60,
            opacity: 0,
            scale: 0.95,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: "#cta",
                start: "top 75%",
                toggleActions: "play none none none" // CTA só entra uma vez
            }
        });

        // Efeito Parallax Dinâmico
        // Moves the elements along the Y-axis slightly according to the scroll progress
        gsap.to(".parallax-bg", {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        });

        // Extra: Refinamento de Parallax no Vazamento Grid Dark
        gsap.to("#diagnostico .grid-bg-dark", {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: "#diagnostico",
                start: "top bottom",
                end: "bottom top",
                scrub: 1 // scrubbing bound to scroll rate
            }
        });

        // ==========================================
        // Interatividade do Dashboard do Dono
        // ==========================================

        // Navbar Toggle Script
        const menuToggle = document.getElementById('menu-toggle');
        const menuClose = document.getElementById('menu-close'); // Header inside menu
        const mobileMenu = document.getElementById('mobile-menu');
        const line1 = document.getElementById('line1');
        const line2 = document.getElementById('line2');
        const line3 = document.getElementById('line3');
        const mobileLinks = document.querySelectorAll('.mobile-menu-link');

        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scroll
                
                // Animate Burger to Close (Main Header)
                line1.style.transform = 'translateY(8px) rotate(45deg)';
                line2.style.opacity = '0';
                line3.style.transform = 'translateY(-8px) rotate(-45deg)';
                line3.style.width = '24px';
            } else {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = ''; // Restore scroll
                
                // Animate Close to Burger (Main Header)
                line1.style.transform = '';
                line2.style.opacity = '1';
                line3.style.transform = '';
                line3.style.width = '';
            }
        }

        menuToggle.addEventListener('click', toggleMenu);
        if (menuClose) menuClose.addEventListener('click', toggleMenu); // Support X inside menu

        // Close menu on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Ensure href clicks still work while menu closes
                if (isMenuOpen) toggleMenu();
            });
        });

        // Base GSAP standard reveals
        gsap.utils.toArray('.gsap-reveal').forEach(elem => {
            gsap.fromTo(elem,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Efeito de Entrada em Cascata no Texto Principal da HERO (gsap-reveal-text)
        gsap.to(".gsap-reveal-text", {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
            delay: 0.2 // Leve delay para suavizar a entrada da página
        });

        // Navbar Fade In
        setTimeout(() => {
            document.getElementById('navbar').classList.add('loaded');
        }, 100);

