"use strict"
class Darv {
    constructor(weight, medicine) {
        this.weight = weight;
        this.medicine = medicine;
    }
    getFormaFarmaceutica() {
        let formaFarmaceutica;
        if(this.medicine.includes("susp")) {
            formaFarmaceutica = "ml";
        } else if(this.medicine.includes("saquetas")) {
            formaFarmaceutica = "saquetas";
        } else {
            formaFarmaceutica = "cp(s)";
        }
        return formaFarmaceutica;
    }
    getNotasEprecaucoes() {
        let note;
        if(this.medicine === "abc/3tc-120/60mg" && this.weight >= 25) {
            note = 'Para peso &ge; 25 kg, use <strong>ABC/3TC 600 mg/300 mg Comp.</strong>';
        } else if(this.medicine === "abc/3tc-600/300mg" && this.weight < 25) {
            note = 'Para peso &lt; 25 kg, use <strong>ABC/3TC 120 mg/60 mg Comp.</strong>'
        } else if(this.medicine === "pDtg-10mg" && this.weight >= 20 && this.weight < 25) {
            note = '*Esta dosagem é prevista para uso <strong>APENAS</strong> na ausência de comprimidos de DTG 50 mg. Para peso &ge; 20 kg, recomenda-se <strong>DTG 50 mg Comp.</strong>'
        } else if(this.medicine === "pDtg-10mg" && this.weight >= 25) {
            note = 'Para peso &ge; 20 kg, recomenda-se <strong>DTG 50 mg Comp.</strong>'
        } else if(this.medicine === "dtg-50mg" && this.weight < 20) {
            note = 'Para peso &lt; 20 kg, use <strong>pDTG 10 mg Comp.</strong>'
        }  else if(this.medicine === "pDtg-10mg" && this.weight < 20 || this.medicine === "dtg-50mg" && this.weight >= 20) {
            note = '<b>(1)</b> Não é recomendado tomar o DTG ao mesmo tempo que as vitaminas, sal ferroso, fenitoína ou antiácidos, pois reduzem  a concentração plasmática do DTG. Nestes casos, recomenda-se tomar o DTG no mínimo 2 horas antes ou 6 horas depois da toma desses medicamentos. <b>(2)</b> Pacientes que estiverem a usar a Rifampicina (RIF) devem ajustar a dose de DTG (DTG 12/12 horas)</b> durante o tempo que recebem RIF e por mais 2 semanas. Depois passam a tomar o DTG apenas 1 vez/dia.'
        } else if(this.medicine === "tdf/3tc/dtg" && this.weight < 30) {
            note = 'O <b>TDF/3TC/DTG 300/300/50 mg Comp.</b> não é recomendado para crianças com peso &lt;  30 kg.'
        } else if(this.medicine === "lpv/r-40/10mg-saquetas" && this.weight >= 20) {
            note = 'Para peso &ge; 20 kg, use <strong>LPV/r 100 mg/25 mg Comp.</strong> ou <strong>LPV/r 200 mg/50 mg Comp.</strong>'
        } else if(this.medicine === "lpv/r-100/25mg" && this.weight < 10) {
            note = 'Para peso &lt; 10 kg, use <strong>LPV/r 40 mg/10 mg Saquetas</strong>.'
        } else if(this.medicine === "lpv/r-200/50mg" && this.weight < 14) {
            note = 'Para peso &lt; 14 kg, use <strong>LPV/r 40 mg/10 mg Saquetas</strong> ou <strong>LPV/r 100 mg/25 mg Comp.</strong>'
        } else if(this.medicine === "lpv/r-100/25mg" && this.weight >= 10 || this.medicine === "lpv/r-200/50mg" && this.weight >= 14) {
            note = 'Deve-se engolir inteiro. Este comprimido não se parte, não se esmaga e não se dissolve em líquidos. Caso não consiga engolir inteiro, deve tomar <b>LPV/r 40 mg/10 mg Saquetas</b>.'
        } else if(this.medicine === "azt-susp" && this.weight >= 14) {
            note = 'O <b>AZT 10 mg/ml Xarope</b> recomenda-se para crianças com peso &lt; 14 kg.'
        } else if(this.medicine === "duovir-ped" && this.weight >= 25) {
            note = 'Para peso &ge; 25 kg, use <strong>AZT/3TC 300 mg/150 mg Comp.</strong>'
        } else if(this.medicine === "duovir-adult" && this.weight < 14) {
            note = 'Para peso &lt; 14 kg, use <strong>AZT/3TC 60 mg/30 mg Comp.</strong>'
        } else if(this.medicine === "tdf/3tc" && this.weight < 30) {
            note = 'O <b>TDF/3TC 300 mg/300 mg Comp.</b> não é recomendado para crianças com peso &lt;  30 kg.'
        } else if(this.medicine === "tdf/3tc/efv" && this.weight < 30) {
            note = 'O <b>TDF/3TC/EFV 300/300/400 mg Comp.</b> não é recomendado para crianças com peso &lt;  30 kg.'
        } else if(this.medicine === "efv" && this.weight < 10) {
            note = 'O <b>EFV 200 mg Comp.</b> não é recomendado para crianças com peso &lt; 10 kg.'
        } else if(this.medicine === "atv/r" && this.weight < 25) {
            note = 'O <b>ATV/r 300 mg/100 mg Comp.</b> não é recomendado para crianças com peso &lt; 25 kg.'
        } else if(this.medicine === "rtv-100-superboosting" && this.weight < 10) {
            note = 'O <b>RTV 100 mg Comp. <sup>(para&nbsp;superboosting)</sup></b> recomenda-se a partir de 10 kg.'
        } else if(this.medicine.includes("drv") && this.weight < 14) {
            note = 'O <b>Darunavir</b> recomenda-se a partir de 14 kg.'
        } else if(this.medicine === "drv-75" && this.weight >= 25 && this.weight < 30) {
            note = 'Para peso &ge; 25 kg, use <strong>DRV 150 mg Comp.</strong> ou <strong>DRV 600 mg Comp.</strong>'
        } else if(this.medicine === "drv-75" && this.weight >= 30) {
            note = 'Para peso &ge; 30 kg, use <strong>DRV 600 mg Comp.</strong>'
        } else if(this.medicine === "drv-600" && this.weight >= 14 && this.weight < 25) {
            note = '*Esta dosagem é prevista para uso <strong>APENAS</strong> na ausência de comprimidos de DRV de 75 ou 150 mg.</strong>'
        } else if(this.medicine === "rtv-100-3alinha" && this.weight < 14) {
            note = 'O <strong>RTV 100 mg Comp. <sup>(na&nbsp;3ª&nbsp;linha&nbsp;com&nbsp;DRV)</strong> recomenda-se a partir de 10 kg.'
        } else if(this.medicine === "ctz-susp" && this.weight >= 25) {
            note = 'Para peso &ge; 25 kg, use <strong>Cotrimoxazol 480 mg Comp.</strong>'
        } else if(this.medicine === "inh-300" && this.weight < 25) {
            note = 'Para peso &lt; 25 kg, use <strong>Isoniazida 100 mg Comp.</strong>'
        } else if(this.medicine.includes("3hp") && this.weight < 10) {
            note = '<strong>Oferecer profilaxia com Isoniazida (TPT - INH).</strong>'
        } else if(this.medicine=== "3hp-100/150" && this.weight >= 30) {
            note = 'Para peso &ge; 30 kg, recomenda-se <strong>Isoniazida/Rifapentina 300 mg/300 mg Comp.<sup>(3HP em DFC)</sup></strong> ou, na ausência desse, <strong>Isoniazida 300 mg e Rifapentina 150 mg Comp.<sup>(3HP não DFC)</sup></strong>'
        } else if(this.medicine=== "3hp-300/150" && this.weight >= 16 && this.weight < 24) {
            note = '*Caso tenha apenas comprimidos de Isoniazida 300 mg disponível, <strong>a dosagem é de 1.5 comprimidos por semana.</strong>'
        } else if(this.medicine=== "3hp-300/150" && this.weight >= 30) {
            note = 'Prefira usar <strong>Isoniazida/Rifapentina 300 mg/300 mg Comp.<sup>(3HP em DFC)</sup></strong> (menor quantidade de comprimidos).'
        } else if(this.medicine=== "3hp-300/300-dfc" && this.weight < 30) {
            note = 'Para peso &lt; 30 kg, recomenda-se <strong>Isoniazida 100 mg e Rifapentina 150 mg Comp.<sup>(3HP não DFC)</sup></strong> ou <strong>Isoniazida 300 mg e Rifapentina 150 mg Comp.<sup>(3HP não DFC)</sup></strong>'
        }  else if(this.medicine === "lfx-100" && this.weight >= 16 && this.weight < 26) {
            note = '*Crianças com peso &ge; 16 kg que consigam engolir comprimidos inteiros, passar para comprimidos de 250 mg. <br/> Se o caso fonte tiver resistência comprovada a Fluroquinolonas, não deve ser oferecido TPT.</strong>'
        } else if(this.medicine === "lfx-100" && this.weight >= 26) {
            note = 'Para peso &ge; 26 kg, recomenda-se <strong>Levofloxacina 250 mg Comp.</strong>'
        } else if(this.medicine === "lfx-250" && this.weight < 4) {
            note = 'Para peso &lt; 4 kg, use <strong>Levofloxacina 100 mg Comp.</strong>'
        } else if(this.medicine === "lfx-250" && this.weight >= 4 || this.medicine === "lfx-100" && this.weight < 16) {
            note = 'Se o caso fonte tiver resistência comprovada a Fluroquinolonas, não deve ser oferecido TPT.'
        } else {
            note = "";
        }
        return note;
    }
    determinarDose() {
        let dosemanha, dosenoite = "-";
        let weight = this.weight;
        if(this.medicine === "abc/3tc-120/60mg") {
            if(weight < 6) {
                dosemanha = 1;
            } else if(weight < 10) {
                dosemanha = 1.5;
            } else if(weight < 14) {
                dosemanha = 2;
            } else if(weight < 20) {
                dosemanha = 2.5;
            } else if(weight < 25) {
                dosemanha = 3;
            } else {
                dosemanha = "-";
            }
        } else if(this.medicine === "abc/3tc-600/300mg") {
            if(weight < 25) {
                dosemanha = "-";
            } else {
                dosemanha = 1;
            }
        } else if(this.medicine === "pDtg-10mg") {
            if(weight < 6) {
                dosemanha = 0.5;
            } else if(weight < 10) {
                dosemanha = 1.5;
            } else if(weight < 14) {
                dosemanha = 2;
            } else if(weight < 20) {
                dosemanha = 2.5;
            } else if(weight < 25) {
                dosemanha = "3*";
            } else {
                dosemanha = "-";
            }
        } else if(this.medicine === "dtg-50mg") {
            if(weight < 20) {
                dosemanha = "-";
            } else {
                dosemanha = 1;
            } 
        } else if(this.medicine.includes(`tdf`)) {
            if(weight < 30) {
                dosemanha = "-";
            } else {
                dosemanha = 1;
            } 
        } else if(this.medicine === "lpv/r-40/10mg-saquetas") {
            if(weight < 6) {
                dosemanha = 2;
                dosenoite = 2
            } else if(weight < 10) {
                dosemanha = 3;
                dosenoite = 3
            } else if(weight < 14) {
                dosemanha = 4;
                dosenoite = 4
            } else if(weight < 20) {
                dosemanha = 5;
                dosenoite = 5
            } else {
                dosemanha = "-";
                dosenoite = "-";
            }
        } else if(this.medicine === "lpv/r-100/25mg") {
            if(weight < 10) {
                dosemanha = "-";
                dosenoite = "-"
            } else if(weight < 14) {
                dosemanha = 2;
                dosenoite = 1
            } else if(weight < 25) {
                dosemanha = 2;
                dosenoite = 2
            } else {
                dosemanha = 3;
                dosenoite = 3;
            }
        } else if(this.medicine === "lpv/r-200/50mg") {
            if(weight < 14) {
                dosemanha = "-";
                dosenoite = "-"
            } else if(weight < 25) {
                dosemanha = 1;
                dosenoite = 1
            } else if(weight < 30) {
                dosemanha = 2;
                dosenoite = 1
            } else {
                dosemanha = 2;
                dosenoite = 2;
            }
        } else if(this.medicine === "azt-susp") {
            if(weight < 6) {
                dosemanha = 6;
                dosenoite = 6
            } else if(weight < 10) {
                dosemanha = 9;
                dosenoite = 9
            } else if(weight < 14) {
                dosemanha = 12;
                dosenoite = 12
            } else {
                dosemanha = "-"
                dosenoite = "-"
            }
        } else if(this.medicine === "duovir-ped") {
            if(weight < 6) {
                dosemanha = 1;
                dosenoite = 1;
            } else if(weight < 10) {
                dosemanha = 1.5;
                dosenoite = 1.5;
            } else if(weight < 14) {
                dosemanha = 2;
                dosenoite = 2;
            } else if(weight < 20) {
                dosemanha = 2.5;
                dosenoite = 2.5;
            } else if(weight < 25) {
                dosemanha = 3;
                dosenoite = 3;
            } else {
                dosemanha = "-"
                dosenoite = "-"
            }
        } else if(this.medicine === "duovir-adult") {
            if(weight < 14) {
                dosemanha = "-"
                dosenoite = "-"
            } else if(weight < 25) {
                dosemanha = 1;
                dosenoite = 0.5;
            } else {
                dosemanha = 1;
                dosenoite = 1;
            }
        } else if(this.medicine === "efv") {
            if(weight < 10) {
                dosemanha = "-"
                dosenoite = "-"
            } else if(weight < 14) {
                dosemanha = "-"
                dosenoite = 1;
            } else if(weight < 25) {
                dosemanha = "-"
                dosenoite = 1.5;
            } else {
                dosemanha = "-"
                dosenoite = 2;
            }
        } else if(this.medicine === "atv/r") {
            if(weight < 25) {
                dosemanha = "-";
                dosenoite = "-";
            } else {
                dosemanha = 1;
                dosenoite = "-";
            }
        } else if(this.medicine === "rtv-100-superboosting") {
            if(weight < 10) {
                dosemanha = "-";
                dosenoite = "-";
            } else if(weight < 14) {
                dosemanha = 1;
                dosenoite = 1;
            } else if(weight < 25) {
                dosemanha = 1;
                dosenoite = 2;
            } else {
                dosemanha = 2;
                dosenoite = 2;
            }
        } else if(this.medicine === "drv-75") {
            if(weight >= 14 && weight < 25) {
                dosemanha = 5;
                dosenoite = 5;
            } else {
                dosemanha = "-";
                dosenoite = "-";
            }
        } else if(this.medicine === "drv-150") {
            if(weight < 14) {
                dosemanha = "-";
                dosenoite = "-";
            } else if(weight < 25) {
                dosemanha = 2.5;
                dosenoite = 2.5;
            } else if(weight < 30) {
                dosemanha = 3;
                dosenoite = 3;
            } else {
                dosemanha = "-";
                dosenoite = "-";
            }
        } else if(this.medicine === "drv-600") {
            if(weight < 14) {
                dosemanha = "-";
                dosenoite = "-";
            } else if(weight < 25) {
                dosemanha = "0.5*";
                dosenoite = "0.5*";
            } else {
                dosemanha = 1;
                dosenoite = 1;
            }
        } else if(this.medicine === "rtv-100-3alinha") {
            if(weight < 14) {
                dosemanha = "-";
                dosenoite = "-";
            } else if(weight < 25) {
                dosemanha = 0.5;
                dosenoite = 0.5;
            } else {
                dosemanha = 1;
                dosenoite = 1;
            }
        } else if(this.medicine === "ctz-susp") {
            if(weight < 6) {
                dosemanha = 2.5;
                dosenoite = "-";
            } else if(weight < 14) {
                dosemanha = 5;
                dosenoite = "-";
            } else if(weight < 25) {
                dosemanha = 10;
                dosenoite = "-";
            } else {
                dosemanha = "-";
                dosenoite = "-";
            }
        } else if(this.medicine === "ctz-cp") {
            if(weight < 6) {
                dosemanha = 0.25;
                dosenoite = "-";
            } else if(weight < 14) {
                dosemanha = 0.5;
                dosenoite = "-";
            } else if(weight < 25) {
                dosemanha = 1;
                dosenoite = "-";
            } else {
                dosemanha = 2;
                dosenoite = "-";
            }
        } else if(this.medicine === "inh-100") {
            if(weight < 5) {
                dosemanha = 0.5;
                dosenoite = "-";
            } else if(weight < 10) {
                dosemanha = 1;
                dosenoite = "-";
            } else if(weight < 14) {
                dosemanha = 1.5;
                dosenoite = "-";
            } else if(weight < 20) {
                dosemanha = 2;
                dosenoite = "-";
            } else if(weight < 25) {
                dosemanha = 2.5;
                dosenoite = "-";
            } else {
                dosemanha = 3;
                dosenoite = "-";
            }
        } else if(this.medicine === "inh-300") {
            if(weight < 25) {
                dosemanha = "-";
                dosenoite = "-";
            } else {
                dosemanha = 1;
                dosenoite = "-";
            }
        } else if(this.medicine === "3hp-100/150") {
            let doseInh, doseRifapentina;
            if(weight < 10 || weight >= 30) {
                return '<p class="doser__section__note">Ver <b>Notas e Precauções</b>.</p>';
            } else if(weight < 16) {
                doseInh = 3;
                doseRifapentina= 2;
            } else if(weight < 24) {
                doseInh = 5;
                doseRifapentina= 3;
            } else if(weight < 30) {
                doseInh = 6;
                doseRifapentina= 4;
            }
            return this.printDoseDe3hpNaoDFC("Isoniazida <br/> cp 100mg", doseInh, "Rifapentina <br/> cp 150mg", doseRifapentina);
        } else if(this.medicine === "3hp-300/150") {
            let doseInh, doseRifapentina;
            if(weight < 10) {
                return '<p class="doser__section__note">Ver <b>Notas e Precauções</b>.</p>';
            } else if(weight < 16) {
                doseInh = 1;
                doseRifapentina= 2;
            } else if(weight < 24) {
                doseInh = "1 cp de 300mg + 2 cp(s) de 100mg/semana*";
                doseRifapentina= 3;
                return this.printDoseDe3hpDelicado("Isoniazida <br/> cp 300mg", doseInh, "Rifapentina <br/> cp 150mg", doseRifapentina)
            } else if(weight < 30) {
                doseInh = 2;
                doseRifapentina= 4;
            } else {
                doseInh = 3;
                doseRifapentina= 6;
            }
            return this.printDoseDe3hpNaoDFC("Isoniazida <br/> cp 300mg", doseInh, "Rifapentina <br/> cp 150mg", doseRifapentina);
        } else if(this.medicine === "3hp-300/300-dfc") {
            let dose;
            if(weight < 30) {
                return '<p class="doser__section__note">Ver <b>Notas e Precauções</b>.</p>';
            } else {
                dose = 3;
                return this.printDoseDe3hpDFC(dose);
            }
        } else if(this.medicine === "lfx-100") {
            if(weight < 4) {
                dosemanha = 0.5;
                dosenoite = "-";
            } else if(weight < 7) {
                dosemanha = 1;
                dosenoite = "-";
            } else if(weight < 10) {
                dosemanha = 1.5;
                dosenoite = "-";
            } else if(weight < 13) {
                dosemanha = 2;
                dosenoite = "-";
            } else if(weight < 16) {
                dosemanha = 3;
                dosenoite = "-";
            } else if(weight < 19) {
                dosemanha = "3.5*";
                dosenoite = "-";
            } else if(weight < 21) {
                dosemanha = "4*";
                dosenoite = "-";
            } else if(weight < 24) {
                dosemanha = "4.5*";
                dosenoite = "-";
            } else if(weight < 26) {
                dosemanha = 5;
                dosenoite = "-";
            } else {
                dosemanha = "-";
                dosenoite = "-";
            }
        } else if(this.medicine === "lfx-250") {
            if(weight < 4) {
                dosemanha = "-";
                dosenoite = "-";
            } else if(weight < 10) {
                dosemanha = 0.5;
                dosenoite = "-";
            } else if(weight < 16) {
                dosemanha = 1;
                dosenoite = "-";
            } else if(weight < 21) {
                dosemanha = 1.5;
                dosenoite = "-";
            } else if(weight < 26) {
                dosemanha = 2;
                dosenoite = "-";
            } else if(weight < 45) {
                dosemanha = 3;
                dosenoite = "-";
            } else {
                dosemanha = 4;
                dosenoite = "-";
            }
        }
        return this.printDose(dosemanha, dosenoite)
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
        // Calcular quantidade de cps ou frascos por fornecer
        let dM, dT;
        let ffDoseM = this.getFormaFarmaceutica();
        let ffDoseN = this.getFormaFarmaceutica();
        let ffCpsAaviar = this.getFormaFarmaceutica();
        if(typeof doseM === "number" && typeof doseN === "number") {
            dM = (doseM + doseN) * 30;
            dT = (doseM + doseN) * 90;
            if(this.medicine.includes("susp")) {
                // Regra de 3 simples (Total de ml * 1/100 ml) em que 1 é frasco e 100, o seu volume;
                dM = Math.ceil((doseM + doseN) * 30 / 100);
                dT = Math.ceil((doseM + doseN) * 90 / 100); 
                ffCpsAaviar = "frasco(s) de <br> 100 ml";
            }
        } else if(typeof doseM === "number" && typeof doseN !== "number") {
            dM = doseM * 30;
            dT = doseM * 90;
            ffDoseN = "";
            if(this.medicine.includes("susp")) {
                // Regra de 3 simples (Total de ml * 1/100 ml) em que 1 é frasco e 100, o seu volume;
                dM = Math.ceil(doseM * 30 / 100);
                dT = Math.ceil(doseM * 90 / 100); 
                ffCpsAaviar = "frasco(s) de <br> 100 ml";
            }
        } else if(typeof doseM !== "number" && typeof doseN === "number") {
            dM = doseN * 30;
            dT = doseN * 90;
            ffDoseM = "";
            if(this.medicine.includes("susp")) {
                // Regra de 3 simples (Total de ml * 1/100 ml) em que 1 é frasco e 100, o seu volume;
                dM = Math.ceil(doseN * 30 / 100);
                dT = Math.ceil(doseN * 90 / 100); 
                ffCpsAaviar = "frasco(s) de <br> 100 ml";
            }
        } else if(doseManha === "-" && doseNoite === "-"){
            return '<p class="doser__section__note">Ver <b>Notas e Precauções</b>.</p>';
        }
        return `<table class="table table--grayscale table--layout-fixed table--no-margin-b">
            <thead class="table__header table__header--bg-color-grayscale">
                <tr class="--border-t">
                    <th class="table__cell">Dose-manhã</th> <th class="table__cell">Dose-noite</th>
                </tr>
            </thead>
            <tbody>
                <tr class="--border-t">
                    <td class="table__cell">${doseManha} ${ffDoseM}</td> <td class="table__cell">${doseNoite} ${ffDoseN}</td>
                </tr>
                <tr class="table__header table__header--bg-color-grayscale --border-t">
                    <td class="table__cell">Dispensa mensal</td> <td class="table__cell">Dispensa trimestral</td>
                </tr>
                <tr class="--border-b --border-t">
                    <td class="table__cell">${dM} ${ffCpsAaviar}</td> <td class="table__cell">${dT} ${ffCpsAaviar}</td>
                </tr>                   
            </tbody>
        </table>`
    }
    printDoseDe3hpNaoDFC(inh, doseInh, rifapentina, doseRifapentina) {
        let dMinh = doseInh * 4;
        let dTinh = doseInh * 12;
        let dMRif = doseRifapentina * 4;
        let dTRif = doseRifapentina * 12;
        return `<table class="table table--grayscale table--layout-fixed table--no-margin-b">
        <thead class="table__header table__header--bg-color-grayscale">
            <tr class="--border-t">
                <th class="table__cell">${inh}</th> <th class="table__cell">${rifapentina}</th>
            </tr>
        </thead>
        <tbody>
            <tr class="--border-t">
                <td class="table__cell">${doseInh} cp(s)/semana</td> <td class="table__cell">${doseRifapentina} cp(s)/semana</td>
            </tr>
            <tr class="table__header table__header--bg-color-grayscale --border-t">
                <td class="table__cell">Dispensa mensal</td> <td class="table__cell">Dispensa trimestral</td>
            </tr>
            <tr class="--border-b --border-t">
                <td class="table__cell">Isoniazida: ${dMinh} cp(s), <br> Rifapentina: ${dMRif} cp(s)</td> 
                <td class="table__cell">Isoniazida: ${dTinh} cp(s), <br> Rifapentina: ${dTRif} cp(s)</td>
            </tr>                   
        </tbody>
        </table>` 
    }
    printDoseDe3hpDFC(dose) {
        let dM = dose * 4;
        let dT = dose * 12;
        return `<table class="table table--grayscale table--layout-fixed table--no-margin-b">
        <thead class="table__header table__header--bg-color-grayscale">
            <tr class="--border-t">
                <th colspan="2" class="table__cell">Isoniazida/Rifapentina 300 mg/300 mg Comp. (3HP em DFC)</sup></th>
            </tr>
        </thead>
        <tbody>
            <tr class="--border-t">
                <td colspan="2" class="table__cell">${dose} cp(s)/semana</td>
            </tr>
            <tr class="table__header table__header--bg-color-grayscale --border-t">
                <td class="table__cell">Dispensa mensal</td> <td class="table__cell">Dispensa trimestral</td>
            </tr>
            <tr class="--border-b --border-t">
                <td class="table__cell">${dM} cp(s)</td> <td class="table__cell">${dT} cp(s)</td>
            </tr>                   
        </tbody>
        </table>` 
    }
    printDoseDe3hpDelicado(inh, doseInh, rifapentina, doseRifapentina) {
        let dMinh300 = 1 * 4;
        let dTinh300 = 1 * 12;
        let dMinh100 = 2 * 4;
        let dTinh100 = 2 * 12;
        let dMRif = doseRifapentina * 4;
        let dTRif = doseRifapentina * 12;
        return `<table class="table table--grayscale table--layout-fixed table--no-margin-b">
        <thead class="table__header table__header--bg-color-grayscale">
            <tr class="--border-t">
                <th class="table__cell">${inh}</th> <th class="table__cell">${rifapentina}</th>
            </tr>
        </thead>
        <tbody>
            <tr class="--border-t">
                <td class="table__cell">${doseInh} cp(s)/semana</td> <td class="table__cell">${doseRifapentina} cp(s)/semana</td>
            </tr>
            <tr class="table__header table__header--bg-color-grayscale --border-t">
                <td class="table__cell">Dispensa mensal</td> <td class="table__cell">Dispensa trimestral</td>
            </tr>
            <tr class="--border-b --border-t">
                <td class="table__cell">
                    Isoniazida 300mg: ${dMinh300} cp(s), <br> Isoniazida 100mg: ${dMinh100} cp(s), <br> Rifapentina: ${dMRif} cp(s)
                </td> 
                <td class="table__cell">
                    Isoniazida 300mg: ${dTinh300} cp(s), <br> Isoniazida 100mg: ${dTinh100} cp(s), <br> Rifapentina: ${dTRif} cp(s)
                </td>
            </tr>                   
        </tbody>
        </table>` 
    }
}
let alertaDePesoMinimo, doseOutput, notasOutput;
function inicializarVariaveis() {
    alertaDePesoMinimo = document.querySelector(".doser__min-weight-alert");
    doseOutput = document.querySelector(".doser__section__dose");
    notasOutput = document.querySelector(".doser__section__note");
}
function limparDoseEnotas() {
    doseOutput.textContent = "";
    notasOutput.textContent = "";
}
function limparAlertaSobrePesoMinimo() {
    alertaDePesoMinimo.textContent = "";
    alertaDePesoMinimo.classList.remove("--open");
}
function instanciarDarv() {
    const peso = document.querySelector(".doser__input--weight").value;
    if(peso !== "" && peso < 3) {
        alertaDePesoMinimo.textContent = "O peso não deve ser menor que 3.";
        alertaDePesoMinimo.classList.add("--open");
        limparDoseEnotas();
    } else if(peso !== "" && peso >= 3) {
        limparAlertaSobrePesoMinimo();
        limparDoseEnotas();
        const farmacos = document.querySelectorAll(".doser__select__option");
        let farmacoSelecionado;
        for (const farmaco of farmacos) {
            if(farmaco.matches(".--selected")) {
                farmacoSelecionado = farmaco;
            }
        }
        // Se não for option de placeholder
        if(farmacoSelecionado.dataset.farmaco) {
            farmacoSelecionado = farmacoSelecionado.dataset.farmaco;
            let doseador = new Darv(peso, farmacoSelecionado);
            doseOutput.innerHTML = doseador.determinarDose();
            notasOutput.innerHTML = doseador.getNotasEprecaucoes();
        }
    } else {
        limparAlertaSobrePesoMinimo();
        limparDoseEnotas();
    }
}
window.addEventListener("load", () => {
    inicializarVariaveis();
    // Input && Click Events Targets
    const inputEventTarget = document.querySelector(".doser__input--weight");
    const clickEventTargets = document.querySelectorAll(".doser__select__option, .header__main-menu__btn");
    inputEventTarget.addEventListener("input", instanciarDarv);
    clickEventTargets.forEach( target => {
        target.addEventListener("click", instanciarDarv);
    });
});