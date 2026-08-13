/* ==========================================================
   STUDIO SCHMID
   VERSION 0.2.4

   SCRIPT.JS

   MOTION & TYPE
   ========================================================== */


/* ==========================================================
   01 — ELEMENTS
   ========================================================== */

const body = document.body;

const title = document.getElementById("title");
const subline = document.getElementById("subline");
const asterisk = document.getElementById("asterisk");
const contact = document.getElementById("contact");


/* ==========================================================
   02 — TIMING
   ========================================================== */

const timing = {

    introDelay: 700,

    firstSublineDelay: 1200,

    firstSublineDuration: 2400,

    sublineFadeDuration: 600,

    contactTransitionDelay: 80,

    contactRevealDelay: 1250,

    contactDuration: 8000,

    resetPause: 1800,

    workInProgressDuration: 4500

};


/* ==========================================================
   03 — STATE
   ========================================================== */

let contactTimer = null;

let workInProgressTimer = null;

let introTimers = [];

let isTransitioning = false;


/* ==========================================================
   04 — TIMER MANAGEMENT
   ========================================================== */

function clearIntroTimers() {

    introTimers.forEach(timer => {

        clearTimeout(timer);

    });

    introTimers = [];

}


/* ==========================================================
   05 — SUBLINE HELPERS
   ========================================================== */


/*
   Set the subline text.

   Only the invitation becomes interactive.
*/

function setSubline(text) {

    subline.textContent = text;


    if (
        text ===
        "This is where you'll find me."
    ) {

        subline.classList.add("active");

    } else {

        subline.classList.remove("active");

    }

}


/* ==========================================================
   06 — OPENING SEQUENCE
   ========================================================== */

function startIntro() {

    clearIntroTimers();


    /*
       Reset state.
    */

    body.classList.remove("open");

    body.classList.remove("transitioning");

    title.classList.remove("contact-title");

    contact.style.opacity = "0";

    subline.style.opacity = "0";

    subline.classList.remove("active");


    /*
       LOGO
    */

    const logoTimer = setTimeout(() => {

        title.style.opacity = "1";

    }, timing.introDelay);

    introTimers.push(logoTimer);


    /*
       FIRST SUBLINE
    */

    const firstSublineTimer = setTimeout(() => {

        setSubline(
            "Those who know me, know."
        );

        subline.style.opacity = "1";

    },
    timing.introDelay
    + timing.firstSublineDelay);

    introTimers.push(firstSublineTimer);


    /*
       SECOND SUBLINE
    */

    const secondSublineTimer = setTimeout(() => {

        subline.style.opacity = "0";


        const replacementTimer = setTimeout(() => {

            setSubline(
                "This is where you'll find me."
            );

            subline.style.opacity = "1";

        }, timing.sublineFadeDuration);

        introTimers.push(replacementTimer);

    },
    timing.introDelay
    + timing.firstSublineDelay
    + timing.firstSublineDuration);

    introTimers.push(secondSublineTimer);

}


/* ==========================================================
   07 — CONTACT TRANSITION
   ========================================================== */

function openContact() {

    if (isTransitioning) {
        return;
    }

    if (body.classList.contains("open")) {
        return;
    }


    isTransitioning = true;


    /*
       Stop the normal intro sequence.
    */

    clearIntroTimers();


    /*
       Remove interactivity immediately.
    */

    subline.classList.remove("active");


    /*
       Mark transition state.
    */

    body.classList.add("transitioning");


    /*
       STEP 1

       Fade the invitation out completely.

       NOTHING ELSE MOVES YET.
    */

    subline.style.opacity = "0";


    /*
       STEP 2

       After the fade, begin the logo movement.
    */

    setTimeout(() => {

        body.classList.add("open");

    },
    timing.sublineFadeDuration
    + timing.contactTransitionDelay);


    /*
       STEP 3

       Contact appears after the logo has begun moving.
    */

    setTimeout(() => {

        contact.style.opacity = "1";

    }, timing.contactRevealDelay);


    /*
       STEP 4

       Begin automatic return.
    */

    clearTimeout(contactTimer);

    contactTimer = setTimeout(() => {

        resetExperience();

    }, timing.contactDuration);

}


