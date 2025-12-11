import './style.css'

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
});
