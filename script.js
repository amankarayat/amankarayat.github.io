/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

const navLinks = document.querySelectorAll(".nav-link");


menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("active")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});


/* Close mobile menu when clicking a link */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});


/* =========================================
   TYPING EFFECT
========================================= */

const typingText = document.getElementById("typing-text");

const words = [
    "Data Analyst",
    "Data Scientist",
    "BCA Student"
];

let wordIndex = 0;
let characterIndex = 0;

let isDeleting = false;


function typeEffect() {

    const currentWord = words[wordIndex];

    if (isDeleting) {

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;

    } else {

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;

    }


    let typingSpeed = isDeleting ? 60 : 100;


    if (!isDeleting &&
        characterIndex === currentWord.length) {

        typingSpeed = 1800;

        isDeleting = true;

    }


    else if (isDeleting &&
        characterIndex === 0) {

        isDeleting = false;

        wordIndex++;

        if (wordIndex === words.length) {

            wordIndex = 0;

        }

        typingSpeed = 400;

    }


    setTimeout(typeEffect, typingSpeed);

}


typeEffect();


/* =========================================
   DARK MODE
========================================= */

const themeToggle =
    document.getElementById("theme-toggle");

const themeIcon =
    themeToggle.querySelector("i");


const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeIcon.classList.remove("fa-moon");

    themeIcon.classList.add("fa-sun");

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");


    const isDark =
        document.body.classList.contains("dark-mode");


    if (isDark) {

        themeIcon.classList.remove("fa-moon");

        themeIcon.classList.add("fa-sun");

        localStorage.setItem(
            "portfolio-theme",
            "dark"
        );

    } else {

        themeIcon.classList.remove("fa-sun");

        themeIcon.classList.add("fa-moon");

        localStorage.setItem(
            "portfolio-theme",
            "light"
        );

    }

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("section[id]");


window.addEventListener("scroll", () => {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================
   BACK TO TOP
========================================= */

const backToTop =
    document.getElementById("back-to-top");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =========================================
   CURRENT YEAR
========================================= */

const currentYear =
    document.getElementById("current-year");


currentYear.textContent =
    new Date().getFullYear();


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contact-form");

const formStatus =
    document.getElementById("form-status");


contactForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    formStatus.textContent =
        "Sending message...";

    formStatus.style.color =
        "var(--primary)";


    const formData =
        new FormData(contactForm);


    try {

        const response =
            await fetch(
                contactForm.action,
                {
                    method: "POST",

                    body: formData,

                    headers: {
                        Accept:
                            "application/json"
                    }
                }
            );


        if (response.ok) {

            formStatus.textContent =
                "Message sent successfully! Thank you.";

            formStatus.style.color =
                "green";

            contactForm.reset();

        } else {

            formStatus.textContent =
                "Something went wrong. Please try again.";

            formStatus.style.color =
                "red";

        }

    } catch (error) {

        formStatus.textContent =
            "Unable to send message. Please try again.";

        formStatus.style.color =
            "red";

    }

});