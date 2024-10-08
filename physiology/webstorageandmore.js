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
function actualizarAnoDeCopyright() {
    const tempo = new Date();
    let anoActual = tempo.getFullYear();
    if(anoActual < 2024) anoActual = 2024;
    const currentYearOutput = document.querySelector(".footer__current-year");
    currentYearOutput.textContent = anoActual;
}
function fecharTopoPropaganda() {
    const topoPropaganda = document.querySelector(".topo-propaganda");
    const body = document.querySelector("#body");
    topoPropaganda.classList.add("topo-propaganda--off");
    body.classList.remove("body-com-topo-propaganda")
}
window.addEventListener("load", () => {
    referenciaBibliografia.mostrarAlerta();
    const btnEntendi = document.querySelector(".dialog-box-default__btn--entendi");
    btnEntendi.addEventListener("click", () => {
        referenciaBibliografia.salvarCiencia();
        const alerta = document.querySelector(".dialog-box-default--bibliography");
        alerta.classList.remove("--open")
    });
    actualizarAnoDeCopyright();
    // Fechar Topo Propaganda 
    const btnXDetopoProgaganda = document.querySelector(".topo-propaganda__btn");
    btnXDetopoProgaganda.addEventListener("click", fecharTopoPropaganda);
});