document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const btn = document.querySelector(".mobile-menu-button");
    const menu = document.querySelector(".mobile-menu");


    if (btn && menu) {
        // Toggle menu on button click
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            menu.classList.toggle("hidden");
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!menu.classList.contains("hidden") &&
                !menu.contains(e.target) &&
                !btn.contains(e.target)) {
                menu.classList.add("hidden");
            }
        });

        // Close menu when clicking a link
        const menuLinks = menu.querySelectorAll("a");
        menuLinks.forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.add("hidden");
            });
        });

        // Close menu on window resize to desktop size
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 768) { // md breakpoint
                menu.classList.add("hidden");
            }
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
                    autoInsertCss: true,
                    contentType: 'string'
                });
            }
        });
    }

    // ========================================
    // CONTACT FORM VALIDATION
    // ========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // Form field elements
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const phoneField = document.getElementById('phone');
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');
        const messageCounter = document.getElementById('message-counter');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');

        // Validation functions
        const validators = {
            name: (value) => {
                if (!value.trim()) {
                    return 'Please enter your full name';
                }
                if (value.trim().length < 2) {
                    return 'Name must be at least 2 characters long';
                }
                if (value.trim().length > 50) {
                    return 'Name must be less than 50 characters';
                }
                if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                    return 'Name can only contain letters, spaces, hyphens, and apostrophes';
                }
                return null;
            },

            email: (value) => {
                if (!value.trim()) {
                    return 'Please enter your email address';
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    return 'Please enter a valid email address';
                }
                return null;
            },

            phone: (value) => {
                // Phone is optional, but if provided, must be valid
                if (value.trim() === '') {
                    return null; // Optional field
                }
                const phoneRegex = /^[0-9+\s\-()]+$/;
                if (!phoneRegex.test(value)) {
                    return 'Phone number can only contain numbers, +, -, (), and spaces';
                }
                const digitsOnly = value.replace(/\D/g, '');
                if (digitsOnly.length < 10) {
                    return 'Phone number must be at least 10 digits';
                }
                if (digitsOnly.length > 15) {
                    return 'Phone number must be less than 15 digits';
                }
                return null;
            },

            subject: (value) => {
                if (!value || value === '') {
                    return 'Please select a subject';
                }
                return null;
            },

            message: (value) => {
                if (!value.trim()) {
                    return 'Please enter your message';
                }
                if (value.trim().length < 10) {
                    return 'Message must be at least 10 characters long';
                }
                if (value.length > 1000) {
                    return 'Message must be less than 1000 characters';
                }
                return null;
            }
        };

        // Show error message
        const showError = (field, message) => {
            const errorElement = document.getElementById(`${field.id}-error`);
            if (errorElement) {
                errorElement.classList.remove('hidden');
                errorElement.querySelector('.error-text').textContent = message;
                field.classList.add('error');
                field.classList.remove('success');

                // Add shake animation
                field.classList.add('animate-shake');
                setTimeout(() => {
                    field.classList.remove('animate-shake');
                }, 500);
            }
        };

        // Clear error message
        const clearError = (field) => {
            const errorElement = document.getElementById(`${field.id}-error`);
            if (errorElement) {
                errorElement.classList.add('hidden');
                field.classList.remove('error');
            }
        };

        // Show success state
        const showSuccess = (field) => {
            clearError(field);
            field.classList.add('success');
        };

        // Validate field
        const validateField = (field) => {
            const value = field.value;
            const validator = validators[field.id];

            if (validator) {
                const error = validator(value);
                if (error) {
                    showError(field, error);
                    return false;
                } else {
                    showSuccess(field);
                    return true;
                }
            }
            return true;
        };

        // Real-time validation on blur
        [nameField, emailField, phoneField, subjectField, messageField].forEach(field => {
            if (field) {
                field.addEventListener('blur', () => {
                    validateField(field);
                });

                // Clear error on input
                field.addEventListener('input', () => {
                    if (field.classList.contains('error')) {
                        clearError(field);
                    }
                });
            }
        });

        // Message character counter
        if (messageField && messageCounter) {
            messageField.addEventListener('input', () => {
                const currentLength = messageField.value.length;
                messageCounter.textContent = `${currentLength} / 1000`;

                if (currentLength > 1000) {
                    messageCounter.classList.add('text-red-600');
                    messageCounter.classList.remove('text-gray-500');
                } else {
                    messageCounter.classList.remove('text-red-600');
                    messageCounter.classList.add('text-gray-500');
                }
            });
        }

        // Form submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Hide previous messages
            if (successMessage) successMessage.classList.add('hidden');
            if (errorMessage) errorMessage.classList.add('hidden');

            // Validate all fields
            const isNameValid = validateField(nameField);
            const isEmailValid = validateField(emailField);
            const isPhoneValid = validateField(phoneField);
            const isSubjectValid = validateField(subjectField);
            const isMessageValid = validateField(messageField);

            const isFormValid = isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid;

            if (isFormValid) {
                // Show success message
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }

                // In a real application, you would submit the form data here
                // Example: await fetch('/api/contact', { method: 'POST', body: formData });

                // Reset form after 5 seconds
                setTimeout(() => {
                    contactForm.reset();
                    if (messageCounter) messageCounter.textContent = '0 / 1000';

                    // Clear all success states
                    [nameField, emailField, phoneField, subjectField, messageField].forEach(field => {
                        if (field) {
                            field.classList.remove('success', 'error');
                        }
                    });

                    if (successMessage) successMessage.classList.add('hidden');
                }, 5000);

            } else {
                // Show error message
                if (errorMessage) {
                    errorMessage.classList.remove('hidden');
                    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }

                // Find first error field and focus it
                const firstErrorField = [nameField, emailField, phoneField, subjectField, messageField]
                    .find(field => field && field.classList.contains('error'));

                if (firstErrorField) {
                    firstErrorField.focus();
                }

                // Hide error message after 5 seconds
                setTimeout(() => {
                    if (errorMessage) errorMessage.classList.add('hidden');
                }, 5000);
            }
        });

        // Prevent form submission on Enter key (except for textarea)
        contactForm.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
            }
        });
    }
});
// // css imported in html