/* ==========================================================
   08 — SUBLINE CLICK
   ========================================================== */

subline.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        event.stopPropagation();


        /*
           Only the active invitation can trigger contact.
        */

        if (
            subline.classList.contains("active")
        ) {

            openContact();

        }

    }
);


/* ==========================================================
   09 — ASTERISK / WORK IN PROGRESS
   ========================================================== */

function showWorkInProgress() {

    clearTimeout(workInProgressTimer);


    body.classList.add("show-dev");


    workInProgressTimer = setTimeout(() => {

        body.classList.remove("show-dev");

    }, timing.workInProgressDuration);

}


asterisk.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        event.stopPropagation();

        showWorkInProgress();

    }
);


/* ==========================================================
   10 — COLOUR STYLES
   ========================================================== */

const colourStyles = [

    "colour-style-02",
    "colour-style-03",
    "colour-style-04",
    "colour-style-05"

];


function setColourStyle(number) {

    colourStyles.forEach(style => {

        body.classList.remove(style);

    });


    /*
       Style 1 is the default :root style.
    */

    if (number === 1) {
        return;
    }


    const selectedStyle =
        `colour-style-0${number}`;

    body.classList.add(selectedStyle);

}


/* ==========================================================
   11 — FONT STYLES
   ========================================================== */

const fontStyles = [

    "font-style-01",
    "font-style-02",
    "font-style-03",
    "font-style-04"

];


function setFontStyle(number) {

    document.body.classList.remove(
        "font-style-01",
        "font-style-02",
        "font-style-03",
        "font-style-04"
    );

    document.body.classList.add(
        `font-style-0${number}`
    );
}


/* ==========================================================
   12 — KEYBOARD CONTROLS
   ========================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        const tag =
            event.target.tagName;


        /*
           Don't interfere with form fields.
        */

        if (
            tag === "INPUT" ||
            tag === "TEXTAREA"
        ) {

            return;
        }


        /*
           COLOUR 1–5
        */

        if (
            event.key >= "1" &&
            event.key <= "5"
        ) {

            setColourStyle(
                Number(event.key)
            );

            return;

        }


        /*
           FONT Q–R
        */

        switch (
            event.key.toLowerCase()
        ) {

            case "q":

                setFontStyle(1);

                break;


            case "w":

                setFontStyle(2);

                break;


            case "e":

                setFontStyle(3);

                break;


            case "r":

                setFontStyle(4);

                break;

        }

    }
);


/* ==========================================================
   13 — RESET EXPERIENCE
   ========================================================== */

function resetExperience() {

    clearTimeout(contactTimer);

    clearIntroTimers();


    /*
       Fade contact away.
    */

    contact.style.opacity = "0";


    /*
       Return logo to its original state.
    */

    body.classList.remove("open");

    body.classList.remove("transitioning");

    title.classList.remove("contact-title");


    /*
       Wait for the logo's return transition,
       then allow the page to breathe.
    */

    const restartTimer = setTimeout(() => {

        setSubline(
            "Those who know me, know."
        );

        subline.style.opacity = "1";


        /*
           Keep the first sentence for the same
           duration as the opening.
        */

        const nextLineTimer = setTimeout(() => {

            subline.style.opacity = "0";


            const finalLineTimer = setTimeout(() => {

                setSubline(
                    "This is where you'll find me."
                );

                subline.style.opacity = "1";

                isTransitioning = false;

            }, timing.sublineFadeDuration);


            introTimers.push(finalLineTimer);

        }, timing.firstSublineDuration);


        introTimers.push(nextLineTimer);

    }, timing.resetPause);


    introTimers.push(restartTimer);

}


/* ==========================================================
   14 — INITIALISE
   ========================================================== */

startIntro();