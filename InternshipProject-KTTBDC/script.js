//DROPDOWN MENU HANDLING

document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".dropdown");
    const menu = document.querySelector(".dropdown-menu");

    // Show dropdown on hover
    dropdown.addEventListener("mouseenter", function () {
        menu.style.display = "block";
    });

    // Hide dropdown when mouse leaves
    dropdown.addEventListener("mouseleave", function () {
        menu.style.display = "none";
    });

    // Handle dropdown toggle on mobile
    document.querySelectorAll(".dropdown > a").forEach(link => {
        link.addEventListener("click", function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdownMenu = this.nextElementSibling;
                dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".dropdown") && !event.target.closest("#mobile-menu")) {
            document.querySelectorAll(".dropdown-menu").forEach(menu => {
                menu.style.display = "none";
            });
        }
    });
});

//MOBILE MENU TOGGLE
document.addEventListener("DOMContentLoaded", function () {
    const mobileMenu = document.getElementById("mobile-menu");
    const nav = document.querySelector("nav");

    // Toggle mobile menu open/close
    mobileMenu.addEventListener("click", function () {
        nav.classList.toggle("active");
        this.classList.toggle("open"); // animate hamburger to "X"
    });

    // Close nav and dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!event.target.closest("nav") && !event.target.closest("#mobile-menu")) {
            nav.classList.remove("active");
            document.querySelectorAll(".dropdown-menu").forEach(menu => {
                menu.classList.remove("active");
            });
            mobileMenu.classList.remove("open");
        }
    });
});

//COMPONENT UNITS POP-UP
// Open popup by ID
function openPopup(id) {
    document.getElementById(id).style.display = "flex";
}

// Close popup by ID
function closePopup(id) {
    document.getElementById(id).style.display = "none";
}

// Hide all popups on page load and set click handlers for buttons
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".popup").forEach((popup) => {
        popup.style.display = "none";
    });

    document.querySelectorAll(".logo-card button").forEach((button) => {
        button.addEventListener("click", function () {
            let unit = this.innerText.toLowerCase();
            openPopup(`${unit}-popup`);
        });
    });
});

//IMAGE SLIDER
document.querySelectorAll('.popup').forEach(popup => {
    let slides = popup.querySelectorAll('.slide');
    let index = 0;

    function showSlide(n) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === n);
        });
    }

    showSlide(index); // show first slide by default

    let nextBtn = popup.querySelector('.next');
    let prevBtn = popup.querySelector('.prev');

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            index = (index + 1) % slides.length;
            showSlide(index);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            index = (index - 1 + slides.length) % slides.length;
            showSlide(index);
        });
    }
});

//PARTNERS CAROUSEL
document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".partners-carousel");
    const partners = Array.from(carousel.children);

    setInterval(() => {
        carousel.appendChild(partners[0]);
        partners.push(partners.shift());
    }, 2000); // rotate every 2 seconds
});

//SCROLL ANIMATIONS
// Animate objectives when in view
document.addEventListener("DOMContentLoaded", () => {
    const objectives = document.querySelectorAll(".objective");
    const heading = document.querySelector(".our-objectives h2");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add("animate");

                const icon = el.querySelector(".objective-icon");
                if (icon) icon.classList.add("animate");

                observer.unobserve(el); // run only once
            }
        });
    }, {
        threshold: 0.4,
        rootMargin: "0px 0px -50px 0px"
    });

    if (heading) observer.observe(heading);
    objectives.forEach((obj) => observer.observe(obj));
});

// Generic scroll animation
document.addEventListener("DOMContentLoaded", () => {
    const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle("visible", entry.isIntersecting);
        });
    }, {
        threshold: 0.1
    });

    elementsToAnimate.forEach(el => observer.observe(el));
});

//EMAILJS CONTACT FORM HANDLING

// EmailJS Initialization
(function () {
    emailjs.init("NRn4FqkuZXxyxNV4o");
})();

// Form submission with validation
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Clear error messages
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("messageError").textContent = "";

    // Validation
    if (name === "") {
        document.getElementById("nameError").textContent = "Name is required.";
        isValid = false;
    }
    if (email === "" || !emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Enter a valid email address.";
        isValid = false;
    }
    if (message === "") {
        document.getElementById("messageError").textContent = "Message is required.";
        isValid = false;
    }

    // Submit if valid
    if (isValid) {
        const submitBtn = document.getElementById("submitBtn");
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        emailjs.sendForm('service_xdwyy0o', 'template_z3g06ag', this)
            .then(() => {
                document.getElementById("successMessage").style.display = "block";
                document.getElementById("contactForm").reset();

                setTimeout(() => {
                    document.getElementById("successMessage").style.display = "none";
                }, 3000);
            })
            .catch((error) => {
                alert("Failed to send message. Please try again later.");
                console.error("EmailJS Error:", error);
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = "Submit";
            });
    }
});

  document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('active');
    });
  });

