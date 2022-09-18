import teste from './json/questoes.json' assert {type: "json"}

const listaFinal = {
    questoes: [],
    respsotas: []
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

function questaoAleatoria(array) {

    const index = Math.floor(Math.random() * array.length)

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

function clickInicio(event) {
    event.preventDefault()

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
                    if (radioElement[i].value == questao.resposta[0]) {
                        console.log(true)
                    }else{
                        console.log(false)
                    }
                }else{
                    if (radioElement[i].value == questao.resposta) {
                        console.log(true)
                    } else {
                        console.log(false)
                    }
                }
            }
        }
    }

    questaoAleatoria(teste)
}

const inicio = document.querySelector("#form-inicio")

inicio.addEventListener('submit', clickInicio)
