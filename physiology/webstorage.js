const referenciaBibliografia = {
    mostrarAlerta() {
        if(!sessionStorage.getItem(`tarv-reference`)) {
            const alerta = document.querySelector(".dialog-box-default--bibliography");
            setTimeout(() => alerta.classList.add("--open"), 3000);
        }
    },
    salvarCiencia() {
        sessionStorage.setItem(`tarv-reference`, `user:aware`);
    }
}
window.addEventListener("load", () => {
    referenciaBibliografia.mostrarAlerta();
    const btnEntendi = document.querySelector(".dialog-box-default__btn--entendi");
    btnEntendi.addEventListener("click", () => {
        referenciaBibliografia.salvarCiencia();
        const alerta = document.querySelector(".dialog-box-default--bibliography");
        alerta.classList.remove("--open")
    });
});