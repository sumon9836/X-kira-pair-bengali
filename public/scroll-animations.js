// Smooth Scroll Animations - One by One Reveal
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll animation class to all animatable elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .session-item-compact, .blocked-users-simple, .action-section, .sessions-section-compact');
        
        elements.forEach((element, index) => {
            element.classList.add('scroll-animate');
            element.style.setProperty('--animation-order', index);
        });
    };

    // Intersection Observer for smooth reveal on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe elements
    const observeElements = () => {
        const elements = document.querySelectorAll('.scroll-animate');
        elements.forEach(element => {
            observer.observe(element);
        });
    };

    // Initialize
    animateOnScroll();
    observeElements();

    // Re-observe on dynamic content changes
    const mutationObserver = new MutationObserver(() => {
        animateOnScroll();
        observeElements();
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Add stagger animation to session items
    const staggerSessionItems = () => {
        const sessionItems = document.querySelectorAll('.session-item-compact');
        sessionItems.forEach((item, index) => {
            item.style.setProperty('--stagger-delay', `${index * 0.1}s`);
        });
    };

    // Update stagger on changes
    setInterval(staggerSessionItems, 500);
});
