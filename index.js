import teste from './json/questoes.json' assert {type: "json"}

function questaoAleatoria(array) {

    const index = Math.floor(Math.random() * array.length)

    const questao = array.splice(index, 1)[0]

    let questaoCorpo = document.querySelector("#questao-corpo")

    if (questao != undefined) {
        switch (questao.type) {
            case 'escrever':
                questaoCorpo.innerHTML = questao.pergunta
                referencia(questao)
                break;
            case 'assinalar':
                questaoCorpo.innerHTML = questao.pergunta
                referencia(questao)
                break;
            case 'v-f':
                questaoCorpo.innerHTML = questao.pergunta
                referencia(questao)
                break;
        }
    }
}

function referencia(questao){
    let divRef = document.querySelector("#questao-ref")
    let aRef = document.querySelector("#link-ref")

    if(Object.keys(questao).indexOf("ref") > -1){
        divRef.classList.remove("d-none")
        aRef.innerHTML = questao.ref
        aRef.href = questao.ref
    }else{
        divRef.classList.add("d-none")
    }
}

function clickInicio(event) {
    event.preventDefault()

    let divInicio = document.querySelector("#inicio")
    let divQuestoes = document.querySelector("#questoes")

    divInicio.classList.add("d-none")
    divQuestoes.classList.remove("d-none")

    
    const formulario = document.querySelector("#formulario")
    formulario.addEventListener('submit', clickQuestao)
    questaoAleatoria(teste)
}

function clickQuestao(event) {
    event.preventDefault()

    questaoAleatoria(teste)
}

const inicio = document.querySelector("#form-inicio")

inicio.addEventListener('submit', clickInicio)
