// ===== CONFIGURAÇÕES GLOBAIS =====
class ConectEasy {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupParticles();
        this.setupFormHandling();
        this.setupInteractiveElements();
        this.setupCounterAnimation();
        this.setupCursorEffects();
        console.log('🚀 ConectEasy inicializada com sucesso!');
    }

    // ===== SCROLL EFFECTS =====
    setupScrollEffects() {
        // Header scroll effect
        const header = document.querySelector('.header');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Header background on scroll
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Header hide/show on scroll
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });

        // Scroll animations for elements
        this.setupScrollAnimations();
    }

    // ===== SCROLL ANIMATIONS =====
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animação específica para cards de serviço
                    if (entry.target.classList.contains('service-card')) {
                        this.animateServiceCard(entry.target);
                    }
                    
                    // Animação específica para cards da equipe
                    if (entry.target.classList.contains('team-card')) {
                        this.animateTeamCard(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observar todos os elementos com classe fade-in
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Observar elementos específicos
        document.querySelectorAll('.service-card, .team-card, .contact-item').forEach(el => {
            observer.observe(el);
        });
    }

    // ===== ANIMAÇÕES PERSONALIZADAS =====
    setupAnimations() {
        // Animação de digitação no hero
        this.typeWriterEffect();
        
        // Animação de flutuação contínua
        this.setupFloatingAnimations();
        
        // Animação de gradient nos botões
        this.setupButtonAnimations();
    }

    typeWriterEffect() {
        const title = document.querySelector('.hero-title');
        if (!title) return;

        const text = title.textContent;
        title.textContent = '';
        let i = 0;

        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };

        // Iniciar após um delay
        setTimeout(typeWriter, 1000);
    }

    setupFloatingAnimations() {
        // Adicionar animação de flutuação aleatória para elementos
        const floatingElements = document.querySelectorAll('.floating-card, .service-icon');
        
        floatingElements.forEach((el, index) => {
            const delay = index * 0.3;
            const duration = 3 + Math.random() * 2;
            
            el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        });
    }

    setupButtonAnimations() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createRipple(e);
            });
            
            button.addEventListener('click', (e) => {
                this.createClickEffect(e);
            });
        });
    }

    createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    createClickEffect(event) {
        const button = event.currentTarget;
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }

    // ===== PARTICLE EFFECT =====
    setupParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const canvas = document.createElement('canvas');
        canvas.classList.add('particles-canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        
        hero.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        };

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = `rgba(37, 99, 235, ${Math.random() * 0.3})`;
                this.alpha = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

                this.alpha -= 0.002;
                if (this.alpha <= 0) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        const initParticles = () => {
            particles = [];
            const particleCount = Math.min(50, Math.floor(canvas.width * canvas.height / 10000));
            
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Conectar partículas próximas
            ctx.strokeStyle = 'rgba(37, 99, 235, 0.1)';
            ctx.lineWidth = 0.5;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateParticles);
        };

        // Inicializar particles
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });

        resizeCanvas();
        initParticles();
        animateParticles();
    }

    // ===== FORM HANDLING =====
    setupFormHandling() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(contactForm);
        });

        // Efeitos de input
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    async handleFormSubmit(form) {
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        // Simular envio
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        try {
            // Simular delay de rede
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Sucesso
            this.showNotification('Mensagem enviada com sucesso!', 'success');
            form.reset();
        } catch (error) {
            this.showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remover após 5 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // ===== ELEMENTOS INTERATIVOS =====
    setupInteractiveElements() {
        // Mobile menu
        this.setupMobileMenu();
        
        // Smooth scroll para links
        this.setupSmoothScroll();
        
        // Hover effects para cards
        this.setupCardInteractions();
    }

    setupMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        const navButtons = document.querySelector('.nav-buttons');

        if (!mobileMenu) return;

        mobileMenu.addEventListener('click', () => {
            const isOpen = navLinks.style.display === 'flex';
            
            if (isOpen) {
                navLinks.style.display = 'none';
                navButtons.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navButtons.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.padding = '2rem';
                navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }
        });
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupCardInteractions() {
        const cards = document.querySelectorAll('.service-card, .team-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                this.handleCardTilt(e, card);
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }

    handleCardTilt(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = (x - centerX) / 25;
        const rotateX = (centerY - y) / 25;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    // ===== COUNTER ANIMATION =====
    setupCounterAnimation() {
        const stats = document.querySelectorAll('.stat h3');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
            }
        }, 16);
    }

    // ===== CURSOR EFFECTS =====
    setupCursorEffects() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        cursor.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: var(--primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transform: translate(-50%, -50%);
            transition: width 0.2s, height 0.2s;
        `;

        const cursorFollower = document.createElement('div');
        cursorFollower.className = 'cursor-follower';
        document.body.appendChild(cursorFollower);

        cursorFollower.style.cssText = `
            position: fixed;
            width: 30px;
            height: 30px;
            border: 2px solid var(--primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.1s;
            opacity: 0.5;
        `;

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        // Efeito de hover
        document.querySelectorAll('button, a, .service-card, .team-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '16px';
                cursor.style.height = '16px';
                cursorFollower.style.width = '50px';
                cursorFollower.style.height = '50px';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.width = '8px';
                cursor.style.height = '8px';
                cursorFollower.style.width = '30px';
                cursorFollower.style.height = '30px';
            });
        });
    }

    // ===== ANIMAÇÕES ESPECÍFICAS =====
    animateServiceCard(card) {
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        card.style.animation = `slideUp 0.6s ease forwards`;
    }

    animateTeamCard(card) {
        const delay = Array.from(document.querySelectorAll('.team-card')).indexOf(card) * 0.2;
        card.style.animationDelay = `${delay}s`;
        card.classList.add('fade-in');
    }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    new ConectEasy();
});

// ===== LOADING EFFECT =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remover loading screen se existir
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
});

// ===== RESIZE HANDLER =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        window.dispatchEvent(new Event('optimizedResize'));
    }, 250);
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // ESC para resetar animações
    if (e.key === 'Escape') {
        document.querySelectorAll('.service-card, .team-card').forEach(card => {
            card.style.animation = 'none';
        });
    }
    
    // Space para scroll to top
    if (e.key === ' ' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

console.log(`

███████╗███████╗██████╗ ███████╗ █████╗ ███████╗██╗   ██╗
██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗██╔════╝╚██╗ ██╔╝
█████╗  █████╗  ██████╔╝█████╗  ███████║███████╗ ╚████╔╝ 
██╔══╝  ██╔══╝  ██╔══██╗██╔══╝  ██╔══██║╚════██║  ╚██╔╝  
███████╗███████╗██████╔╝███████╗██║  ██║███████║   ██║   
╚══════╝╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   
                                                        
ConectEasy JS Carregado com Sucesso! 🚀

`);
