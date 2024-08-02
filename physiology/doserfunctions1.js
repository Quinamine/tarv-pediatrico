"use strict"

window.addEventListener("load", () => {
    const doserSelect = document.querySelector(".doser__select")
    const selectOpeners = document.querySelectorAll(".doser__select__option, .select-opener");
    const selectCloser = document.querySelector(".doser__select__btn--close");
    const selectOptions = document.querySelectorAll(".doser__select__option");

    // Highlight Focused input weight
    const inputForWeight = document.querySelector(".doser__input--weight");
    inputForWeight.addEventListener("focusin", () => {
        inputForWeight.parentElement.classList.add("--focus");
    });
    inputForWeight.addEventListener("focusout", () => {
        inputForWeight.parentElement.classList.remove("--focus");
    });
    

    const inputTypeSelect = document.querySelector(".doser__section--medicines");
    // Open Select
    selectOpeners.forEach(opener => {
        opener.addEventListener("click", () => {
            doserSelect.classList.toggle("--open");
            inputTypeSelect.classList.add("--focus");
        });
    });

    // Close Select
    selectCloser.addEventListener("click", () => {
        doserSelect.classList.remove("--open");
        document.querySelector(".doser__select__input--search").value = "";
        for (const option of document.querySelectorAll(".doser__optgroup__title, .doser__select__option")) {
            option.classList.remove("--display-none");
        }
    });

    window.addEventListener("click", event => {
        if(!event.target.matches(".doser__select *, .select-opener")){
            doserSelect.classList.remove("--open");
            inputTypeSelect.classList.remove("--focus");
            document.querySelector(".doser__select__input--search").value = "";
            for (const option of document.querySelectorAll(".doser__optgroup__title, .doser__select__option")) {
                option.classList.remove("--display-none");
            }
        }
    });

    // Select an option
    selectOptions.forEach( option => {
        option.addEventListener("click", () => {
            for (const opt of selectOptions) {
                opt.classList.remove("--selected");
            }
    
            option.classList.add("--selected");
        })
    });


    const inputSearch = document.querySelector(".doser__select__input--search");
    
    const medicines = document.querySelectorAll(".doser__select__optgroup--arvs .doser__select__option");
    const optGroupTitles = document.querySelectorAll(".doser__select__optgroup--arvs .doser__optgroup__title");

    inputSearch.addEventListener("input", () => {
        let query = inputSearch.value;
        for (const med of medicines) {
            if(formatString(med.textContent).includes(formatString(query))) {
                med.classList.remove("--display-none");
            } else {
                med.classList.add("--display-none");
            }
        }

        for (const title of optGroupTitles) {
            if(formatString(title.textContent).includes(formatString(query))) {
                title.classList.remove("--display-none");
                let options = title.parentElement.querySelectorAll(".doser__select__option");
                for (const option of options) {
                    option.classList.remove("--display-none");
                }
            } else {
                title.classList.add("--display-none");
            }
        }
    });
});