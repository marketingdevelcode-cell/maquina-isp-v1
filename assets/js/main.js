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

        // Navbar blur behavior on scroll
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md');
                navbar.classList.replace('bg-white/40', 'bg-white/70');
                navbar.classList.replace('backdrop-blur-md', 'backdrop-blur-xl');
            } else {
                navbar.classList.remove('shadow-md');
                navbar.classList.replace('bg-white/70', 'bg-white/40');
                navbar.classList.replace('backdrop-blur-xl', 'backdrop-blur-md');
            }
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
        // Sessão 4/5: The Pinned Scroll Journey (Apple-Style)
        // ==========================================

        let journeyTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#produto",
                start: "top top", // Quando o topo da div produto chegar no topo da tela
                end: "+=4000", // Rola 4000px antes de desgrudar
                scrub: 1, // Suavidade do amarrilho ao scroll
                pin: true, // Fixa a tela!
                anticipatePin: 1
            }
        });

        // Intro (aparecer state 1)
        journeyTl.fromTo("#text-step-1", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
            .fromTo("#mockup-step-1", { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1 }, "<");

        // Transição State 1 -> State 2
        journeyTl.to("#text-step-1", { opacity: 0, y: -30, duration: 1 })
            .to("#mockup-step-1", { opacity: 0, scale: 0.9, duration: 1 }, "<")
            .to("#backing-plate-1", { rotation: -6, x: -10, duration: 1 }, "<") // Anima o fundo

            .to("#text-step-2", { opacity: 1, y: 0, duration: 1 }, "-=0.2")
            .to("#mockup-step-2", { opacity: 1, y: 0, scale: 1, duration: 1 }, "<")
            .fromTo(".animate-spin-slow", { rotation: 0 }, { rotation: 360, duration: 2, ease: "none" }, "<"); // Spin gear

        // Pequena pausa (Scroll delay virtual)
        journeyTl.to({}, { duration: 0.5 });

        // Transição State 2 -> State 3
        journeyTl.to("#text-step-2", { opacity: 0, y: -30, duration: 1 })
            .to("#mockup-step-2", { opacity: 0, scale: 0.9, duration: 1 }, "<")
            .to("#backing-plate-2", { rotation: 6, x: 10, duration: 1 }, "<") // Anima o 2o fundo

            .to("#text-step-3", { opacity: 1, y: 0, duration: 1 }, "-=0.2")
            .to("#mockup-step-3", { opacity: 1, y: 0, scale: 1, duration: 1 }, "<");

        // Transição State 3 -> State 4
        journeyTl.to("#text-step-3", { opacity: 0, y: -30, duration: 1 })
            .to("#mockup-step-3", { opacity: 0, scale: 0.9, duration: 1 }, "<")

            .to("#text-step-4", { opacity: 1, y: 0, duration: 1 }, "-=0.2")
            .to("#mockup-step-4", { opacity: 1, y: 0, scale: 1, duration: 1 }, "<");

        // Pausa final antes de soltar o pino
        journeyTl.to({}, { duration: 1 });

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
        const mobileMenu = document.getElementById('mobile-menu');
        const line1 = document.getElementById('line1');
        const line2 = document.getElementById('line2');
        const line3 = document.getElementById('line3');
        const mobileLinks = document.querySelectorAll('.mobile-menu-link');

        let isMenuOpen = false;

        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scroll
                
                // Animate Burger to Close
                line1.style.transform = 'translateY(8px) rotate(45deg)';
                line2.style.opacity = '0';
                line3.style.transform = 'translateY(-8px) rotate(-45deg)';
                line3.style.width = '24px';
            } else {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = ''; // Restore scroll
                
                // Animate Close to Burger
                line1.style.transform = '';
                line2.style.opacity = '1';
                line3.style.transform = '';
                line3.style.width = '';
            }
        }

        menuToggle.addEventListener('click', toggleMenu);

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

