// Alunos: Jurandi Riqueti Junior e Arthur David Calminati

import teste from './json/questoes.json' assert {type: "json"}
import imagens from './json/img.json' assert {type: "json"}

const listaFinal = {
    resultado: [],
    selecionado: [],
    resposta: []
}

const numeroQuestao = teste.length
let questao

// divs principais
const divInicio = document.querySelector("#inicio")
const divQuestoes = document.querySelector("#questoes")
const divLista = document.querySelector("#lista")

// divs alternativas
const divA = document.querySelector("#div-a")
const divB = document.querySelector("#div-b")
const divC = document.querySelector("#div-c")
const divD = document.querySelector("#div-d")
const divE = document.querySelector("#div-e")

// div resposta texto
const divTexto = document.querySelector("#div-escrever")
const texto = document.querySelector("#texto")

// paragrafos alternativas
const pA = document.querySelector("#questao-alternativa-letra-a")
const pB = document.querySelector("#questao-alternativa-letra-b")
const pC = document.querySelector("#questao-alternativa-letra-c")
const pD = document.querySelector("#questao-alternativa-letra-d")
const pE = document.querySelector("#questao-alternativa-letra-e")

// verdadeiro falso
const pV = document.querySelector("#letra-a-v")
const pF = document.querySelector("#letra-b-f")
const valorV = document.querySelector("#letra-a")
const valorF = document.querySelector("#letra-b")

// referencias
const divRef = document.querySelector("#questao-ref")
const aRef = document.querySelector("#link-ref")

// radio button
const radioElement = document.getElementsByName("opcoes")

// lista final
const tbody = document.querySelector("#tbody")

const imgFundo = document.querySelector("#imgFundo")

function questaoAleatoria(array) {

    const index = Math.floor(Math.random() * array.length)
    const indexImg = Math.floor(Math.random() * imagens.length)

    imgFundo.src = imagens[indexImg]

    questao = array.splice(index, 1)[0]

    let questaoCorpo = document.querySelector("#questao-corpo")

    if (questao != undefined) {
        questaoCorpo.innerHTML = questao.pergunta

        divA.classList.add("d-none")
        divB.classList.add("d-none")
        divC.classList.add("d-none")
        divD.classList.add("d-none")
        divE.classList.add("d-none")
        pV.innerHTML = "Letra A"
        pF.innerHTML = "Letra B"
        divTexto.classList.add("d-none")
        texto.value = " "
        valorV.value = "a"
        valorF.value = "b"

        for (let i = 0; i < radioElement.length; i++) {
            radioElement[i].checked = false
        }

        referencia(questao)

        switch (questao.type) {
            case 'escrever':
                questaoEscrever(questao)
                break;
            case 'assinalar':
                questaoAssinalar(questao)
                break;
            case 'v-f':
                questaoVF(questao)
                break;
        }
    }
}

function questaoEscrever(questao) {
    divTexto.classList.remove("d-none")
}

function questaoAssinalar(questao) {
    divA.classList.remove("d-none")
    pA.innerHTML = questao.a

    divB.classList.remove("d-none")
    pB.innerHTML = questao.b

    divC.classList.remove("d-none")
    pC.innerHTML = questao.c

    divD.classList.remove("d-none")
    pD.innerHTML = questao.d

    if (Object.keys(questao).indexOf("e") > -1) {
        divE.classList.remove("d-none")
        pE.innerHTML = questao.e
    } else {
        divE.classList.add("d-none")
        pE.innerHTML = " "
    }
}

function questaoVF() {
    divA.classList.remove("d-none")
    divB.classList.remove("d-none")
    pV.innerHTML = "Verdadeiro"
    pF.innerHTML = "Falso"
    pA.innerHTML = null
    pB.innerHTML = null
    valorV.value = "v"
    valorF.value = "f"
}

function referencia(questao) {
    if (Object.keys(questao).indexOf("ref") > -1) {
        divRef.classList.remove("d-none")
        aRef.innerHTML = questao.ref
        aRef.href = questao.ref
    } else {
        divRef.classList.add("d-none")
    }
}

function fazerTabela() {
    for (let i = 0; i < listaFinal.resultado.length; i++) {
        let tr = tbody.insertRow()

        let td_resultado = tr.insertCell()
        let td_selecionado = tr.insertCell()
        let td_resposta = tr.insertCell()

        td_resultado.innerHTML = listaFinal.resultado[i]
        td_resposta.innerHTML = listaFinal.resposta[i]
        td_selecionado.innerHTML = listaFinal.selecionado[i]
    }
}

function clickInicio(event) {
    event.preventDefault()

    console.log(teste.length)
    divInicio.classList.add("d-none")
    divQuestoes.classList.remove("d-none")

    const formulario = document.querySelector("#formulario")
    formulario.addEventListener('submit', clickQuestao)
    questaoAleatoria(teste)
}

function clickQuestao(event) {
    event.preventDefault()

    if (questao.type == "assinalar" || questao.type == "v-f") {
        for (let i = 0; i < radioElement.length; i++) {
            if (radioElement[i].checked) {
                if (questao.type == "v-f") {
                    listaFinal.selecionado.push(radioElement[i].value)
                    listaFinal.resposta.push(questao.resposta[1])
                    if (radioElement[i].value == questao.resposta[0]) {
                        listaFinal.resultado.push("Correto")
                    } else {
                        listaFinal.resultado.push("Incorreto")
                    }
                } else {
                    listaFinal.selecionado.push(radioElement[i].value)
                    listaFinal.resposta.push(questao.resposta)
                    if (radioElement[i].value == questao.resposta) {
                        listaFinal.resultado.push("Correto")
                    } else {
                        listaFinal.resultado.push("Incorreto")
                    }
                }
            }
        }
    }else{
        listaFinal.selecionado.push(texto.value)
        listaFinal.resposta.push(questao.resposta)
        listaFinal.resultado.push("#")
    }

    if (teste.length > 8) {
        console.log(teste.length)
        questaoAleatoria(teste)
    } else {
        fazerTabela()
        divLista.classList.remove("d-none")
        divQuestoes.classList.add("d-none")
    }
}

const inicio = document.querySelector("#form-inicio")

inicio.addEventListener('submit', clickInicio)

const refresh = document.querySelector("#refresh")

refresh.addEventListener("click", () => {
    location.reload()
})
