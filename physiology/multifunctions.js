"use strict"

function blurBackground() {
    blurringDiv.classList.add("on");
};

function lightBackground() {
    blurringDiv.classList.remove("on");
};

function filterStage(selectedStageClassName) {
    const stages = document.querySelectorAll(".estadio");
    for (const stage of stages) {
        stage.classList.add("--display-none");
    }

    if(selectedStageClassName==="todos") {
        for (const stage of stages) {
            stage.classList.remove("--display-none");
        }
    } else {
        let selectedStage = document.querySelector(`.${selectedStageClassName}`);
        selectedStage.classList.remove("--display-none");
    }
}

let blurringDiv;
window.addEventListener("load", () => {
    blurringDiv = document.querySelector(".blurringDiv");

    const stageFilter = document.querySelector(".article__staging__select");
    stageFilter.addEventListener("change", () => {
        let stageClassName = stageFilter.options[stageFilter.selectedIndex].value;
        filterStage(stageClassName);
    });
});