"use strict";
var peso, arvs, doseEposologiaOutput, recomendacaoOutput;
class Darv {
    constructor(e, a) {
        this.peso = e,
        this.arv = a
    }
    get retornarFormaFarmaceutica() {
        let e;
        return this.arv.includes("xpe") || this.arv.includes("susp") ? "ml" : "LPV/r-40-10mg" === this.arv ? "saquetas" : "cp(s)"
    }
    get retornarEmbalagem() {
        let e;
        return "LPV/r-xpe" === this.arv ? "frascos de 60 ml para" : "CTZ-susp" === this.arv || "AZT-xpe" === this.arv ? "frascos de 100 ml para" : "LPV/r-40-10mg" === this.arv ? "saquetas para" : "comprimidos para"
    }
    mostrarRecomendacao() {
        "ABC" === this.arv && this.peso >= 25 || "ABC/3TC-60-30mg" === this.arv && this.peso >= 25 || "ABC/3TC-120-60mg" === this.arv && this.peso >= 25 ? recomendacaoOutput.innerHTML = 'Para peso &ge; 25 kg, recomenda-se o "<b>ABC/3TC 600 mg/300 mg Comp.</b>".' : "ABC/3TC-600-300mg" === this.arv && this.peso < 25 ? recomendacaoOutput.innerHTML = 'Para peso &lt; 25 kg, recomenda-se o "<b>ABC/3TC 120 mg/60 mg Comp.</b>" ou "<b>ABC/3TC 60 mg/30 mg Comp.</b>".' : "LPV/r-40-10mg" === this.arv && this.peso >= 20 || "LPV/r-xpe" === this.arv && this.peso >= 20 ? recomendacaoOutput.innerHTML = 'Para peso &ge; 20 kg, recomenda-se o "<b>LPV/r 100 mg/25 mg Comp.</b>" ou "<b>LPV/r 200 mg/50 mg Comp.</b>".' : "ABC/3TC-LPV/r" === this.arv ? this.peso >= 20 && this.peso < 25 ? recomendacaoOutput.innerHTML = 'Para peso &ge; 20 kg, recomenda-se o "<b>ABC/3TC 120 mg/60 mg Comp.</b>" e o "<b>LPV/r 100 mg/25 mg Comp.</b>" ou "<b>LPV/r 200 mg/50 mg Comp.</b>".' : this.peso >= 25 ? recomendacaoOutput.innerHTML = 'Para peso &gt; 25 kg, recomenda-se o "<b>ABC/3TC 600 mg/300 mg Comp.</b>" e o "<b>LPV/r 100 mg/25 mg Comp.</b>" ou "<b>LPV/r 200 mg/50 mg Comp.</b>".' : recomendacaoOutput.innerHTML = "" : "LPV/r-100-25mg" === this.arv && this.peso >= 10 || "LPV/r-200-50mg" === this.arv && this.peso >= 14 ? recomendacaoOutput.innerHTML = `Os comprimidos n\xe3o podem ser partidos, esmagados ou mastigados, pois a efic\xe1cia reduz muito se assim forem manipulados.` : "LPV/r-100-25mg" === this.arv && this.peso < 10 ? recomendacaoOutput.innerHTML = `Para peso &lt; 10 kg, recomenda-se o "<b>LPV/r 40 mg/10 mg C\xe1ps./Saquetas</b>" ou "<b>LPV/r 80 mg/20 mg/ml Xarope</b>".` : "LPV/r-200-50mg" === this.arv ? this.peso < 10 ? recomendacaoOutput.innerHTML = `Para peso &lt; 10 kg, recomenda-se o "<b>LPV/r 40 mg/10 mg C\xe1ps./Saquetas</b>" ou "<b>LPV/r 80 mg/20 mg/ml Xarope</b>".` : this.peso < 14 && (recomendacaoOutput.innerHTML = `Para peso &lt; 14 kg, recomenda-se o "<b>LPV/r 100 mg/25 mg Comp.</b>" ou "<b>LPV/r 40 mg/10 mg C\xe1ps./Saquetas</b>".`) : "TDF/3TC/DTG" === this.arv && this.peso < 30 ? recomendacaoOutput.innerHTML = `A Dose Fixa Combinada (DFC) de "<b>TDF/3TC/DTG 300/300/50 mg Comp.</b>" est\xe1 indicada apenas para crian\xe7as com peso &ge; 30 kg.` : "pDTG-10mg" === this.arv && this.peso >= 20 ? recomendacaoOutput.innerHTML = 'Para peso &ge; 20 kg, recomenda-se o "<b>DTG 50 mg Comp.</b>".' : "DTG-50mg" === this.arv && this.peso < 20 ? recomendacaoOutput.innerHTML = 'Para peso &lt; 20 kg, recomenda-se o "<b>pDTG 10 mg Comp.</b>".' : "pDTG-10mg" === this.arv && this.peso < 20 || "DTG-50mg" === this.arv && this.peso >= 20 ? recomendacaoOutput.innerHTML = `<strong>Importante:</strong> <b>(1)</b> N\xe3o \xe9 recomendado tomar o DTG ao mesmo tempo que as Vitaminas, Sulfato Ferroso, Fenito\xedna ou Anti\xe1cidos, pois reduzem a concentra\xe7\xe3o plasm\xe1tica do DTG. Nestes casos, recomenda-se tomar o DTG no m\xednimo 2 horas antes ou 6 horas depois da toma desses medicamentos. <b>(2)</b>&nbsp;Pacientes que estiverem a usar a Rifampicina (RIF) devem ajustar a dose de DTG (DTG 12/12 horas)</b> durante o tempo que recebem RIF e por mais 2 semanas. Depois passam a tomar o DTG apenas 1 vez/dia. ` : "AZT-xpe" === this.arv && this.peso >= 14 ? recomendacaoOutput.innerHTML = `O "<b>AZT 10 mg/ml Xarope</b>" \xe9 recomendado para crian\xe7as com peso &lt; 14 kg.` : "Duovir-ped" === this.arv && this.peso >= 25 ? recomendacaoOutput.innerHTML = 'Para peso &ge; 25 kg, recomenda-se o "<b>AZT/3TC 300 mg/150 mg Comp.</b>".' : "Duovir-adult" === this.arv && this.peso < 14 ? recomendacaoOutput.innerHTML = 'Para peso &lt; 14 kg, recomenda-se o "<b>AZT/3TC 60 mg/30 mg Comp.</b>".' : "DuovirN-ped" === this.arv && this.peso >= 25 ? recomendacaoOutput.innerHTML = 'Para peso &ge; 20 kg, recomenda-se o "<b>AZT/3TC/NVP 300/150/200 mg Comp.</b>"' : "DuovirN-adult" === this.arv && this.peso < 14 ? recomendacaoOutput.innerHTML = 'Para peso &lt; 14 kg, recomenda-se o "<b>AZT/3TC/NVP 60/30/50 mg Comp.</b>".' : "TDF/3TC" === this.arv && this.peso < 30 ? recomendacaoOutput.innerHTML = `A Dose Fixa Combinada (DFC) de "<b>TDF/3TC 300 mg/300 mg Comp.</b>" est\xe1 indicada apenas para pacientes com peso &ge; 35 kg. Constitui o f\xe1rmaco de elei\xe7\xe3o para Profilaxia Pr\xe9-Exposi\xe7\xe3o (PrEP).` : "TDF/3TC/EFV-400" === this.arv && this.peso < 30 ? recomendacaoOutput.innerHTML = `A Dose Fixa Combinada (DFC) de "<b>TDF/3TC/EFV 300/300/400 mg Comp.</b>" est\xe1 indicada apenas para crian\xe7as com peso &ge; 30 kg.` : "TDF/3TC/EFV-600" === this.arv && this.peso < 35 ? recomendacaoOutput.innerHTML = `O "<b>TDF/3TC/EFV 300/300/600 mg Comp.</b>" s\xf3 pode ser tomado por pacientes com peso &ge; 35 kg.` : "ATV/r" === this.arv ? this.peso < 25 ? recomendacaoOutput.innerHTML = `O "<b>ATV/r 300 mg/100 mg Comp.</b>" s\xf3 pode ser tomado por pacientes com peso &ge; 25 kg.` : recomendacaoOutput.innerHTML = `<strong>Importante</strong>: Pacientes que estiverem a usar a Rifampicina (RIF) devem <b>substituir o ATV/r por DTG e ajustar a dose de DTG (DTG 12/12 horas)</b> durante o tempo que recebem RIF e por mais 2 semanas.` : "RAL-25" === this.arv && this.peso >= 25 ? recomendacaoOutput.innerHTML = 'Para peso &ge; 25 kg, recomenda-se o "<b>RAL 400 mg Comp.</b>".' : "RAL-400" === this.arv && this.peso < 25 ? recomendacaoOutput.innerHTML = 'Para peso &lt; 25 kg, recomenda-se o "<b>RAL 25 mg Comp.</b>".' : "RTV-25" === this.arv && this.peso < 10 || "RTV-100-superboosting" === this.arv && this.peso < 10 ? recomendacaoOutput.innerHTML = `O <b>RTV isolado</b> est\xe1 indicado apenas para crian\xe7as com peso &ge; 10 kg, que sejam capazes de o deglutir inteiro, pois <strong>n\xe3o pode ser quebrado, esmagado, nem dissolvido em liquidos ou alimentos</strong>.` : "RTV-25" === this.arv && this.peso < 25 || "RTV-100-superboosting" === this.arv && this.peso >= 10 ? recomendacaoOutput.innerHTML = `O <b>RTV isolado</b> deve ser usado para fazer a <b>potencia\xe7\xe3o de LPV/r</b> em crian\xe7as co-infectadas (TB/HIV sens\xedvel) em regime contendo LPV/r. <strong>N\xe3o pode ser quebrado, esmagado, nem dissolvido em liquidos ou alimentos</strong>.` : "RTV-25" === this.arv && this.peso >= 25 ? recomendacaoOutput.innerHTML = 'Para peso &ge; 25 kg, recomenda-se o "<b>RTV 100 mg Comp.</b>".' : "RTV-100-3alinha" === this.arv && this.peso < 14 ? recomendacaoOutput.innerHTML = `O "<b>RTV 100 mg Comp." como adjuvante de DRV (Darunavir) na 3\xaa linha</b>, est\xe1 indicado apenas para crian\xe7as com peso &ge; 14 kg.` : this.arv.includes("drv") && this.peso < 14 ? recomendacaoOutput.innerHTML = `O "<b>Darunavir</b>" est\xe1 indicado apenas para crian\xe7as com peso &ge; 14 kg.` : "drv-75" === this.arv && this.peso >= 30 || "drv-150" === this.arv && this.peso >= 30 ? recomendacaoOutput.innerHTML = 'Para peso &ge; 30 kg, recomenda-se o "<b>DRV 600 mg Comp.</b>".' : "drv-75" === this.arv && this.peso >= 25 && this.peso < 30 ? recomendacaoOutput.innerHTML = 'Para peso &ge; 25 kg, recomenda-se o "<b>DRV 150 mg Comp.</b>" ou "<b>DRV 600 mg Comp.</b>".' : "drv-75" === this.arv && this.peso >= 25 && this.peso < 30 ? recomendacaoOutput.innerHTML = 'Para peso &ge; 25 kg, recomenda-se o "<b>DRV 150 mg Comp.</b>" ou "<b>DRV 600 mg Comp.</b>".' : "drv-600" === this.arv && this.peso < 25 ? recomendacaoOutput.innerHTML = `Para peso no intervalo de 14 - 24.9 kg, recomenda-se o "<b>DRV 150 mg Comp.</b>" ou "<b>DRV 75 mg Comp.</b>". <br/> Neste caso, usar o "<b>DRV 600 mg Comp.</b>" apenas na aus\xeancia destes dois.` : "CTZ-susp" === this.arv && this.peso >= 20 ? recomendacaoOutput.innerHTML = 'Para peso &ge; 20 kg, recomenda-se o "<b>Cotrimoxazol 480 mg Comp.</b>".' : "isoniazida-300" === this.arv && this.peso < 25 ? recomendacaoOutput.innerHTML = 'Para peso &lt; 25 kg, recomenda-se "<b>Isoniazida 100 mg Comp.</b>".' : "levofloxacina-100" === this.arv && this.peso < 26 || "levofloxacina-250" === this.arv && this.peso >= 4 ? recomendacaoOutput.innerHTML = `<strong>Importante:</strong> Se o caso fonte de Tuberculose Multi-resistente tiver resist\xeancia comprovada a Fluroquinolonas, o Tratamento Preventivo de Tuberculose (TPT) com Levofloxacina n\xe3o deve ser oferecido.` : "levofloxacina-100" === this.arv && this.peso >= 26 ? recomendacaoOutput.innerHTML = 'Para peso &ge; 26 kg, recomenda-se "<b>Levofloxacina 250 mg Comp.</b>".' : "levofloxacina-250" === this.arv && this.peso < 4 ? recomendacaoOutput.innerHTML = 'Para peso &lt; 4 kg, recomenda-se "<b>Levofloxacina 100 mg Comp.</b>".' : "piridoxina-50" === this.arv && this.peso < 5 ? recomendacaoOutput.innerHTML = 'Para peso &lt; 5 kg, recomenda-se "<b>Piridoxina 25 mg Comp.</b>".' : recomendacaoOutput.innerHTML = ""
    }
    mostrarDose(e, a) {
        if ("&minus;" === e && "&minus;" === a)
            doseEposologiaOutput.innerHTML = `
            <table>
                <thead>
                    <tr><th>Dose-manh\xe3</th> <th>Dose-noite</th></tr>
                </thead>
                <tbody>
                    <tr><td>${e}</td> <td>${a}</td></tr>
                </tbody>
            </table>
            `;
        else if (this.arv.includes("piridoxina")) {
            let s, o, r = "30 dias", t = "90 dias";
            "1/2 cp, 3 vezes por semana" === e ? (s = 6,
            o = 18,
            r = "4 semanas",
            t = "12 semanas") : "1/2 cp por dia" === e ? (s = 15,
            o = 45) : "1 cp por dia" === e ? (s = 30,
            o = 90) : "2 cp(s) por dia" === e && (s = 60,
            o = 180),
            doseEposologiaOutput.innerHTML = `<table>
                <tr>
                    <td colspan="2">${e}</td>
                </tr>
                <tr class="l3">
                    <th colspan="2">N\xba de comprimidos para</th>
                </tr>
                <tr> 
                    <th>${r}</th> <th>${t}</th> 
                </tr>
                <tr> 
                    <td>${s}</td> <td>${o}</td> 
                </tr>
                
            </table>`
        } else {
            let i = this.retornarFormaFarmaceutica
              , n = this.retornarFormaFarmaceutica
              , m = e
              , p = a;
            "&minus;" === e ? (i = "&minus;",
            m = 0) : "1/4" === e && (m = .25),
            "&minus;" === a && (n = "&minus;",
            p = 0);
            let $ = (m + p) * 30
              , d = (m + p) * 90;
            if ("LPV/r-xpe" === this.arv || "CTZ-susp" === this.arv || "AZT-xpe" === this.arv) {
                let c = 100;
                "LPV/r-xpe" === this.arv && (c = 60),
                $ = Math.ceil($ / c),
                d = Math.ceil(d / c)
            }
            doseEposologiaOutput.innerHTML = `<table>
                <thead>
                    <tr> <th>Dose-manh\xe3</th> <th>Dose-noite</th> </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${e} <br/> ${i}</td> 
                        <td>${a} <br/> ${n}</td>
                    </tr>
                </tbody>
                <thead>
                    <tr class="l3"> 
                        <th colspan="2">N\xba de ${this.retornarEmbalagem}:</th> 
                    </tr>
                    <tr> <th>30 dias</th> <th>90 dias</th> </tr>
                </thead>
                <tbody>
                    <tr> 
                        <td>${$}</td><td>${d}</td>
                    </tr>
                </tbody> 
            </table>
            `
        }
        this.mostrarRecomendacao()
    }
    calcularDose() {
        let e, a, s = this.peso;
        if ("ABC" === this.arv || "ABC/3TC-60-30mg" === this.arv)
            e = s < 6 ? 2 : s < 10 ? 3 : s < 14 ? 4 : s < 20 ? 5 : s < 25 ? 6 : "&minus;";
        else if ("ABC/3TC-120-60mg" === this.arv)
            e = s < 6 ? 1 : s < 10 ? 1.5 : s < 14 ? 2 : s < 20 ? 2.5 : s < 25 ? 3 : "&minus;";
        else if ("ABC/3TC-600-300mg" === this.arv)
            s < 25 ? e = "&minus;" : s >= 25 && (e = 1);
        else if ("LPV/r-40-10mg" === this.arv)
            s < 6 ? (e = 2,
            a = 2) : s < 10 ? (e = 3,
            a = 3) : s < 14 ? (e = 4,
            a = 4) : s < 20 ? (e = 5,
            a = 5) : (e = "&minus;",
            a = "&minus;");
        else if ("LPV/r-xpe" === this.arv)
            s < 4 ? (e = 1,
            a = 1) : s < 10 ? (e = 1.5,
            a = 1.5) : s < 14 ? (e = 2,
            a = 2) : s < 20 ? (e = 2.5,
            a = 2.5) : (e = "&minus;",
            a = "&minus;");
        else if ("LPV/r-100-25mg" === this.arv)
            s < 10 ? (e = "&minus;",
            a = "&minus;") : s < 14 ? (e = 2,
            a = 1) : s < 25 ? (e = 2,
            a = 2) : (e = 3,
            a = 3);
        else if ("LPV/r-200-50mg" === this.arv)
            s < 14 ? (e = "&minus;",
            a = "&minus;") : s < 25 ? (e = 1,
            a = 1) : s < 30 ? (e = 2,
            a = 1) : (e = 2,
            a = 2);
        else if ("ABC/3TC-LPV/r" === this.arv)
            s < 6 ? (e = 2,
            a = 2) : s < 10 ? (e = 3,
            a = 3) : s < 14 ? (e = 4,
            a = 4) : s < 20 ? (e = 5,
            a = 5) : s >= 20 && (e = "&minus;",
            a = "&minus;");
        else if ("TDF/3TC/DTG" === this.arv)
            e = s < 30 ? "&minus;" : 1;
        else if ("pDTG-10mg" === this.arv)
            e = s < 6 ? .5 : s < 10 ? 1.5 : s < 14 ? 2 : s < 20 ? 2.5 : "&minus;";
        else if ("DTG-50mg" === this.arv)
            e = s < 20 ? "&minus;" : 1;
        else if ("AZT-xpe" === this.arv)
            s < 6 ? (e = 6,
            a = 6) : s < 10 ? (e = 9,
            a = 9) : s < 14 ? (e = 12,
            a = 12) : (e = "&minus;",
            a = "&minus;");
        else if ("Duovir-ped" === this.arv || "DuovirN-ped" === this.arv)
            s < 6 ? (e = 1,
            a = 1) : s < 10 ? (e = 1.5,
            a = 1.5) : s < 14 ? (e = 2,
            a = 2) : s < 20 ? (e = 2.5,
            a = 2.5) : s < 25 ? (e = 3,
            a = 3) : (e = "&minus;",
            a = "&minus;");
        else if ("Duovir-adult" === this.arv || "DuovirN-adult" === this.arv)
            s < 14 ? (e = "&minus;",
            a = "&minus;") : s < 25 ? (e = 1,
            a = .5) : (e = 1,
            a = 1);
        else if ("TDF/3TC" === this.arv || "TDF/3TC/EFV-400" === this.arv)
            e = s < 30 ? "&minus;" : 1;
        else if ("TDF/3TC/EFV-600" === this.arv)
            e = s < 35 ? "&minus;" : 1;
        else if ("EFV" === this.arv)
            a = s < 10 ? "&minus;" : s < 14 ? 1 : s < 25 ? 1.5 : 2,
            e = "&minus;";
        else if ("ATV/r" === this.arv)
            e = s < 25 ? "&minus;" : 1;
        else if ("RAL-25" === this.arv)
            s < 6 ? (e = 1,
            a = 1) : s < 10 ? (e = 2,
            a = 2) : s < 14 ? (e = 3,
            a = 3) : s < 20 ? (e = 4,
            a = 4) : s < 25 ? (e = 6,
            a = 6) : (e = "&minus;",
            a = "&minus;");
        else if ("RAL-400" === this.arv)
            s < 25 ? (e = "&minus;",
            a = "&minus;") : (e = 1,
            a = 1);
        else if ("RTV-25" === this.arv)
            s < 10 ? (e = "&minus;",
            a = "&minus;") : s < 14 ? (e = 4,
            a = 4) : s < 25 ? (e = 6,
            a = 6) : (e = "&minus;",
            a = "&minus;");
        else if ("RTV-100-superboosting" === this.arv)
            s < 10 ? (e = "&minus;",
            a = "&minus;") : s < 14 ? (e = 1,
            a = 1) : s < 25 ? (e = 1,
            a = 2) : s < 30 ? (e = 2,
            a = 2) : (e = 3,
            a = 3);
        else if ("RTV-100-3alinha" === this.arv)
            s < 14 ? (e = "&minus;",
            a = "&minus;") : s < 25 ? (e = .5,
            a = .5) : (e = 1,
            a = 1);
        else if ("drv-75" === this.arv)
            s < 14 || s >= 25 ? (e = "&minus;",
            a = "&minus;") : s < 25 && (e = 5,
            a = 5);
        else if ("drv-150" === this.arv)
            s < 14 || s >= 30 ? (e = "&minus;",
            a = "&minus;") : s < 25 ? (e = 2.5,
            a = 2.5) : s < 30 && (e = 3,
            a = 3);
        else if ("drv-600" === this.arv)
            s < 14 ? (e = "&minus;",
            a = "&minus;") : s < 25 ? (e = .5,
            a = .5) : (e = 1,
            a = 1);
        else if ("CTZ-cp" === this.arv)
            e = s < 7 ? "1/4" : s < 10 ? .5 : s < 20 ? 1 : 2;
        else if ("CTZ-susp" === this.arv)
            e = s < 7 ? 2.5 : s < 10 ? 5 : s < 15 ? 7.5 : s < 20 ? 10 : "&minus;";
        else if ("isoniazida-100" === this.arv)
            e = s < 5 ? .5 : s < 10 ? 1 : s < 14 ? 1.5 : s < 20 ? 2 : s < 25 ? 2.5 : 3;
        else if ("isoniazida-300" === this.arv)
            e = s < 25 ? "&minus;" : 1;
        else if ("levofloxacina-100" === this.arv)
            e = s < 4 ? .5 : s < 7 ? 1 : s < 10 ? 1.5 : s < 13 ? 2 : s < 16 ? 3 : s < 19 ? 3.5 : s < 21 ? 4 : s < 24 ? 4.5 : s < 26 ? 5 : "&minus;";
        else if ("levofloxacina-250" === this.arv)
            e = s < 4 ? "&minus;" : s < 10 ? .5 : s < 16 ? 1 : s < 21 ? 1.5 : s < 26 ? 2 : s < 45 ? 3 : 4;
        else if ("piridoxina-25" === this.arv)
            e = s < 5 ? "1/2 cp, 3 vezes por semana" : s < 8 ? "1/2 cp por dia" : s < 15 ? "1 cp por dia" : "2 cp(s) por dia";
        else if ("piridoxina-50" === this.arv) {
            if (s < 5)
                return this.mostrarRecomendacao(),
                !1;
            e = s < 15 ? "1/2 cp, 3 vezes por semana" : "1 cp por dia"
        }
        ("ATV/r" === this.arv || this.arv.startsWith("ABC") || this.arv.startsWith("TDF") || this.arv.startsWith("levofloxacina") || this.arv.includes("DTG") || this.arv.includes("CTZ") || this.arv.includes("isoniazida")) && (a = "&minus;"),
        this.mostrarDose(e, a)
    }
}
const objectoDarv = {
    validarPeso() {
        let e = document.querySelector("p.msg-de-validacao-de-peso")
          , a = ()=>{
            e.innerHTML = "",
            e.classList.remove("on")
        }
        ;
        if ("" != peso.value) {
            if (!(peso.value < 3) && !(peso.value > 45))
                return a(),
                !0;
            e.innerHTML = "O peso deve estar no intervalo de 3 \xe0 45 kg.",
            e.classList.add("on"),
            this.limparCamposDeSaida()
        } else
            a(),
            this.limparCamposDeSaida()
    },
    instanciarClasse() {
        if (this.validarPeso()) {
            let e;
            for (let a of arvs)
                if (a.matches(".selected") && (e = a.dataset.nome,
                a.matches(".placeholder")))
                    return !1;
            let s = new Darv(peso.value,e);
            s.calcularDose(),
            recomendacaoOutput.textContent.length > 0 ? recomendacaoOutput.classList.add("pad-10") : recomendacaoOutput.classList.remove("pad-10")
        }
    },
    limparCamposDeSaida() {
        doseEposologiaOutput.innerHTML = "",
        recomendacaoOutput.innerHTML = "",
        recomendacaoOutput.classList.remove("pad-10")
    }
};
window.addEventListener("load", ()=>{
    peso = document.querySelector("input#peso"),
    arvs = document.querySelectorAll("ul.select li"),
    doseEposologiaOutput = document.querySelector("div.dose"),
    recomendacaoOutput = document.querySelector("p.recomendacao"),
    peso.addEventListener("input", ()=>objectoDarv.instanciarClasse()),
    arvs.forEach(e=>e.addEventListener("click", ()=>objectoDarv.instanciarClasse())),
    abas_do_menu.forEach(e=>{
        e.addEventListener("click", ()=>{
            objectoDarv.instanciarClasse(),
            e.matches("[data-for=arvs]") && objectoDarv.limparCamposDeSaida()
        }
        )
    }
    )
}
);
