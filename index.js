import teste from './json/teste.json' assert {type: "json"}

function questaoAleatoria(array) {

    const index = Math.floor(Math.random() * array.length)

    const questao = array.slice(index, index+1)[0]

    return {
        questao: questao,
        array: array
    }
}
