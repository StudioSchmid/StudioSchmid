const title = document.getElementById("title");
const subline = document.getElementById("subline");
const contact = document.getElementById("contact");

const footnote = document.getElementById("footnote");
const asterisk = document.getElementById("asterisk");


// --------------------
// Intro Sequence
// --------------------

window.onload = () => {

    setTimeout(() => {

        title.style.opacity = "1";

    }, 800);

    setTimeout(() => {

        subline.textContent = "Those who know me, know.";
        subline.style.opacity = "1";

    }, 2200);

    setTimeout(() => {

        subline.style.opacity = "0";

    }, 4700);

    setTimeout(() => {

        subline.textContent = "This is where you'll find me.";
        subline.style.opacity = "1";

    }, 5600);

};


// --------------------
// Reveal Contact
// --------------------

subline.addEventListener("click", () => {

    title.classList.add("compact");
    contact.style.opacity = "1";
});


// --------------------
// Footnote Toggle
// --------------------

let footnoteVisible = false;

asterisk.addEventListener("click", () => {

    footnote.style.opacity = "1";

    clearTimeout(window.footnoteTimer);

    window.footnoteTimer = setTimeout(() => {

        footnote.style.opacity = "0";

    }, 2500);

});

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