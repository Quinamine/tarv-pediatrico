"use strict";
// Menu

const doseador = {
    abrirSelect() {
        select.classList.add("on");
        select.querySelector("#src").focus();
    },

    fecharSelect() {
        select.classList.remove("on");

        // Para resetar o input.value e os resultados da pesquisa anterior
        const selectChildren = select.querySelectorAll("li.placeholder, div.optgroup.arvs h3, div.optgroup.arvs li");

        select.querySelector("#src").value = "";
        for (const child of selectChildren) {
            child.classList.remove("hide");
        }
    },

    selecionarFarmaco(farmaco) { 
        for (const opt of selectOptions) {
            opt.classList.remove("selected");
        }
        farmaco.classList.add("selected");
    },

    pesquisarFarmaco(query) {
        let queryToLowerCase = query.toLowerCase();
        let farmacos = select.querySelectorAll("div.arvs li");
        let titulos_dos_farmacos = select.querySelectorAll("h3");
        
        // PESQUISA DIRECTAMENTE PELO NOME DO FÁRMACO
        for (const farmaco of farmacos) {
            let farmacoInnerText = farmaco.textContent.toLowerCase();
 
            if(!farmacoInnerText.includes(queryToLowerCase)) {
                farmaco.classList.add("hide");
                
            } else {
                farmaco.classList.remove("hide");
            }
        }

        // PESQUISA PELO 'OPTGROUP-LABEL' (TITULOS DOS FÁRMACOS) 
        for (const titulo of titulos_dos_farmacos) {
            let tituloInnerText = titulo.textContent.toLowerCase();

            if(tituloInnerText.includes(queryToLowerCase)) {
                let titleParent = titulo.parentElement.children;

                for (const child of titleParent) {
                    child.classList.remove("hide");
                } 
            } else {
                titulo.classList.add("hide")
            }
        }
    }
}

const menu = {
    mostrarConteudoRelacionado(aba) {
        const conteudos = document.querySelectorAll("article section");
        const conteudoRelacionado = aba.dataset.artigorelacionado;
        let titulo_do_doseador = document.querySelector(".doseador h1");

        for (let i = 0; i < abas_do_menu.length; i++) {
            abas_do_menu[i].classList.remove("current");
            conteudos[i].classList.remove("on");

            if(conteudos[i].matches(`.${conteudoRelacionado}`)) {
                conteudos[i].classList.add("on");
            }
        }
        aba.classList.add("current");
        titulo_do_doseador.textContent = aba.dataset.titulodaaba;
    },

    mostrarFarmacosRelacionados(aba) {
        const listasDeFarmacos = document.querySelectorAll("div.optgroup");
        for (const lista of listasDeFarmacos) {
            lista.classList.add("hide");
        }

        const farmacosRelacionados =  document.querySelectorAll(`div.optgroup.${aba.dataset.for}`)

        // Looping por optgroup.arvs ser um nodelist
        for (const f of farmacosRelacionados) {
            f.classList.remove("hide");
        }
        

        
        const elementosRelacionados = document.querySelectorAll("label.arv, li.placeholder, div.caixa-de-pesquisa");
        
        if(aba.dataset.for !== "arvs") {
            elementosRelacionados[0].innerHTML = "Fármaco:";
            elementosRelacionados[1].classList.add("hide");
            elementosRelacionados[2].classList.add("hide");
        } else {
            elementosRelacionados[0].innerHTML = "ARV:&nbsp;";
            elementosRelacionados[1].classList.remove("hide");
            elementosRelacionados[2].classList.remove("hide");
        }

        let optionDefault = document.querySelector(`[data-nome=${aba.dataset.optiondefault}]`);
        doseador.selecionarFarmaco(optionDefault);

    }
}

let abas_do_menu,
select, selectSrc, selectOptions;
window.addEventListener("load", () => {
    abas_do_menu = document.querySelectorAll(".menu-principal a");
    
    // INVOCAÇÃO 
    abas_do_menu.forEach ( aba => {
        aba.addEventListener("click", () => {
            menu.mostrarConteudoRelacionado(aba);
            menu.mostrarFarmacosRelacionados(aba);

            // Para resetar o input.value e os resultados da pesquisa da aba do Doseador
            menu.fecharSelect();
        })
    })

    // DOSEADOR 
    select = document.querySelector("ul.select");
    selectOptions = select.querySelectorAll("li");
    selectSrc = select.querySelector("input#src");

    selectOptions.forEach ( option => {
        option.addEventListener("click", () => {
            if(select.matches(".on")) {
                doseador.selecionarFarmaco(option);
                doseador.fecharSelect();
            } else {
                doseador.abrirSelect();
            }       
        })
    })

    selectSrc.addEventListener("input", () => {
        doseador.pesquisarFarmaco(selectSrc.value);
    })
});


// EVENTO DE FECHAMENTO DO SELECT 
window.addEventListener("click", event => {
   
    const selectChildren = document.querySelectorAll("ul.select *");
    let numChildrenClicked = 0;
    for (const child of selectChildren) {
        if(child === event.target) {
            numChildrenClicked++;
        }
    }

    if(numChildrenClicked <= 0) {
        doseador.fecharSelect();
    }
})










