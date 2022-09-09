import teste from './json/teste.json' assert {type: "json"}

const questoes = ['q1','q2','q3','q4']

function questaoAleatoria(array) {

    const index = Math.floor(Math.random() * array.length)

    const questao = array.slice(index, index+1)[0]

    return {
        questao: questao,
        array: array
    }
}

console.log(teste)

console.log(questaoAleatoria(questoes))