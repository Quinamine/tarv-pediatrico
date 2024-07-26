"use strict"

const menu = {
    openArticle(article) {
        article.classList.add("--open");
        body.classList.add("--overflow-h");
        blurBackground();
    },
    closeArticle(article) {
        article.classList.remove("--open");
        body.classList.remove("--overflow-h");
        lightBackground();
    }
};

let meatBallsMenu, meatBallsMenuContent, 
articleOpeners, articleClosers;
function varInitialization() {
    meatBallsMenu = document.querySelector(".meatballs-menu");
    meatBallsMenuContent = document.querySelector(".meatballs-menu-content");

    articleOpeners = document.querySelectorAll("[data-article]");
    articleClosers = document.querySelectorAll(".article__section__btn--close");
};

function eventListeners() {
    // Open & close meatBalls menu
    meatBallsMenu.addEventListener("click", () => meatBallsMenuContent.classList.toggle("--open"));
    window.addEventListener("click", event => {
        if(!event.target.matches(".menu-3dot-target")) {
            meatBallsMenuContent.classList.remove("--open");
        };
    });

    // Open meatBalls menu articles
    articleOpeners.forEach( opener => {
        opener.addEventListener("click", () => {
            const relatedArticle = document.querySelector(`.${opener.dataset.article}`);
            menu.openArticle(relatedArticle);
        });
    });

    // Open meatBalls menu articles
    articleClosers.forEach( closer => {
        closer.addEventListener("click", () => {
            menu.closeArticle(closer.parentElement);
        });
    });
};

window.addEventListener("load", () => {
    varInitialization();
    eventListeners();
});
