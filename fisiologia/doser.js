"use strict"
const doserGeneralFunctions = {
    highlightFocusedInput(focusedInput) {
        focusedInput.classList.add("--focus");
    },
    removehighlightFromFocusedInput(focusedInput) {
        focusedInput.classList.remove("--focus");
    },
    openOrCloseSelect() {
        const doserSelect = document.querySelector(".doser__select");
        const selectOfMedicines = document.querySelector(".doser__section--medicines");
        const body = document.querySelector("#body");
        doserSelect.classList.toggle("--open");
        doserGeneralFunctions.highlightFocusedInput(selectOfMedicines);
        body.classList.toggle("--overflow-hidden-on-mobile");
        doserGeneralFunctions.showOptionsHiddenByFilter();
    },
    closeSelect() {
        const doserSelect = document.querySelector(".doser__select");
        const selectOfMedicines = document.querySelector(".doser__section--medicines");
        const body = document.querySelector("#body");
        doserSelect.classList.remove("--open");
        doserGeneralFunctions.removehighlightFromFocusedInput(selectOfMedicines);
        body.classList.remove("--overflow-hidden-on-mobile");
        doserGeneralFunctions.showOptionsHiddenByFilter();
    },
    selectAnOption(optionToSelect) {
        const options = document.querySelectorAll(".doser__select__option");
        for (const option of options) {
            option.classList.remove("--selected");
        }
        optionToSelect.classList.add("--selected");
    },
    filterAnOption(query) {
        function trimAndLowerStr(str) {
            return str.replaceAll(/\W/g, "").toLowerCase();
        }
        function showOrHideElement(action, element) {
            action === "show" ? element.classList.remove("--hidden")
            : element.classList.add("--hidden")
        }
        // Filter or Search options
        query = trimAndLowerStr(query);
        const options = document.querySelectorAll(".doser__select__option");
        for (const option of options) {
            trimAndLowerStr(option.textContent).includes(query) ? showOrHideElement("show", option)
            : showOrHideElement("hide", option);
        }
        // Filter Optgroups
        const optgroups = document.querySelectorAll(".doser__optgroup__title");
        for (const optgroup of optgroups) {
            if(trimAndLowerStr(optgroup.textContent).includes(query)) {
                showOrHideElement("show", optgroup);
                let optionsRelated = optgroup.parentElement.querySelectorAll(".doser__select__option");
                for (const option of optionsRelated) {showOrHideElement("show", option)}
            } else {
                showOrHideElement("hide", optgroup);
            }
        }
    },
    showOptionsHiddenByFilter() {
        const options = document.querySelectorAll(".doser__select *");
        const inputSearch = document.querySelector(".doser__select__input--search")
        for(const option of options) {
            option.classList.remove("--hidden");
            inputSearch.value = "";
        }
    },
    showMinWeightAlert() {
        const alertaDePesoMinimo = document.querySelector(".doser__min-weight-alert");
        alertaDePesoMinimo.textContent = "Para crianças < 3 kg de peso, consultar a Linha Verde (843434/823434).";
        alertaDePesoMinimo.classList.add("--open");
    },
    clearMinWeightAlert() {
        const alertaDePesoMinimo = document.querySelector(".doser__min-weight-alert");
        alertaDePesoMinimo.textContent = "";
        alertaDePesoMinimo.classList.remove("--open");
    },
    clearDoseAndnote() {
        document.querySelector(".doser__section__dose").innerHTML = "";
        let noteOutput = document.querySelector(".doser__section__note");
        noteOutput.innerHTML = "";  
        // remove padding when the note does not have content to avoid bg-color appearing
        noteOutput.classList.add("doser__section__note--no-padding");       
    }
}
class Doser {
    constructor(weight, medicine) {
        this.weight = weight;
        this.medicine = medicine;
    }
    getUnidadeDaDose() {
        return this.medicine.includes("susp") ? "ml" 
        : this.medicine.includes("saquetas") ? "saquetas" 
        : "cp(s)";
    }
    getNotasEprecaucoes() {
        let note;
        if(this.medicine === "pALD" && this.weight < 6) {
            note = 'Para peso &lt; 6 kg, recomenda-se <mark>ABC/3TC 120/60 mg + pDTG 10 mg</mark>.';
        } else if(this.medicine === "pALD" && this.weight < 25) {
            let dose = this.weight < 10 ? 3 
            : this.weight < 14 ? 4
            : this.weight < 20 ? 5
            : this.weight < 25 ? 6
            : "-";
            let qtdAgua, numColheres;
            this.weight < 10 ? (qtdAgua = 15, numColheres = 3) : (qtdAgua = 20, numColheres = 4);
            note = `<strong>Dissolver os ${dose} cp(s) em ${qtdAgua} ml de água (${numColheres} colheres de chá - veja na imagem abaixo)</strong>. Diluir o pALD preferencialmente com água, ou leite (materno ou fórmula artificial) caso os cuidadores não tenham acesso à água potável ou a criança não aceite o medicamento diluído com água. Para diluir com leite, usar as mesmas medidas de água. <br> <img src="imagens/colheres.png">`;
        } else if(this.medicine === "pALD" && this.weight < 30) {
            note = `A partir de 25 kg, está indicado <mark>ABC/3TC 600/300 mg + DTG 50 mg Comp.</mark>`;
        } else if(this.medicine === "pALD" && this.weight >= 30) {
            note = `Transitar para o regime <mark>TDF/3TC/DTG 300/300/50 mg Comp.</mark>`;
        } else if(this.medicine === "abc/3tc-120/60mg" && this.weight >= 6 && this.weight < 25) {
            note = '*Esta dosagem (ABC/3TC + pDTG ou DTG 50 mg) está prevista para uso apenas na ausência de cps de pALD.';
        } else if(this.medicine === "abc/3tc-120/60mg" && this.weight >= 25) {
            note = 'A partir de 25 kg, está indicado <mark>ABC/3TC 600/300 mg Comp.</mark>';
        } else if(this.medicine === "abc/3tc-600/300mg" && this.weight < 25) {
            note = 'O <mark>ABC/3TC 600/300 mg</mark> está indicado a partir de 25 kg.'
        } else if(this.medicine === "dtg-10mg" && this.weight >= 6 && this.weight < 25 || 
            this.medicine === "dtg-50mg" && this.weight >= 20 && this.weight < 25) {
            let dtg = this.medicine === "dtg-10mg" ? "pDTG" : "DTG 50 mg";
            note = `*Esta dosagem de <mark>${dtg} + ABC/3TC 120/60 mg</mark> está prevista para uso apenas na ausência de cps de pALD.`;
        } else if(this.medicine === "dtg-10mg" && this.weight >= 25) {
            note = 'Para peso &ge; 25 kg, está indicado <mark>DTG 50 mg Comp.</mark>'
        } else if(this.medicine === "dtg-50mg" && this.weight < 20) {
            note = 'Para peso &lt; 20 kg, está indicado <mark>pDTG 10 mg Comp.</mark>'
        } else if(this.medicine === "dtg-10mg" && this.weight < 6 || this.medicine === "dtg-50mg" && this.weight >= 20) {
            note = '<b>(1)</b> Não é recomendado tomar o DTG ao mesmo tempo que as vitaminas, sal ferroso, fenitoína ou antiácidos, pois reduzem  a concentração plasmática do DTG. Nesses casos, recomenda-se tomar o DTG no mínimo 2 horas antes ou 6 horas depois da toma desses medicamentos. <b>(2)</b> Pacientes que estiverem a usar a Rifampicina (RIF) devem ajustar a dose de DTG (DTG 12/12 horas) durante o tempo que recebem RIF e por mais 2 semanas. Depois passam a tomar o DTG apenas 1 vez/dia.'
        } else if(this.medicine === "tdf/3tc/dtg" && this.weight < 30) {
            note = 'O <mark>TDF/3TC/DTG 300/300/50 mg Comp.</mark> está indicado a partir de 30 kg.'
        } else if(this.medicine === "lpv/r-100/25mg" && this.weight < 10) {
            note = 'O <mark>LPV/r 100/25 mg Comp.</mark> está indicado a partir de 10 kg.'
        } else if(this.medicine === "lpv/r-200/50mg" && this.weight < 14) {
           note = 'O <mark>LPV/r 200/50 mg Comp.</mark> está indicado a partir de 14 kg.'
        } else if(this.medicine === "lpv/r-200/50mg" && this.weight < 14) {
            note = 'Para peso &lt; 14 kg, recomenda-se <mark>LPV/r 100/25 mg Comp.</mark>'
        } else if(this.medicine === "lpv/r-100/25mg" && this.weight >= 10 || this.medicine === "lpv/r-200/50mg" && this.weight >= 14) {
            note = 'LPV/r deve-se engolir inteiro. Esse comprimido não se parte, não se esmaga e não se dissolve em líquidos.'
        } else if(this.medicine === "azt-susp" && this.weight >= 14) {
            note = 'O <mark>AZT 10 mg/ml Xarope</mark> está indicado para crianças com peso &lt; 14 kg.'
        } else if(this.medicine === "duovir-ped" && this.weight >= 25) {
            note = 'Para peso &ge; 25 kg, está indicado <mark>AZT/3TC 300/150 mg Comp.</mark>'
        } else if(this.medicine === "duovir-adult" && this.weight < 14) {
            note = 'Para peso &lt; 14 kg, está indicado <mark>AZT/3TC 60/30 mg Comp.</mark>'
        } else if(this.medicine === "tdf/3tc" && this.weight < 30) {
            note = 'O <mark>TDF/3TC 300/300 mg Comp.</mark> está indicado a partir de 30 kg.'
        } else if(this.medicine === "atv/r" && this.weight < 25) {
            note = 'O <mark>ATV/r 300/100 mg Comp.</mark> está indicado a partir de 25 kg.'
        } else if(this.medicine === "rtv-100-superboosting" && this.weight < 10) {
            note = 'O <mark>RTV 100 mg Comp. <sup>(para&nbsp;superboosting)</sup></mark> está indicado a partir de 10 kg.'
        } else if(this.medicine.includes("drv") && this.weight < 14) {
            note = 'O <mark>Darunavir</mark> está indicado a partir de 14 kg.'
        } else if(this.medicine === "drv-75" && this.weight >= 25 && this.weight < 30) {
            note = 'Para peso &ge; 25 kg, está indicado <mark>DRV 150 mg Comp.</mark> ou <mark>DRV 600 mg Comp.</mark>'
        } else if(this.medicine === "drv-75" && this.weight >= 30) {
            note = 'Para peso &ge; 30 kg, está indicado <mark>DRV 600 mg Comp.</mark>'
        } else if(this.medicine === "drv-600" && this.weight >= 14 && this.weight < 25) {
            note = '*Esta dosagem é prevista para uso <strong>APENAS</strong> na ausência de comprimidos de DRV de 75 ou 150 mg.'
        } else if(this.medicine === "rtv-100-3alinha" && this.weight < 14) {
            note = 'O <mark>RTV 100 mg Comp. <sup>(na&nbsp;3ª&nbsp;linha&nbsp;com&nbsp;DRV)</mark> está indicado a partir de 10 kg.'
        } else if(this.medicine === "ctz-susp" && this.weight >= 25) {
            note = 'Para peso &ge; 25 kg, recomenda-se <mark>Cotrimoxazol 480 mg Comp.</mark>'
        } else if(this.medicine === "inh-100" && this.weight >= 25) {
            note = 'Para peso &ge; 25 kg, recomenda-se <mark>Isoniazida 300 mg Comp.</mark>'
        } else if(this.medicine === "inh-300" && this.weight < 25) {
            note = 'Para peso &lt; 25 kg, recomenda-se <mark>Isoniazida 100 mg Comp.</mark>'
        } else if(this.medicine.includes("3hp") && this.weight < 10) {
            note = '<strong>Oferecer profilaxia com Isoniazida (TPT - INH).</strong>'
        } else if(this.medicine=== "3hp-100/150" && this.weight >= 30) {
            note = 'Para peso &ge; 30 kg, está indicado <mark>Isoniazida/Rifapentina 300/300 mg Comp.<sup>(3HP em DFC)</sup></mark> ou, na ausência desse, <mark>Isoniazida 300 mg e Rifapentina 150 mg comprimidos não combinados</mark>.'
        } else if(this.medicine=== "3hp-300/150" && this.weight >= 30) {
            note = 'Prefira <mark>Isoniazida/Rifapentina 300/300 mg Comp.<sup>(3HP em DFC)</sup></mark> (menor quantidade de comprimidos).'
        } else if(this.medicine=== "3hp-300/300-dfc" && this.weight < 30 || this.medicine=== "3hp-300/150" && this.weight < 30) {
            note = 'Para peso &lt; 30 kg, recomenda-se <mark>Isoniazida 100 mg e Rifapentina 150 mg comprimidos dispersíveis não combinados</mark>.'
        }  else if(this.medicine === "lfx-100" && this.weight >= 16 && this.weight < 26) {
            note = '*Crianças com peso &ge; 16 kg que consigam engolir comprimidos inteiros, passar para comprimidos de 250 mg. <br/> <strong>Se o caso fonte tiver resistência comprovada a Fluoroquinolonas, não deve ser oferecido TPT aos contactos.</strong>'
        } else if(this.medicine === "lfx-100" && this.weight >= 26) {
            note = 'Para peso &ge; 26 kg, recomenda-se <mark>Levofloxacina 250 mg Comp.</mark>'
        } else if(this.medicine === "lfx-250" && this.weight < 4) {
            note = 'Para peso &lt; 4 kg, está indicado <mark>Levofloxacina 100 mg Comp.</mark>'
        } else if(this.medicine === "lfx-250" && this.weight >= 4 || this.medicine === "lfx-100" && this.weight < 16) {
            note = 'Se o caso fonte tiver resistência comprovada a Fluoroquinolonas, não deve ser oferecido TPT aos contactos.'
        } else if(this.medicine === "vitb6-25" && this.weight < 25 || this.medicine === "vitb6-50" && this.weight >+ 25) {
            note = `A Piridoxina deve ser dada a todos pacientes em TPT ou tratamento da TB com regimes contendo Isoniazida. Em caso de neuropatia periférica, a dosagem deve ser aumentada para <mark>2&nbsp;mg/kg/dia</mark>.`;
        } else if(this.medicine === "vitb6-25" && this.weight >= 25 || this.medicine === "vitb6-50" && this.weight < 25) {
            let dosagemVitB6 = (this.medicine === "vitb6-25") ? 50 : 25;
            note = `*No caso de não haver comprimido de ${dosagemVitB6} mg. A Piridoxina deve ser dada a todos pacientes em TPT ou tratamento da TB com regimes contendo Isoniazida. Em caso de neuropatia periférica, a dosagem deve ser aumentada para <mark>2&nbsp;mg/kg/dia</mark>.`;
        } else {
            note = "";
        }
        return note;
    }
    determinarDose() {
        let doseManha, doseNoite = "-";
        let weight = this.weight;
        if(this.medicine === "pALD") {
            let dose, qtdLiquido;
            if(weight < 6 || weight >= 25) return '<p class="doser__section__note">Ler <b>Notas e Precauções</b> 👇.</p>';
            weight <  10 ? (dose = 3, qtdLiquido = 15)
            : weight < 14 ? (dose = 4, qtdLiquido = 20)
            : weight < 20 ? (dose = 5, qtdLiquido = 20)
            : (dose = 6, qtdLiquido = 20);
            return this.printDoseDePALD(dose, qtdLiquido);
        } 
        else if(this.medicine === "abc/3tc-120/60mg") {
            doseManha = weight < 6 ? 1
            : weight < 10 ? "1.5*"
            : weight < 14 ? "2*"
            : weight < 20 ? "2.5*"
            : weight < 25 ? "3*"
            : "-";
        } else if(this.medicine === "abc/3tc-600/300mg" || this.medicine === "atv/r" || this.medicine === "inh-300") {
            doseManha = weight >= 25 ? 1 : "-";
        } else if(this.medicine === "dtg-10mg") {
            doseManha = weight < 6 ? 0.5
            : weight < 10 ? "1.5*"
            : weight < 14 ? "2*"
            : weight < 20 ? "2.5*"
            : weight < 25 ? "3*"
            : "-";
        } else if(this.medicine === "dtg-50mg") {
            doseManha = (weight >= 20 && weight < 25) ? "1*" 
            : weight >= 25 ? 1
            : "-";
        } else if(this.medicine.includes(`tdf`)) {
            doseManha = weight >= 30 ? 1 : "-";
        } else if(this.medicine === "lpv/r-100/25mg") {
            weight < 10 ? (doseManha = doseNoite = "-")
            : weight < 14 ? (doseManha = 2, doseNoite = 1)
            : weight < 25 ? (doseManha = doseNoite = 2)
            : (doseManha = doseNoite = 3);
        } else if(this.medicine === "lpv/r-200/50mg") {
            weight < 14 ? (doseManha = doseNoite = "-")
            : weight < 25 ? (doseManha = doseNoite = 1)
            : weight < 30 ? (doseManha = 2, doseNoite = 1)
            : (doseManha = doseNoite = 2);
        } else if(this.medicine === "azt-susp") {
            doseManha = weight < 6 ? 6
            : weight < 10 ? 9
            : weight < 14 ? 12
            : "-";
            doseNoite = doseManha;
        } else if(this.medicine === "duovir-ped") {
            doseManha = weight < 6 ? 1
            : weight < 10 ? 1.5
            : weight < 14 ? 2
            : weight < 20 ? 2.5
            : weight < 25 ? 3
            : "-";
            doseNoite = doseManha;
        } else if(this.medicine === "duovir-adult") {
            weight < 14 ? (doseManha = doseNoite = "-")
            : weight < 25 ? (doseManha = 1, doseNoite = 0.5)
            : (doseManha = doseNoite = 1);
        } else if(this.medicine === "rtv-100-superboosting") {
            weight < 10 ? (doseManha = doseNoite = "-")
            : weight < 14 ? (doseManha = doseNoite = 1)
            : weight < 25 ? (doseManha = 1, doseNoite = 2)
            : (doseManha = doseNoite = 2);
        } else if(this.medicine === "drv-75") {
            doseManha = weight >= 14 && weight < 25 ? 5
            : "-";
            doseNoite = doseManha;
        } else if(this.medicine === "drv-150") {
            doseManha = weight < 14 || weight >= 30 ? "-"
            : weight < 25 ? 2.5
            : 3;
            doseNoite = doseManha;
        } else if(this.medicine === "drv-600") {
            doseManha = weight < 14 ? "-"
            : weight < 25 ? "0.5*"
            : 1;
            doseNoite = doseManha;
        } else if(this.medicine === "rtv-100-3alinha") {
            doseManha = weight < 14 ? "-"
            : weight < 25 ? 0.5
            : 1;
            doseNoite = doseManha;
        } else if(this.medicine === "ctz-susp") {
            if(weight < 3) {
                return '<p class="doser__section__note">Ler <b>Notas e Precauções</b> 👇.</p>';
            }
            doseManha = weight < 6 ? 2.5
            : weight < 14 ? 5
            : weight < 25 ? 10
            : "-";
        } else if(this.medicine === "ctz-cp") {
            if(weight < 3) {
                return '<p class="doser__section__note">Ler <b>Notas e Precauções</b> 👇.</p>';
            }
            doseManha = weight < 6 ? 0.25
            : weight < 14 ? 0.5
            : weight < 25 ? 1
            : 2
        } else if(this.medicine === "inh-100") {
            if(weight < 4 || weight >= 25) {
                return '<p class="doser__section__note">Ler <b>Notas e Precauções</b> 👇.</p>';
            }
            doseManha = weight < 8 ? 0.5
            : weight < 12 ? 1
            : weight < 16 ? 1.5
            : 2;
        } else if(this.medicine === "3hp-100/150") {
            let doseDeINH, doseDeRifapentina;
            if(weight < 10 || weight >= 30) {
                return '<p class="doser__section__note">Ler <b>Notas e Precauções</b> 👇.</p>';
            } 
            weight < 16 ? (doseDeINH = 3, doseDeRifapentina = 2)
            : weight < 24 ? (doseDeINH = 5, doseDeRifapentina= 3)
            : (doseDeINH = 6, doseDeRifapentina= 4);

            return this.printDoseDe3hpNaoDFC("Isoniazida <br/> cp 100mg", doseDeINH, "Rifapentina <br/> cp 150mg", doseDeRifapentina);
        } else if(this.medicine === "3hp-300/150") {
            let doseDeINH, doseDeRifapentina;
            if(weight < 30) {
                return '<p class="doser__section__note">Ler <b>Notas e Precauções</b> 👇.</p>';
            } else {
                doseDeINH = 3;
                doseDeRifapentina= 6;
            }
            return this.printDoseDe3hpNaoDFC("Isoniazida <br/> cp 300mg", doseDeINH, "Rifapentina <br/> cp 150mg", doseDeRifapentina);
        } else if(this.medicine === "3hp-300/300-dfc") {
            let dose;
            if(weight < 30) {
                return '<p class="doser__section__note">Ler <b>Notas e Precauções</b> 👇.</p>';
            } else {
                dose = 3;
                return this.printDoseDe3hpDFC(dose);
            }
        } else if(this.medicine === "lfx-100") {
            if(weight < 3) {
                return '<p class="doser__section__note">Ler <b>Notas e Precauções</b> 👇.</p>';
            }
            doseManha = weight < 4 ? 0.5
            : weight < 7 ? 1
            : weight < 10 ? 1.5
            : weight < 13 ? 2
            : weight < 16 ? 3
            : weight < 19 ? "3.5*"
            : weight < 21 ? "4*"
            : weight < 24 ? "4.5*"
            : weight < 26 ? "5*"
            : "-";
        } else if(this.medicine === "lfx-250") {
            if(weight < 3) {
                return '<p class="doser__section__note">Ler <b>Notas e Precauções</b> 👇.</p>';
            }
            doseManha = weight < 4 ? "-"
            : weight < 10 ? 0.5
            : weight < 16 ? 1
            : weight < 21 ? 1.5
            : weight < 26 ? 2
            : weight < 45 ? 3
            : 4;
        } else if(this.medicine === "vitb6-25") {
            doseManha = weight < 25 ? 0.5
            : "2*";
        } else if(this.medicine === "vitb6-50") {
            doseManha = weight < 25 ? "0.25*"
            : 1;
        }
        return this.printDose(doseManha, doseNoite)
    }
    printDose(doseManha, doseNoite) {
        let doseM = doseManha;
        let doseN = doseNoite;
        // Eliminar asterisco das doses com legenda
        if(typeof doseM === "string" && doseM.includes("*")) {
            doseM = Number(doseM.split("*")[0]);
        }
        if(typeof doseN === "string" && doseN.includes("*")) {
            doseN = Number(doseN.split("*")[0]);
        }
        // Calcular quantidade de cps ou frascos por fornecer ao paciente
        let dispensaMensal, dispensaTrimestral;
        let unidadeDaDoseManha = this.getUnidadeDaDose();
        let unidadeDaDoseNoite = this.getUnidadeDaDose();
        let unidadeDaQtdAaviar = this.getUnidadeDaDose();
        if(typeof doseM === "number" && typeof doseN === "number") {
            dispensaMensal = (doseM + doseN) * 30;
            dispensaTrimestral = (doseM + doseN) * 90;
            if(this.medicine.includes("susp")) {
                // Regra de 3 simples (Total de ml * 1/100 ml) em que 1 é frasco e 100, o seu volume;
                dispensaMensal = Math.ceil((doseM + doseN) * 30 / 100);
                dispensaTrimestral = Math.ceil((doseM + doseN) * 90 / 100); 
                unidadeDaQtdAaviar = "frasco(s) de <br>100 ml";
            }
        } else if(typeof doseM === "number" && typeof doseN !== "number") {
            dispensaMensal = doseM * 30;
            dispensaTrimestral = doseM * 90;
            unidadeDaDoseNoite = "";
            if(this.medicine.includes("susp")) {
                // Regra de 3 simples (Total de ml * 1/100 ml) em que 1 é frasco e 100, o seu volume;
                dispensaMensal = Math.ceil(doseM * 30 / 100);
                dispensaTrimestral = Math.ceil(doseM * 90 / 100); 
                unidadeDaQtdAaviar = "frasco(s) de <br>100 ml";
            }
        } else if(typeof doseM !== "number" && typeof doseN === "number") {
            dispensaMensal = doseN * 30;
            dispensaTrimestral = doseN * 90;
            unidadeDaDoseManha = "";
            if(this.medicine.includes("susp")) {
                // Regra de 3 simples (Total de ml * 1/100 ml) em que 1 é frasco e 100, o seu volume;
                dispensaMensal = Math.ceil(doseN * 30 / 100);
                dispensaTrimestral = Math.ceil(doseN * 90 / 100); 
                unidadeDaQtdAaviar = "frasco(s) de <br>100 ml";
            }
        } else if(doseManha === "-" && doseNoite === "-"){
            return '<p class="doser__section__note">Ler <b>Notas e Precauções</b> 👇.</p>';
        }
        // Converter dose de CTZ de 0.25 para 1/4
        if(doseManha === 0.25) {doseManha = "<sup>1</sup>/<sub>4</sub>";} 
        else if(doseManha === "0.25*") { doseManha = "<sup>1</sup>/<sub>4</sub>*";}
        if(this.medicine.includes("ctz-") || this.medicine.includes("inh-") || this.medicine.includes("vitb6-") || this.medicine.includes("lfx-")){
            return `<table class="table-grayscale table--layout-fixed table--no-margin-b">
                <tbody>
                    <tr><td colspan="2">${doseManha} ${unidadeDaDoseManha} uma vez/dia</td></tr>
                    <tr><th>Dispensa mensal</th><th>Dispensa trimestral</th></tr>
                    <tr><td>${dispensaMensal} ${unidadeDaQtdAaviar}</td><td>${dispensaTrimestral} ${unidadeDaQtdAaviar}</td></tr>                   
                </tbody>
            </table>`
        } else {
            return `<table class="table-grayscale table--layout-fixed table--no-margin-b">
                <thead>
                    <tr><th>Manhã</th><th>Noite</th></tr>
                </thead>
                <tbody>
                    <tr><td>${doseManha} ${unidadeDaDoseManha}</td><td>${doseNoite} ${unidadeDaDoseNoite}</td></tr>
                    <tr><th>Dispensa mensal</th><th>Dispensa trimestral</th></tr>
                    <tr><td>${dispensaMensal} ${unidadeDaQtdAaviar}</td><td>${dispensaTrimestral} ${unidadeDaQtdAaviar}</td></tr>                   
                </tbody>
            </table>`
        }
        
    }
    printDoseDe3hpNaoDFC(inh, doseDeINH, rifapentina, doseDeRifapentina) {
        let dispensaMensalDeINH = doseDeINH * 4;
        let dispensaTrimestralDeINH = doseDeINH * 12;
        let dispensaMensalDeRifapentina = doseDeRifapentina * 4;
        let dispensaTrimestralDeRifapentina= doseDeRifapentina * 12;
        return `<table class="table table-grayscale table--layout-fixed table--no-margin-b">
        <thead>
            <tr>
                <th>${inh}</th> 
                <th>${rifapentina}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${doseDeINH} cp(s)/semana</td> 
                <td>${doseDeRifapentina} cp(s)/semana</td>
            </tr>
            <tr>
                <th>Dispensa mensal</th> 
                <th>Dispensa trimestral</th> 
            </tr>
            <tr>
                <td>Isoniazida: ${dispensaMensalDeINH} cp(s), <br>
                Rifapentina: ${dispensaMensalDeRifapentina} cp(s)</td> 
                <td>Isoniazida: ${dispensaTrimestralDeINH} cp(s), <br>
                Rifapentina: ${dispensaTrimestralDeRifapentina} cp(s)</td>
            </tr>                   
        </tbody>
        </table>` 
    }
    printDoseDe3hpComINHde100e300(inh, doseDeINH, rifapentina, doseDeRifapentina) {
        let dispensaMensalDeINH300 = 1 * 4;
        let dispensaTrimestralDeINH300 = 1 * 12;
        let dispensaMensalDeINH100 = 2 * 4;
        let dispensaTrimestralDeINH100 = 2 * 12;
        let dispensaMensalDeRifapentina = doseDeRifapentina * 4;
        let dispensaTrimestralDeRifapentina= doseDeRifapentina * 12;
        return `<table class="table table-grayscale table--layout-fixed table--no-margin-b">
        <thead>
            <tr>
                <th>${inh}</th> 
                <th>${rifapentina}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${doseDeINH}</td> 
                <td>${doseDeRifapentina} cp(s)/semana</td>
            </tr>
            <tr>
                <th>Dispensa mensal</th> 
                <th>Dispensa trimestral</th> 
            </tr>
            <tr>
                <td>
                    Isoniazida 300mg: ${dispensaMensalDeINH300} cp(s), <br>Isoniazida 100mg: ${dispensaMensalDeINH100} cp(s), <br>Rifapentina: ${dispensaMensalDeRifapentina} cp(s)
                </td> 
                <td>
                    Isoniazida 300mg: ${dispensaTrimestralDeINH300} cp(s), <br>Isoniazida 100mg: ${dispensaTrimestralDeINH100} cp(s), <br>Rifapentina: ${dispensaTrimestralDeRifapentina} cp(s)
                </td>
            </tr>                   
        </tbody>
        </table>` 
    }
    printDoseDe3hpDFC(dose) {
        let dispensaMensal = dose * 4;
        let dispensaTrimestral = dose * 12;
        return `<table class="table table-grayscale table--layout-fixed table--no-margin-b">
        <thead>
            <tr>
                <th colspan="2">Isoniazida/Rifapentina 300/300 mg Comp. (3HP em DFC)</sup></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colspan="2">${dose} cp(s)/semana</td>
            </tr>
            <tr>
                <th>Dispensa mensal</th> 
                <th>Dispensa trimestral</th> 
            </tr>
            <tr>
                <td>${dispensaMensal} cp(s)</td> 
                <td>${dispensaTrimestral} cp(s)</td>
            </tr>                   
        </tbody>
        </table>` 
    }
    printDoseDePALD(dose, qtdLiquido) {
        let dispensaMensalEmCp = dose * 30;
        let dispensaTrimestralEmCp = dose * 90;
        let frascosMensais, frascosTrimestrais;
        if(dispensaMensalEmCp === 90) {
            frascosMensais = "1 frasco de 90 cp(s)";
            frascosTrimestrais = "1 frasco de 90 cp(s) e <br>1 frasco de 180 cp(s)"
        } else if(dispensaMensalEmCp <= 120) {
            frascosMensais = "1 frasco de 180 cp(s)";
            frascosTrimestrais = "2 frascos de 180 cp(s)"
        } else if(dispensaMensalEmCp <= 150) {
            frascosMensais = "1 frasco de 180 cp(s)";
            frascosTrimestrais = "1 frasco de 90 cp(s) e <br>2 frascos de 180 cp(s)"
        } else if(dispensaMensalEmCp <= 180) {
            frascosMensais = "1 frasco de 180 cp(s)";
            frascosTrimestrais =  "3 frascos de 180 cp(s)"
        }
        return `<table class="table-grayscale table--layout-fixed table--no-margin-b">
                <thead>
                    <tr><th>Dose</th><th>Água para dissolver</th></tr>
                </thead>
                <tbody>
                    <tr><td>${dose} cp(s) de manhã</td><td>${qtdLiquido} ml</td></tr>
                    <tr><th>Dispensa mensal</th><th>Dispensa trimestral</th></tr>
                    <tr><td>${dispensaMensalEmCp} cp(s) <br> 👇</td><td>${dispensaTrimestralEmCp} cp(s) <br> <span>👇<span></td></tr>
                    <tr><td>${frascosMensais}</td><td>${frascosTrimestrais}</td></tr>                
                </tbody>
            </table>`
    }
}
function instantiateDoser() {
    let weight = document.querySelector(".doser__input--weight").value;
    if(weight !== "" && weight < 3) {
        doserGeneralFunctions.showMinWeightAlert();
        doserGeneralFunctions.clearDoseAndnote();
    } else if(weight !== "" && weight >= 3) {
        doserGeneralFunctions.clearMinWeightAlert();
        doserGeneralFunctions.clearDoseAndnote();
        const medicines = document.querySelectorAll(".doser__select__option");
        let selectedMedicine;
        for (const medicine of medicines) {
            if(medicine.matches(".--selected")) {
                selectedMedicine = medicine;
            }
        }
        // Se não for option de placeholder
        if(selectedMedicine.dataset.farmaco) {
            selectedMedicine = selectedMedicine.dataset.farmaco;
            let doserObject = new Doser(weight, selectedMedicine);
            let doseOutput = document.querySelector(".doser__section__dose");
            let noteOutput = document.querySelector(".doser__section__note");
            doseOutput.innerHTML = doserObject.determinarDose();
            noteOutput.innerHTML = doserObject.getNotasEprecaucoes();
            // Add Padding to the note when it has some content or remove when it does not to avoid bg-color appearing
            noteOutput.textContent !== "" ? noteOutput.classList.remove("doser__section__note--no-padding")
            : noteOutput.classList.add("doser__section__note--no-padding");
        }
    } else {
        doserGeneralFunctions.clearMinWeightAlert();
        doserGeneralFunctions.clearDoseAndnote();
    }
}
function listenToDoserEvents() {
     // Highlight focused input
     const inputForWeight = document.querySelector(".doser__input--weight");
     inputForWeight.addEventListener("focusin", () => doserGeneralFunctions.highlightFocusedInput(inputForWeight.parentElement));
     // Remove highlight from the input
     inputForWeight.addEventListener("focusout", () => doserGeneralFunctions.removehighlightFromFocusedInput(inputForWeight.parentElement));
    // Toggle select (Open or Close);
    const selectOpeners = document.querySelectorAll(".doser__select__option, .select-opener");
    selectOpeners.forEach(opener => {
        opener.addEventListener("click", doserGeneralFunctions.openOrCloseSelect);
    });
    // Close select 
    const btnSelectCloser = document.querySelector(".doser__select__btn--close");
    btnSelectCloser.addEventListener("click", doserGeneralFunctions.closeSelect);
    // Close select by clicking anywhere 
    window.addEventListener("click", event => {
        !event.target.matches(".doser__select, .doser__select *, .select-opener") && doserGeneralFunctions.closeSelect();
    });
    // Select an option
    const medicines = document.querySelectorAll(".doser__select__option");
    medicines.forEach( medicine => {
        medicine.addEventListener("click", () => doserGeneralFunctions.selectAnOption(medicine));
    });
    // Search an option
    const inputTypeSearch = document.querySelector(".doser__select__input--search");
    inputTypeSearch.addEventListener("input", () => doserGeneralFunctions.filterAnOption(inputTypeSearch.value));
    // Determine doses
    inputForWeight.addEventListener("input", instantiateDoser);
    const medicinesAndMenuTabs = document.querySelectorAll(".doser__select__option, .header__main-menu__btn");
    medicinesAndMenuTabs.forEach( target => {
        target.addEventListener("click", instantiateDoser);
    });
}
window.addEventListener("load", listenToDoserEvents);