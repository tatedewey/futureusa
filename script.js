// Vouch Notifications System
class VouchNotifications {
    constructor() {
        this.notifications = [
            { name: "Sarah M.", text: "just claimed food assistance" },
            { name: "Michael R.", text: "just claimed food assistance" },
            { name: "Jennifer L.", text: "just claimed food assistance" },
            { name: "David K.", text: "just claimed food assistance" },
            { name: "Lisa W.", text: "just claimed food assistance" },
            { name: "Robert T.", text: "just claimed food assistance" },
            { name: "Maria G.", text: "just claimed food assistance" },
            { name: "James H.", text: "just claimed food assistance" },
            { name: "Amanda S.", text: "just claimed food assistance" },
            { name: "Christopher B.", text: "just claimed food assistance" }
        ];
        
        this.currentIndex = 0;
        this.isRunning = false;
        this.init();
    }
    
    init() {
        // Start the notification cycle
        this.startNotifications();
        
        // Add some randomness to make it feel more natural
        this.addRandomDelay();
    }
    
    startNotifications() {
        if (this.isRunning) return;
        this.isRunning = true;
        
        this.showNextNotification();
    }
    
    showNextNotification() {
        const notification = document.getElementById(`notification${(this.currentIndex % 5) + 1}`);
        const notificationData = this.notifications[this.currentIndex % this.notifications.length];
        
        // Update notification content
        const nameElement = notification.querySelector('.notification-name');
        const textElement = notification.querySelector('.notification-text');
        
        nameElement.textContent = notificationData.name;
        textElement.textContent = notificationData.text;
        
        // Show notification
        notification.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            
            // Wait 8 seconds before showing next notification
            setTimeout(() => {
                this.currentIndex++;
                this.showNextNotification();
            }, 8000);
        }, 5000);
    }
    
    addRandomDelay() {
        // Add random delays between notifications to make it feel more natural
        const randomDelay = Math.random() * 2000 + 1000; // 1-3 seconds
        setTimeout(() => {
            this.startNotifications();
        }, randomDelay);
    }
}

// Smooth scroll behavior for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Initialize vouch notifications
    new VouchNotifications();
    
    // Add smooth scrolling to any anchor links
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
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.step, .notice-container').forEach(el => {
        observer.observe(el);
    });
    
    // Add hover effects for interactive elements
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
    
    // Add click effect to CTA button
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Performance optimization: Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--animation-iteration-count', '1');
}

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.hero-section, .cta-section, .steps-section, .notice-section').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 100);
});

// Handle window resize for responsive adjustments
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate any size-dependent elements
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            // Reset animation to prevent layout issues
            particle.style.animation = 'none';
            particle.offsetHeight; // Trigger reflow
            particle.style.animation = null;
        });
    }, 250);
});