// document.addEventListener('DOMContentLoaded', () => {
//     // Mobile Menu Logic
//     const btn = document.querySelector(".mobile-menu-button");
//     const menu = document.querySelector(".mobile-menu");

//     if (btn && menu) {
//         btn.addEventListener("click", () => {
//             menu.classList.toggle("hidden");
//         });
//     }

//     // Navbar Scroll Logic
//     const navbar = document.querySelector("nav");
//     let lastScrollY = window.scrollY;

//     if (navbar) {
//         window.addEventListener("scroll", () => {
//             if (window.scrollY > lastScrollY && window.scrollY > 80) { // Scrolling down & passed header
//                 navbar.classList.add("navbar-hidden");
//                 navbar.classList.remove("navbar-visible");
//             } else { // Scrolling up
//                 navbar.classList.remove("navbar-hidden");
//                 navbar.classList.add("navbar-visible");
//             }
//             lastScrollY = window.scrollY;
//         });
//     }

//     // Scroll Animation Logic
//     const revealElements = document.querySelectorAll(".reveal");

//     const revealObserver = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add("active");
//                 observer.unobserve(entry.target); // Only animate once
//             }
//         });
//     }, {
//         root: null,
//         threshold: 0.15, // Trigger when 15% visible
//         rootMargin: "0px 0px -50px 0px"
//     });

//     revealElements.forEach(el => revealObserver.observe(el));

//     // Number Counter Animation
//     const counters = document.querySelectorAll('.stats-counter');
//     const counterObserver = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const counter = entry.target;
//                 const target = parseInt(counter.getAttribute('data-target'));
//                 const suffix = counter.getAttribute('data-suffix') || '';
//                 const prefix = counter.getAttribute('data-prefix') || '';
//                 let current = 0;
//                 // Adjust duration/steps as needed
//                 const duration = 2000; // 2 seconds
//                 const steps = 50;
//                 const increment = target / steps;
//                 const stepTime = duration / steps;

//                 const timer = setInterval(() => {
//                     current += increment;
//                     if (current >= target) {
//                         counter.textContent = prefix + target + suffix;
//                         clearInterval(timer);
//                     } else {
//                         counter.textContent = prefix + Math.floor(current) + suffix;
//                     }
//                 }, stepTime);

//                 observer.unobserve(counter);
//             }
//         });
//     }, { threshold: 0.5 });

//     counters.forEach(counter => counterObserver.observe(counter));

//     // Typed.js Initialization (looking for elements with class 'typing-text')
//     // We assume Typed.js script is loaded in the HTML
//     const typingElements = document.querySelectorAll('.typing-text');
//     if (typingElements.length > 0 && typeof Typed !== 'undefined') {
//         typingElements.forEach(el => {
//             const strings = JSON.parse(el.getAttribute('data-strings') || '[]');
//             if (strings.length > 0) {
//                 new Typed(el, {
//                     strings: strings,
//                     typeSpeed: 50,
//                     backSpeed: 30,
//                     backDelay: 2000,
//                     loop: true,
//                     showCursor: true,
//                     cursorChar: '|',
//                     autoInsertCss: true
//                 });
//             }
//         });
//     }
// });
