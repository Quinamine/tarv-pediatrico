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
    constructor(wt, med) {
        this.wt = wt;
        this.med = med;
    }
    getFormaFarmaceutica() {
        return this.med.includes("susp") ? "ml" : "cp(s)";
    }
    getNotasEprecaucoes() {
        let note;
        if(this.med === "pALD" && this.wt < 6) {
            note = 'Para peso &lt; 6 kg, recomenda-se <mark>ABC/3TC 120/60 mg + pDTG 10 mg</mark>.';
        } else if(this.med === "pALD" && this.wt < 25) {
            let dose = this.wt < 10 ? 3 
            : this.wt < 14 ? 4
            : this.wt < 20 ? 5
            : this.wt < 25 ? 6
            : "-";
            let qtdAgua, numColheres;
            this.wt < 10 ? (qtdAgua = 15, numColheres = 3) : (qtdAgua = 20, numColheres = 4);
            note = `<strong>Dissolver os ${dose} cp(s) em ${qtdAgua} ml de água (${numColheres} colheres de chá - veja na imagem abaixo)</strong>. Diluir o pALD preferencialmente com água, ou leite (materno ou fórmula artificial) caso os cuidadores não tenham acesso à água potável ou a criança não aceite o medicamento diluído com água. Para diluir com leite, usar as mesmas medidas de água. <br> <img src="imagens/colheres.png">`;
        } else if(this.med === "pALD" && this.wt < 30) {
            note = `A partir de 25 kg, está indicado <mark>ABC/3TC 600/300 mg + DTG 50 mg Comp.</mark>`;
        } else if(this.med === "pALD" && this.wt >= 30) {
            note = `Transitar para o regime <mark>TDF/3TC/DTG 300/300/50 mg Comp.</mark>`;
        } else if(this.med === "abc/3tc-120/60" && this.wt >= 6 && this.wt < 25) {
            note = '*Esta dosagem (ABC/3TC + pDTG ou DTG 50 mg) está prevista para uso apenas na ausência de cps de pALD.';
        } else if(this.med === "abc/3tc-120/60" && this.wt >= 25) {
            note = 'A partir de 25 kg, está indicado <mark>ABC/3TC 600/300 mg Comp.</mark>';
        } else if(this.med === "abc/3tc-600/300" && this.wt < 25) {
            note = 'O <mark>ABC/3TC 600/300 mg</mark> está indicado a partir de 25 kg.'
        } else if(this.med === "dtg-10" && this.wt >= 6 && this.wt < 25 || 
            this.med === "dtg-50" && this.wt >= 20 && this.wt < 25) {
            let dtg = this.med === "dtg-10" ? "pDTG" : "DTG 50 mg";
            note = `*Esta dosagem de <mark>${dtg} + ABC/3TC 120/60 mg</mark> está prevista para uso apenas na ausência de cps de pALD.`;
        } else if(this.med === "dtg-10" && this.wt >= 25) {
            note = 'Para peso &ge; 25 kg, está indicado <mark>DTG 50 mg Comp.</mark>'
        } else if(this.med === "dtg-50" && this.wt < 20) {
            note = 'Para peso &lt; 20 kg, está indicado <mark>pDTG 10 mg Comp.</mark>'
        } else if(this.med === "dtg-10" && this.wt < 6 || this.med === "dtg-50" && this.wt >= 20) {
            note = '<b>(1)</b> Não é recomendado tomar o DTG ao mesmo tempo que as vitaminas, sal ferroso, fenitoína ou antiácidos, pois reduzem  a concentração plasmática do DTG. Nesses casos, recomenda-se tomar o DTG no mínimo 2 horas antes ou 6 horas depois da toma desses medicamentos. <b>(2)</b> Pacientes que estiverem a usar a Rifampicina (RIF) devem ajustar a dose de DTG (DTG 12/12 horas) durante o tempo que recebem RIF e por mais 2 semanas. Depois passam a tomar o DTG apenas 1 vez/dia.'
        } else if(this.med === "tdf/3tc/dtg" && this.wt < 30) {
            note = 'O <mark>TDF/3TC/DTG 300/300/50 mg Comp.</mark> está indicado a partir de 30 kg.'
        } else if(this.med === "lpv/r-100/25" && this.wt < 10) {
            note = 'O <mark>LPV/r 100/25 mg Comp.</mark> está indicado a partir de 10 kg.'
        } else if(this.med === "lpv/r-200/50" && this.wt < 14) {
           note = 'O <mark>LPV/r 200/50 mg Comp.</mark> está indicado a partir de 14 kg.'
        } else if(this.med === "lpv/r-200/50" && this.wt < 14) {
            note = 'Para peso &lt; 14 kg, recomenda-se <mark>LPV/r 100/25 mg Comp.</mark>'
        } else if(this.med === "lpv/r-100/25" && this.wt >= 10 || this.med === "lpv/r-200/50" && this.wt >= 14) {
            note = 'LPV/r deve-se engolir inteiro. Esse comprimido não se parte, não se esmaga e não se dissolve em líquidos.'
        } else if(this.med === "azt-susp" && this.wt >= 14) {
            note = 'O <mark>AZT 10 mg/ml Xarope</mark> está indicado para crianças com peso &lt; 14 kg.'
        } else if(this.med === "duovir-ped" && this.wt >= 25) {
            note = 'Para peso &ge; 25 kg, está indicado <mark>AZT/3TC 300/150 mg Comp.</mark>'
        } else if(this.med === "duovir-adult" && this.wt < 14) {
            note = 'Para peso &lt; 14 kg, está indicado <mark>AZT/3TC 60/30 mg Comp.</mark>'
        } else if(this.med === "tdf/3tc" && this.wt < 30) {
            note = 'O <mark>TDF/3TC 300/300 mg Comp.</mark> está indicado a partir de 30 kg.'
        } else if(this.med === "atv/r" && this.wt < 25) {
            note = 'O <mark>ATV/r 300/100 mg Comp.</mark> está indicado a partir de 25 kg.'
        } else if(this.med === "rtv-100-booster" && this.wt < 10) {
            note = 'O <mark>RTV 100 mg Comp. <sup>(para&nbsp;superboosting)</sup></mark> está indicado a partir de 10 kg.'
        } else if(this.med.includes("drv") && this.wt < 14) {
            note = 'O <mark>Darunavir</mark> está indicado a partir de 14 kg.'
        } else if(this.med === "drv-75" && this.wt >= 25 && this.wt < 30) {
            note = 'Para peso &ge; 25 kg, está indicado <mark>DRV 150 mg Comp.</mark> ou <mark>DRV 600 mg Comp.</mark>'
        } else if(this.med === "drv-75" && this.wt >= 30) {
            note = 'Para peso &ge; 30 kg, está indicado <mark>DRV 600 mg Comp.</mark>'
        } else if(this.med === "drv-600" && this.wt >= 14 && this.wt < 25) {
            note = '*Esta dosagem é prevista para uso <strong>apenas</strong> na ausência de comprimidos de DRV de 75 ou 150 mg.'
        } else if(this.med === "rtv-100-3alinha" && this.wt < 14) {
            note = 'O <mark>RTV 100 mg Comp. <sup>(na&nbsp;3ª&nbsp;linha&nbsp;com&nbsp;DRV)</mark> está indicado a partir de 10 kg.'
        } else if(this.med === "ctz-susp" && this.wt >= 25) {
            note = 'Para peso &ge; 25 kg, recomenda-se <mark>Cotrimoxazol 480 mg Comp.</mark>'
        } else if(this.med === "inh-100" && this.wt >= 25) {
            note = 'Para peso &ge; 25 kg, recomenda-se <mark>Isoniazida 300 mg Comp.</mark>'
        } else if(this.med === "inh-300" && this.wt < 25) {
            note = 'Para peso &lt; 25 kg, recomenda-se <mark>Isoniazida 100 mg Comp.</mark>'
        } else if(this.med.includes("3hp") && this.wt < 10) {
            note = '<strong>Oferecer TPT com Isoniazida (6H).</strong> O 3HP está contraindicado em crianças &lt; 10 kg.'
        } else if(this.med=== "3hp-100/150" && this.wt >= 30) {
            note = 'Para peso &ge; 30 kg, está indicado <mark>Isoniazida/Rifapentina 300/300 mg Comp.<sup>(3HP em DFC)</sup></mark> ou, na ausência desse, <mark>Isoniazida 300 mg e Rifapentina 150 mg comprimidos não combinados</mark>.'
        } else if(this.med=== "3hp-300/150" && this.wt >= 30) {
            note = 'Prefira <mark>Isoniazida/Rifapentina 300/300 mg Comp.<sup>(3HP em DFC)</sup></mark> (menor quantidade de comprimidos).'
        } else if(this.med=== "3hp-300/300-dfc" && this.wt < 30 || this.med=== "3hp-300/150" && this.wt < 30) {
            note = 'Para peso &lt; 30 kg, recomenda-se <mark>Isoniazida 100 mg e Rifapentina 150 mg comprimidos dispersíveis não combinados</mark>.'
        }  else if(this.med === "lfx-100" && this.wt >= 16 && this.wt < 26) {
            note = '*Crianças com peso &ge; 16 kg que consigam engolir comprimidos inteiros, passar para comprimidos de 250 mg. <br/> <strong>Se o caso fonte tiver resistência comprovada a Fluoroquinolonas, não deve ser oferecido TPT aos contactos.</strong>'
        } else if(this.med === "lfx-100" && this.wt >= 26) {
            note = 'Para peso &ge; 26 kg, recomenda-se <mark>Levofloxacina 250 mg Comp.</mark>'
        } else if(this.med === "lfx-250" && this.wt < 4) {
            note = 'Para peso &lt; 4 kg, está indicado <mark>Levofloxacina 100 mg Comp.</mark>'
        } else if(this.med === "lfx-250" && this.wt >= 4 || this.med === "lfx-100" && this.wt < 16) {
            note = 'Se o caso fonte tiver resistência comprovada a Fluoroquinolonas, não deve ser oferecido TPT aos contactos.'
        } else if(this.med === "vitb6-25" && this.wt < 25 || this.med === "vitb6-50" && this.wt >= 25) {
            note = `A Piridoxina deve ser dada a todos pacientes em TPT ou tratamento da TB com regimes contendo Isoniazida. Em caso de neuropatia periférica, a dosagem deve ser aumentada para <mark>2&nbsp;mg/kg/dia</mark>. <br><b>Sinais e sintomas de neuropatia periférica</b>: Dor, queimação ou formigamento nas mãos ou pés, dormência ou perda de sensibilidade nos braços e pernas, ou cãibras ou espasmos musculares.`;
        } else if(this.med === "vitb6-25" && this.wt >= 25 || this.med === "vitb6-50" && this.wt < 25) {
            let dosagemVitB6 = (this.med === "vitb6-25") ? 50 : 25;
            note = `*No caso de não haver comprimidos de ${dosagemVitB6} mg. A Piridoxina deve ser dada a todos pacientes em TPT ou tratamento da TB com regimes contendo Isoniazida. Em caso de neuropatia periférica, a dosagem deve ser aumentada para <mark>2&nbsp;mg/kg/dia</mark>. <br><b>Sinais e sintomas de neuropatia periférica</b>: Dor, queimação ou formigamento nas mãos ou pés, dormência ou perda de sensibilidade nos braços e pernas, ou cãibras ou espasmos musculares.`;
        } else {
            note = "";
        }
        return note;
    }
    getEmbalagemMensal() {
        let frasco = 30;
        if(this.med.includes("duovir") || this.med.includes("rtv-100") || this.med.includes("drv-600") || this.med === "lpv/r-100/25") {
            frasco = 60;
        } else if(this.med === "lpv/r-200/50") {
            frasco = 120;
        } else if(this.med === "drv-75") {
            frasco = 480;
        } else if(this.med === "drv-150") {
            frasco = 240;
        } else if(this.med === "azt-susp") {
            frasco = 200;
        } else if(this.med === "ctz-susp") {
            frasco = 100;
        }
        return frasco;
    }
    lerNotasEprecaucoes(){
        return '<p class="doser__section__note">Ler <b>Notas e Precauções</b> 👇.</p>';
    }
    getEmbalagemTrimestral() {
        let frasco = 30;
        if(this.med === "tdf/3tc/dtg" || this.med === "dtg-10") {
            frasco = 90;
        } else if(this.med.includes("duovir") || this.med.includes("rtv-100") || this.med.includes("drv-600") || this.med === "lpv/r-100/25" || this.med === "abc/3tc-120/60") {
            frasco = 60;
        } else if(this.med === "lpv/r-200/50") {
            frasco = 120;
        } else if(this.med === "drv-75") {
            frasco = 480;
        } else if(this.med === "drv-150") {
            frasco = 240;
        } else if(this.med === "azt-susp") {
            frasco = 200;
        } else if(this.med === "ctz-susp") {
            frasco = 100;
        }
        return frasco;
    }
    determinarDose() {
        let doseM, doseN = "-";
        let wt = this.wt;
        if(this.med === "pALD") {
            let dose, qtdLiquido;
            if(wt < 6 || wt >= 25) return this.lerNotasEprecaucoes();
            wt <  10 ? (dose = 3, qtdLiquido = 15)
            : wt < 14 ? (dose = 4, qtdLiquido = 20)
            : wt < 20 ? (dose = 5, qtdLiquido = 20)
            : (dose = 6, qtdLiquido = 20);
            return this.printDoseDePALD(dose, qtdLiquido);
        } 
        else if(this.med === "abc/3tc-120/60") {
            doseM = wt < 6 ? 1
            : wt < 10 ? "1.5*"
            : wt < 14 ? "2*"
            : wt < 20 ? "2.5*"
            : wt < 25 ? "3*"
            : "-";
        } else if(this.med === "abc/3tc-600/300" || this.med === "atv/r" || this.med === "inh-300") {
            doseM = wt >= 25 ? 1 : "-";
        } else if(this.med === "dtg-10") {
            doseM = wt < 6 ? 0.5
            : wt < 10 ? "1.5*"
            : wt < 14 ? "2*"
            : wt < 20 ? "2.5*"
            : wt < 25 ? "3*"
            : "-";
        } else if(this.med === "dtg-50") {
            doseM = (wt >= 20 && wt < 25) ? "1*" 
            : wt >= 25 ? 1
            : "-";
        } else if(this.med.includes(`tdf`)) {
            doseM = wt >= 30 ? 1 : "-";
        } else if(this.med === "lpv/r-100/25") {
            wt < 10 ? (doseM = doseN = "-")
            : wt < 14 ? (doseM = 2, doseN = 1)
            : wt < 25 ? (doseM = doseN = 2)
            : (doseM = doseN = 3);
        } else if(this.med === "lpv/r-200/50") {
            wt < 14 ? (doseM = doseN = "-")
            : wt < 25 ? (doseM = doseN = 1)
            : wt < 30 ? (doseM = 2, doseN = 1)
            : (doseM = doseN = 2);
        } else if(this.med === "azt-susp") {
            doseM = wt < 6 ? 6
            : wt < 10 ? 9
            : wt < 14 ? 12
            : "-";
            doseN = doseM;
        } else if(this.med === "duovir-ped") {
            doseM = wt < 6 ? 1
            : wt < 10 ? 1.5
            : wt < 14 ? 2
            : wt < 20 ? 2.5
            : wt < 25 ? 3
            : "-";
            doseN = doseM;
        } else if(this.med === "duovir-adult") {
            wt < 14 ? (doseM = doseN = "-")
            : wt < 25 ? (doseM = 1, doseN = 0.5)
            : (doseM = doseN = 1);
        } else if(this.med === "rtv-100-booster") {
            wt < 10 ? (doseM = doseN = "-")
            : wt < 14 ? (doseM = doseN = 1)
            : wt < 25 ? (doseM = 1, doseN = 2)
            : (doseM = doseN = 2);
        } else if(this.med === "drv-75") {
            doseM = wt >= 14 && wt < 25 ? 5
            : "-";
            doseN = doseM;
        } else if(this.med === "drv-150") {
            doseM = wt < 14 || wt >= 30 ? "-"
            : wt < 25 ? 2.5
            : 3;
            doseN = doseM;
        } else if(this.med === "drv-600") {
            doseM = wt < 14 ? "-"
            : wt < 25 ? "0.5*"
            : 1;
            doseN = doseM;
        } else if(this.med === "rtv-100-3alinha") {
            doseM = wt < 14 ? "-"
            : wt < 25 ? 0.5
            : 1;
            doseN = doseM;
        } else if(this.med === "ctz-susp") {
            if(wt < 3) {
                return this.lerNotasEprecaucoes();
            }
            doseM = wt < 6 ? 2.5
            : wt < 14 ? 5
            : wt < 25 ? 10
            : "-";
        } else if(this.med === "ctz-cp") {
            if(wt < 3) {
                return this.lerNotasEprecaucoes();
            }
            doseM = wt < 6 ? 0.25
            : wt < 14 ? 0.5
            : wt < 25 ? 1
            : 2
        } else if(this.med === "inh-100") {
            if(wt < 4 || wt >= 25) {
                return this.lerNotasEprecaucoes();
            }
            doseM = wt < 8 ? 0.5
            : wt < 12 ? 1
            : wt < 16 ? 1.5
            : 2;
        } else if(this.med === "3hp-100/150") {
            let doseDeINH, doseDeRifapentina;
            if(wt < 10 || wt >= 30) {
                return this.lerNotasEprecaucoes();
            } 
            wt < 16 ? (doseDeINH = 3, doseDeRifapentina = 2)
            : wt < 24 ? (doseDeINH = 5, doseDeRifapentina= 3)
            : (doseDeINH = 6, doseDeRifapentina= 4);

            return this.printDoseDe3hpNaoDFC("Isoniazida <br/> cp 100mg", doseDeINH, "Rifapentina <br/> cp 150mg", doseDeRifapentina);
        } else if(this.med === "3hp-300/150") {
            let doseDeINH, doseDeRifapentina;
            if(wt < 30) {
                return this.lerNotasEprecaucoes();
            } else {
                doseDeINH = 3;
                doseDeRifapentina= 6;
            }
            return this.printDoseDe3hpNaoDFC("Isoniazida <br/> cp 300mg", doseDeINH, "Rifapentina <br/> cp 150mg", doseDeRifapentina);
        } else if(this.med === "3hp-300/300-dfc") {
            let dose;
            if(wt < 30) {
                return this.lerNotasEprecaucoes();
            } else {
                dose = 3;
                return this.printDoseDe3hpDFC(dose);
            }
        } else if(this.med === "lfx-100") {
            if(wt < 3) {
                return this.lerNotasEprecaucoes();
            }
            doseM = wt < 4 ? 0.5
            : wt < 7 ? 1
            : wt < 10 ? 1.5
            : wt < 13 ? 2
            : wt < 16 ? 3
            : wt < 19 ? "3.5*"
            : wt < 21 ? "4*"
            : wt < 24 ? "4.5*"
            : wt < 26 ? "5*"
            : "-";
        } else if(this.med === "lfx-250") {
            if(wt < 3) {
                return this.lerNotasEprecaucoes();
            }
            doseM = wt < 4 ? "-"
            : wt < 10 ? 0.5
            : wt < 16 ? 1
            : wt < 21 ? 1.5
            : wt < 26 ? 2
            : wt < 45 ? 3
            : 4;
        } else if(this.med === "vitb6-25") {
            doseM = wt < 25 ? 0.5
            : "2*";
        } else if(this.med === "vitb6-50") {
            doseM = wt < 25 ? "0.25*"
            : 1;
        }
        return this.printDose(doseM, doseN)
    }
    printDose(doseManha, doseNoite) {
        if(doseManha === "-" && doseNoite === "-") {
            return this.lerNotasEprecaucoes();
        } else {
            let doseM = String(doseManha).replace(/[^0-9.]/g, "");
            let doseN = String(doseNoite).replace(/[^0-9.]/g, "");
            let doseDiaria = Number(doseM) + Number(doseN);
            let dM = Number(doseDiaria) * 30;
            let dT = Number(doseDiaria) * 90;
            // Calcular dispensa em frascos
            let frascoMensal = this.getEmbalagemMensal();
            let frascoTrimestral = this.getEmbalagemTrimestral();
            let numFrascosMensais = Math.ceil(Number(doseDiaria) * 30 / frascoMensal);
            let numFrascosTrimestrais = Math.ceil(Number(doseDiaria) * 90 / frascoTrimestral);
            if(frascoMensal !== frascoTrimestral) {
                if(dM > (frascoMensal * 2) && dM <= frascoTrimestral) {
                    frascoMensal = frascoTrimestral;
                    numFrascosMensais = 1;
                } 
                if(dT < (frascoMensal * 2)) {
                    frascoTrimestral = frascoMensal;
                    numFrascosTrimestrais = 2;
                }
            }
            let formaFarmaceuticaDoMed = this.getFormaFarmaceutica();
            let dMEmFr = `${numFrascosMensais} frasco(s) de ${frascoMensal}`;
            let dTEmFr = `${numFrascosTrimestrais} frasco(s) de ${frascoTrimestral}`;
            if(frascoMensal === 30 && frascoTrimestral === 60) {
                if(dM > 30 && dM <= 60){
                    dMEmFr = `1 frasco(s) de 60 cp(s) <strong>ou</strong> <br>${dMEmFr}`;
                } else if(dM > 60 && dM <= 90) {
                    dMEmFr = `1 frasco(s) de 60 cp(s) <strong>e</strong> <br>1 frasco(s) de 30`;
                }
                if(dT <= 90) {
                    dTEmFr = `1 frasco(s) de 60 cp(s) <strong>e</strong> <br>1 frasco(s) de 30`;
                } else if(dT <= 150) {
                    dTEmFr = `2 frasco(s) de 60 cp(s) <strong>e</strong>  <br>1 frasco(s) de 30`;
                } else if(dT === 270) {
                    dTEmFr = `4 frasco(s) de 60 cp(s) <strong>e</strong>  <br>1 frasco(s) de 30`;
                }
            }
            // Converter dose "0.25" para "1/4"
            doseManha === 0.25 && (doseManha = "<sup>1</sup>/<sub>4</sub>");
            doseManha === "0.25*" && (doseManha = "<sup>1</sup>/<sub>4</sub>*");
            if(this.med.includes("ctz-") || this.med.includes("inh-") || this.med.includes("vitb6-") || this.med.includes("lfx-")){
                this.med === "ctz-susp" && (dM = dMEmFr, dT = dTEmFr);
                return `<table class="table-grayscale table--layout-fixed table--no-margin-b">
                    <tbody>
                        <tr><td colspan="2">${doseManha} ${formaFarmaceuticaDoMed} uma vez/dia</td></tr>
                        <tr><th>Dispensa mensal</th><th>Dispensa trimestral</th></tr>
                        <tr><td>${dM} ${formaFarmaceuticaDoMed}</td><td>${dT} ${formaFarmaceuticaDoMed}</td></tr>                   
                    </tbody>
                </table>`
            } else {
                let formaFarmaceuticaDoseN = (typeof doseNoite === "number") ? formaFarmaceuticaDoMed : ""; // Se DoseN === "-", FormaFarmaceutica = "";
                return `<table class="table-grayscale table--layout-fixed table--no-margin-b">
                    <thead>
                        <tr><th>Manhã</th><th>Noite</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>${doseManha} ${formaFarmaceuticaDoMed}</td><td>${doseNoite} ${formaFarmaceuticaDoseN}</td></tr>
                        <tr><th>Dispensa mensal</th><th>Dispensa trimestral</th></tr>
                        <tr><td>${dM} ${formaFarmaceuticaDoMed}<br>👇</td> <td>${dT} ${formaFarmaceuticaDoMed}<br>👇</td></tr>
                        <tr><td>${dMEmFr} ${formaFarmaceuticaDoMed}</td><td>${dTEmFr} ${formaFarmaceuticaDoMed}</td></tr>         
                    </tbody>
                </table>`
            }
        }
        
    }
    printDoseDe3hpNaoDFC(inh, doseDeINH, rifapentina, doseDeRifapentina) {
        let dMDeINH = doseDeINH * 4;
        let dTDeINH = doseDeINH * 12;
        let dMDeRifapentina = doseDeRifapentina * 4;
        let dTDeRifapentina= doseDeRifapentina * 12;
        return `<table class="table-grayscale table--layout-fixed table--no-margin-b">
            <thead>
                <tr><th>${inh}</th><th>${rifapentina}</th></tr>
            </thead>
            <tbody>
                <tr><td>${doseDeINH} cp(s)/semana</td><td>${doseDeRifapentina} cp(s)/semana</td></tr>
                <tr><th>Dispensa mensal</th><th>Dispensa trimestral</th></tr>
                <tr>
                    <td>Isoniazida: ${dMDeINH} cp(s), <br>
                    Rifapentina: ${dMDeRifapentina} cp(s)</td> 
                    <td>Isoniazida: ${dTDeINH} cp(s), <br>
                    Rifapentina: ${dTDeRifapentina} cp(s)</td>
                </tr>                   
            </tbody>
        </table>` 
    }
    printDoseDe3hpComINHde100e300(inh, doseDeINH, rifapentina, doseDeRifapentina) {
        let dMDeINH300 = 1 * 4;
        let dTDeINH300 = 1 * 12;
        let dMDeINH100 = 2 * 4;
        let dTDeINH100 = 2 * 12;
        let dMDeRifapentina = doseDeRifapentina * 4;
        let dTDeRifapentina= doseDeRifapentina * 12;
        return `<table class="table-grayscale table--layout-fixed table--no-margin-b">
            <thead>
                <tr><th>${inh}</th><th>${rifapentina}</th></tr>
            </thead>
            <tbody>
                <tr><td>${doseDeINH}</td><td>${doseDeRifapentina} cp(s)/semana</td></tr>
                <tr><th>Dispensa mensal</th><th>Dispensa trimestral</th></tr>
                <tr>
                    <td>
                        Isoniazida 300mg: ${dMDeINH300} cp(s), <br>Isoniazida 100mg: ${dMDeINH100} cp(s), <br>Rifapentina: ${dMDeRifapentina} cp(s)
                    </td> 
                    <td>
                        Isoniazida 300mg: ${dTDeINH300} cp(s), <br>Isoniazida 100mg: ${dTDeINH100} cp(s), <br>Rifapentina: ${dTDeRifapentina} cp(s)
                    </td>
                </tr>                   
            </tbody>
        </table>` 
    }
    printDoseDe3hpDFC(dose) {
        let dM = dose * 4;
        let dT = dose * 12;
        return `<table class="table table-grayscale table--layout-fixed table--no-margin-b">
            <thead>
                <tr>
                    <th colspan="2">Isoniazida/Rifapentina 300/300 mg Comp. (3HP em DFC)</sup></th>
                </tr>
            </thead>
            <tbody>
                <tr><td colspan="2">${dose} cp(s)/semana</td></tr>
                <tr><th>Dispensa mensal</th><th>Dispensa trimestral</th></tr>
                <tr><td>${dM} cp(s)</td><td>${dT} cp(s)</td></tr>                   
            </tbody>
        </table>` 
    }
    printDoseDePALD(dose, qtdLiquido) {
        let dMEmCp = dose * 30;
        let dTEmCp = dose * 90;
        let frascosMensais, frascosTrimestrais;
        if(dMEmCp === 90) {
            frascosMensais = "1 frasco de 90 cp(s)";
            frascosTrimestrais = "1 frasco de 90 cp(s) <strong>e</strong> <br>1 frasco de 180 cp(s)"
        } else if(dMEmCp <= 120) {
            frascosMensais = "1 frasco de 180 cp(s)";
            frascosTrimestrais = "2 frascos de 180 cp(s)"
        } else if(dMEmCp <= 150) {
            frascosMensais = "1 frasco de 180 cp(s)";
            frascosTrimestrais = "1 frasco de 90 cp(s) <strong>e</strong> <br>2 frascos de 180 cp(s)"
        } else if(dMEmCp <= 180) {
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
                    <tr><td>${dMEmCp} cp(s) <br>👇</td><td>${dTEmCp} cp(s) <br>👇</td></tr>
                    <tr><td>${frascosMensais}</td><td>${frascosTrimestrais}</td></tr>                
                </tbody>
            </table>`
    }
}
function instantiateDoser() {
    let wt = document.querySelector(".doser__input--weight").value;
    if(wt !== "" && wt < 3) {
        doserGeneralFunctions.showMinWeightAlert();
        doserGeneralFunctions.clearDoseAndnote();
    } else if(wt !== "" && wt >= 3) {
        doserGeneralFunctions.clearMinWeightAlert();
        doserGeneralFunctions.clearDoseAndnote();
        const meds = document.querySelectorAll(".doser__select__option");
        let selectedMedicine;
        for (const med of meds) {
            if(med.matches(".--selected")) {
                selectedMedicine = med;
            }
        }
        // Se não for option de placeholder
        if(selectedMedicine.dataset.farmaco) {
            selectedMedicine = selectedMedicine.dataset.farmaco;
            let doserObject = new Doser(wt, selectedMedicine);
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
    const meds = document.querySelectorAll(".doser__select__option");
    meds.forEach( med => {
        med.addEventListener("click", () => doserGeneralFunctions.selectAnOption(med));
    });
    // Search an option
    const inputTypeSearch = document.querySelector(".doser__select__input--search");
    inputTypeSearch.addEventListener("input", () => doserGeneralFunctions.filterAnOption(inputTypeSearch.value));
    // Determine doses
    inputForWeight.addEventListener("input", instantiateDoser);
    const medsAndMenuTabs = document.querySelectorAll(".doser__select__option, .header__main-menu__btn");
    medsAndMenuTabs.forEach( target => {
        target.addEventListener("click", instantiateDoser);
    });
}
window.addEventListener("load", listenToDoserEvents);