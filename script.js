// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    });
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        }
    });
});

/// Multi-Level Referral Calculator
document.addEventListener('DOMContentLoaded', function() {
    // Referencia al input global de inversión
    const avgInvestmentInput = document.getElementById('avgInvestment');
    
    // Configuración de niveles (ya no necesitamos sliders ni tracks)
    const levels = [
        { 
            id: 1,
            input: document.getElementById('input1'),
            earnings: document.getElementById('earnings1'),
            commission: 0.10 // 10%
        },
        { 
            id: 2,
            input: document.getElementById('input2'),
            earnings: document.getElementById('earnings2'),
            commission: 0.05 // 5%
        },
        { 
            id: 3,
            input: document.getElementById('input3'),
            earnings: document.getElementById('earnings3'),
            commission: 0.03 // 3%
        },
        { 
            id: 4,
            input: document.getElementById('input4'),
            earnings: document.getElementById('earnings4'),
            commission: 0.02 // 2%
        }
    ];

    const totalMonthly = document.getElementById('totalMonthly');
    const totalAnnual = document.getElementById('totalAnnual');

    // Fórmula: 
    // 1. Total Trade Volume = Avg Wallet * 60 (trades/month)
    // 2. Fees Collected = Volume * 0.005 (fee) * 0.80 (revenue share)
    // 3. Earnings = Fees Collected * Tier Commission
    function calculateEarningsPerUser(avgAmount, commissionRate) {
        const tradesPerMonth = 60;
        const tradeFee = 0.005;
        const revenueShare = 0.80; 

        const totalTradeVolume = avgAmount * tradesPerMonth;
        const totalFeesCollected = totalTradeVolume * tradeFee * revenueShare;
        
        return totalFeesCollected * commissionRate;
    }

    function updateCalculations() {
        let totalMonthlyAmount = 0;
        const avgInvest = parseFloat(avgInvestmentInput.value) || 0;

        levels.forEach(level => {
            if(!level.input) return;

            // Obtenemos el número de referidos directamente del input
            let referrals = parseInt(level.input.value);
            
            // Evitar números negativos
            if (isNaN(referrals) || referrals < 0) {
                referrals = 0;
            }

            // Calculamos ganancia por ese nivel
            const earningsPerUser = calculateEarningsPerUser(avgInvest, level.commission);
            const levelTotal = earningsPerUser * referrals;

            // Actualizar texto de ganancias del nivel
            if(level.earnings) {
                level.earnings.textContent = `$${levelTotal.toFixed(2)}`;
            }
            
            // Sumar al total global
            totalMonthlyAmount += levelTotal;
        });

        const totalAnnualAmount = totalMonthlyAmount * 12;

        // Actualizar totales generales
        if(totalMonthly) totalMonthly.textContent = `$${totalMonthlyAmount.toFixed(2)}`;
        if(totalAnnual) totalAnnual.textContent = `$${totalAnnualAmount.toFixed(2)}`;
    }

    // Listener para el cambio en la inversión promedio
    if(avgInvestmentInput) {
        avgInvestmentInput.addEventListener('input', updateCalculations);
    }

    // Listeners para cada nivel (inputs de texto)
    levels.forEach(level => {
        if(level.input) {
            level.input.addEventListener('input', updateCalculations);
            // También escuchar 'change' por si acaso
            level.input.addEventListener('change', updateCalculations);
        }
    });

    // Ejecutar cálculo inicial
    updateCalculations();
    
    console.log('Referral Calculator (Inputs Only) Loaded');
});

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    }
});

// Intersection Observer for Animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .step, .tech-card, .benefit, .tokenomics-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Telegram Bot Message Animation
document.addEventListener('DOMContentLoaded', function() {
    const messages = document.querySelectorAll('.demo-message');
    
    // Animate messages with delay
    messages.forEach((message, index) => {
        if (message) {
            message.style.opacity = '0';
            message.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                message.style.transition = 'all 0.6s ease-out';
                message.style.opacity = '1';
                message.style.transform = 'translateY(0)';
            }, (index + 1) * 1000);
        }
    });
});

