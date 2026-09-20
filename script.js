/* =========================================================
   WEDDING WEBSITE JAVASCRIPT
========================================================= */


/* =========================================================
   1. DOOR OPENING
========================================================= */

const doorScreen = document.getElementById("doorScreen");

const openInvitation =
    document.getElementById("openInvitation");


openInvitation.addEventListener("click", function () {

    // Door opening animation start
    doorScreen.classList.add("opening");


    // Page scrolling allow
    document.body.classList.remove("locked");


    // Door screen remove after animation
    setTimeout(function () {

        doorScreen.classList.add("hidden");

    }, 1900);

});



/* =========================================================
   2. NAVIGATION MENU
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.getElementById("navLinks");


menuButton.addEventListener("click", function () {

    navLinks.classList.toggle("open");

});



/* Close mobile menu after clicking link */

const links =
    document.querySelectorAll(".nav-links a");


links.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("open");

    });

});



/* =========================================================
   3. NAVBAR BACKGROUND ON SCROLL
========================================================= */

const navbar =
    document.getElementById("navbar");


window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});



/* =========================================================
   4. WEDDING COUNTDOWN
========================================================= */




const weddingDate =
    new Date("November 30, 2026 19:00:00").getTime();



function updateCountdown() {

    const currentTime =
        new Date().getTime();


    const difference =
        weddingDate - currentTime;


    /* Agar wedding date aa gayi */

    if (difference <= 0) {

        document.getElementById("days").innerText = "00";

        document.getElementById("hours").innerText = "00";

        document.getElementById("minutes").innerText = "00";

        document.getElementById("seconds").innerText = "00";

        return;

    }


    /* Calculate days */

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    /* Calculate hours */

    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) % 24
        );


    /* Calculate minutes */

    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) % 60
        );


    /* Calculate seconds */

    const seconds =
        Math.floor(
            (difference /
                1000) % 60
        );


    /* Display */

    document.getElementById("days").innerText =
        String(days).padStart(2, "0");


    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");

}


/* Run immediately */

updateCountdown();


/* Update every second */

setInterval(updateCountdown, 1000);



/* =========================================================
   5. SCROLL REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(function (element) {

    observer.observe(element);

});



/* =========================================================
   6. RSVP FORM - GOOGLE SHEETS
========================================================= */

const rsvpForm =
    document.getElementById("rsvpForm");

const formMessage =
    document.getElementById("formMessage");


/* Google Apps Script Web App URL */

const scriptURL =
    "https://script.google.com/macros/s/AKfycbzYwhA6LulVwIGNo56mRytSgp323B7iqYJXcy6SmL0Vy7EYjvC-LW00jB9hBdEVd6Qn/exec";


rsvpForm.addEventListener("submit", async function (event) {

    /* Stop page refresh */

    event.preventDefault();


    /* Get form values */

    const name =
        document.getElementById("guestName").value.trim();

    const email =
        document.getElementById("guestEmail").value.trim();

    const attendance =
        document.getElementById("attendance").value;

    const message =
        document.getElementById("message").value.trim();


    /* Check required fields */

    if (!name || !email || !attendance) {

        formMessage.innerText =
            "Please fill in all required fields.";

        return;

    }


    /* Submit button */

    const submitButton =
        rsvpForm.querySelector("button[type='submit']");

    submitButton.disabled = true;

    submitButton.innerText =
        "Sending...";


    /* Data to Google Sheet */

    const data = {

        name: name,

        email: email,

        attendance: attendance,

        message: message

    };


    try {

        await fetch(scriptURL, {

            method: "POST",

            mode: "no-cors",

            headers: {

                "Content-Type":
                    "text/plain;charset=utf-8"

            },

            body: JSON.stringify(data)

        });


        /* Success message */

        formMessage.innerText =
            "✓ Thank you " +
            name +
            "! Your RSVP has been received.";


        /* Clear form */

        rsvpForm.reset();


    } catch (error) {

        console.error(error);

        formMessage.innerText =
            "Something went wrong. Please try again.";

    }


    /* Enable button again */

    submitButton.disabled = false;

    submitButton.innerText =
        "Send RSVP";

}); 