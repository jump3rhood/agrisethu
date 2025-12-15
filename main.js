// css imported in html

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const btn = document.querySelector(".mobile-menu-button");
    const menu = document.querySelector(".mobile-menu");

    if (btn && menu) {
        btn.addEventListener("click", () => {
            menu.classList.toggle("hidden");
        });
    }

    // Navbar Scroll Logic
    const navbar = document.querySelector("nav");
    let lastScrollY = window.scrollY;

    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > lastScrollY && window.scrollY > 80) { // Scrolling down & passed header
                navbar.classList.add("navbar-hidden");
                navbar.classList.remove("navbar-visible");
            } else { // Scrolling up
                navbar.classList.remove("navbar-hidden");
                navbar.classList.add("navbar-visible");
            }
            lastScrollY = window.scrollY;
        });
    }

    // Scroll Animation Logic
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Number Counter Animation
    const counters = document.querySelectorAll('.stats-counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const suffix = counter.getAttribute('data-suffix') || '';
                const prefix = counter.getAttribute('data-prefix') || '';
                let current = 0;
                // Adjust duration/steps as needed
                const duration = 2000; // 2 seconds
                const steps = 50;
                const increment = target / steps;
                const stepTime = duration / steps;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = prefix + target + suffix;
                        clearInterval(timer);
                    } else {
                        counter.textContent = prefix + Math.floor(current) + suffix;
                    }
                }, stepTime);

                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Typed.js Initialization (looking for elements with class 'typing-text')
    // We assume Typed.js script is loaded in the HTML
    const typingElements = document.querySelectorAll('.typing-text');
    if (typingElements.length > 0 && typeof Typed !== 'undefined') {
        typingElements.forEach(el => {
            const strings = JSON.parse(el.getAttribute('data-strings') || '[]');
            if (strings.length > 0) {
                new Typed(el, {
                    strings: strings,
                    typeSpeed: 50,
                    backSpeed: 30,
                    backDelay: 2000,
                    loop: true,
                    showCursor: true,
                    cursorChar: '|',
                    autoInsertCss: true
                });
            }
        });
    }
});