// Hero Stats Counter Animation
document.addEventListener('DOMContentLoaded', function() {
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        
        updateCounter();
    }
    
    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    if (text.includes('4500')) {
                        animateCounter(stat, 4500);
                        stat.textContent = '4500+';
                    } else if (text.includes('15K+')) {
                        animateCounter(stat, 15000);
                        stat.textContent = '15K+';
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual----');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Copy Contract Address Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contractAddress = '6J7mUbPXcAASzmG4k3umUnT1zaSw97WwduJM2aKJCeiF';
    
    // Add click handler to contract address in footer
    const footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom) {
        const contractText = footerBottom.querySelector('p:last-child');
        if (contractText) {
            contractText.style.cursor = 'pointer';
            contractText.title = 'Click to copy contract address';
            
            contractText.addEventListener('click', function() {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(contractAddress).then(function() {
                        // Show temporary feedback
                        const originalText = contractText.textContent;
                        contractText.textContent = 'Contract address copied!';
                        contractText.style.color = '#4CAF50';
                        
                        setTimeout(() => {
                            contractText.textContent = originalText;
                            contractText.style.color = '';
                        }, 2000);
                    }).catch(function(err) {
                        console.error('Could not copy text: ', err);
                    });
                }
            });
        }
    }
});

// Telegram Bot Demo Messages Cycling
document.addEventListener('DOMContentLoaded', function() {
    const demoMessages = [
        {
            title: '🚀 New Signal',
            content: 'Token: $BONK<br>Action: <span class="signal-buy">BUY</span><br>Confidence: 92%'
        },
        {
            title: '📈 Technical Analysis:',
            content: '• Bullish divergence detected<br>• Volume spike confirmed<br>• Resistance broken'
        },
        {
            title: '💰 Trade Setup:',
            content: 'Entry: $0.000018<br>Target 1: $0.000022<br>Stop Loss: $0.000015'
        },
        {
            title: '⚡ Market Update',
            content: 'Token: $PEPE<br>Action: <span class="signal-wait">WAIT</span><br>Confidence: 65%'
        },
        {
            title: '🎯 Signal Alert',
            content: 'Token: $DOGE<br>Action: <span class="signal-buy">BUY</span><br>Confidence: 88%'
        }
    ];
    
    const demoMessagesContainer = document.querySelector('.demo-messages');
    if (demoMessagesContainer) {
        let currentIndex = 0;
        
        function updateMessages() {
            const messages = demoMessagesContainer.querySelectorAll('.demo-message');
            
            messages.forEach((message, index) => {
                const messageData = demoMessages[(currentIndex + index) % demoMessages.length];
                message.innerHTML = `<strong>${messageData.title}</strong><br>${messageData.content}`;
            });
            
            currentIndex = (currentIndex + 1) % demoMessages.length;
        }
        
        // Update messages every 4 seconds
        setInterval(updateMessages, 4000);
    }
});

// Add CSS for signal wait class
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .signal-wait {
            background: #FF9800;
            color: white;
            padding: 2px 8px;
            border-radius: 10px;
            font-weight: 600;
            font-size: 0.8rem;
        }
    `;
    document.head.appendChild(style);
});

// Loading Animation for CTA Buttons
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add loading state for external links
            if (this.href && this.href.includes('t.me')) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening Telegram...';
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.pointerEvents = 'auto';
                }, 2000);
            }
        });
    });
});

// Responsive Image Loading
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Fallback for missing images
            this.style.display = 'none';
        });
    });
});

// Performance Optimization: Lazy Loading for Heavy Elements
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const lazyElements = document.querySelectorAll('.telegram-mockup, .demo-phone');
        
        const lazyObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    lazyObserver.unobserve(entry.target);
                }
            });
        });
        
        lazyElements.forEach(element => {
            lazyObserver.observe(element);
        });
    }
});

// Add keyboard navigation for accessibility
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        question.addEventListener('click', function() {
            const isExpanded = this.parentElement.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        });
    });
});

// Add focus management for better accessibility
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = document.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #667eea';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Scroll Progress Indicator
document.addEventListener('DOMContentLoaded', function() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #4c6ef5 0%, #5c7cfa 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
});