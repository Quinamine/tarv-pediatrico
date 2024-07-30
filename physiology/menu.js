"use strict"

const menu = {
    openArticle(article) {
        article.classList.add("--open");
    },
    closeArticle(article) {
        article.classList.remove("--open");
    }
};

let meatBallsMenu, meatBallsMenuExpanded, meatBallsMenuOptions, btnsArticleClosers, 
mainMenubtns;
function initVariables() {
    // Meat balls menu
    meatBallsMenu = document.querySelector(".meatballs-menu");
    meatBallsMenuExpanded = document.querySelector(".meatballs-menu-expanded");
    meatBallsMenuOptions = document.querySelectorAll(".meatballs-menu-expanded__option");
    btnsArticleClosers = document.querySelectorAll(".article__section__btn--close");

    // Main menu
    mainMenubtns = document.querySelectorAll(".header__main-menu__btn");
};

function listenEvents() {
    // Open & close meatBalls-menu by clicking the menu
    meatBallsMenu.addEventListener("click", () => {
        meatBallsMenuExpanded.classList.toggle("--open");
    });

    // close meatBalls-menu by clicking anywhere
    window.addEventListener("click", event => {
        if(!event.target.matches(".meatballs-menu, .meatballs-menu__dot")) {
            meatBallsMenuExpanded.classList.remove("--open");
        };
    });

    // Open meatBalls-menu articles
    meatBallsMenuOptions.forEach( option => {
        option.addEventListener("click", () => {
            const relatedArticle = document.querySelector(`.${option.dataset.article}`);
            menu.openArticle(relatedArticle);
            document.body.classList.add("--overflow-h");
            blurBackground();
        });
    });

    // Close meatBalls-menu articles
    btnsArticleClosers.forEach( btn => {
        btn.addEventListener("click", () => {
            menu.closeArticle(btn.parentElement);
            document.body.classList.remove("--overflow-h");
            lightBackground();
        });
    });

    // Open main-menu-tabs;
    mainMenubtns.forEach( btn => {
        btn.addEventListener("click", () => {
            const mainArticles = document.querySelectorAll(".article__section--main");
            const relatedArticle = document.querySelector(`.${btn.dataset.article}`);
            const doserTitle = document.querySelector(".doser__title");
            const doserOptgroups = document.querySelectorAll(".doser__select__optgroup");
            const relatedOptgroup = document.querySelectorAll(`.${btn.dataset.optgroup}`);
            const relatedBibliography = document.querySelector(".bibliography-source__table-number");

            for (let i = 0; i < mainArticles.length; i++) {
                mainArticles[i].classList.remove("--open");
                mainMenubtns[i].classList.remove("header__main-menu__btn--current");
            }

            for (const optgroup of doserOptgroups) {
                optgroup.classList.add("--display-none");
            }

            btn.classList.add("header__main-menu__btn--current");
            doserTitle.textContent = btn.title;
            document.title = btn.title;
            relatedBibliography.textContent = btn.dataset.bibliography;
            menu.openArticle(relatedArticle);
            for (const optgroup of relatedOptgroup) {
                optgroup.classList.remove("--display-none");
            }

            const currenTab = btn.title
            const labelForMedicineInput = document.querySelector(".doser__label--medicine");
            const selectSearchingInput = document.querySelector(".doser__select__searching-box");
            

            let options = document.querySelectorAll(".doser__select__option");
            for (const option of options) {
                option.classList.remove("--selected");
            }
            
            let defaultOption;
            if(currenTab.includes("Doseador")) {
                selectSearchingInput.classList.remove("--display-none");
                labelForMedicineInput.textContent = "ARV:";
                defaultOption = document.querySelector(".doser__select__option--placeholder");
            } else {
                selectSearchingInput.classList.add("--display-none");
                labelForMedicineInput.textContent = "Fármaco:";
                defaultOption = document.querySelectorAll(`.${btn.dataset.optgroup} li`)[0];
            }

            defaultOption.classList.add("--selected");

        });
    });

    // Partilhar
    let data = {
        title: "Tarv Pediátrico",
        text: "Serviço online gratuito com um Doseador de Antirretrovirais (de acordo com o peso inserido pelo usuário, determina automaticamente doses terapêuticas dos antirretrovirais para crianças e adolescentes em cuidados e tratamento), Doseador de Cotrimoxazol para TPC e Doseador de fármacos preventivos de tuberculose (Isoniazida, 3HP e Levofloxacina). O serviço é baseado no Políptico Pediátrico - Manejo de infecção por HIV na criança e adolescente, versão 2022, actualmente vigente no Serviço Nacional de Saúde (SNS) em Moçambique.",
        url: "https://quinamine.github.io/tarv-pediatrico/index.html"
    }

    let btnShare = document.querySelector(".meatballs-menu-expanded__option--share");
    btnShare.addEventListener("click", () => {
        try {
            navigator.share(data).then( () => {
                console.log("Partilha bem sucedida.");
            }).catch(error => {
                console.log(`Não foi possível partilhar o Tarv Pediáco devido ao erro: ${error}.`);
            })
        } catch (error) {
            console.log('O seu navegador n\xe3o tem suporte ao m\xe9todo "navigator.share()".');
        }
    });
};


window.addEventListener("load", () => {
    initVariables();
    listenEvents();
});
