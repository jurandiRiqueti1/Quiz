let questoes = [1,2,3,4,5,6,7,8,9,10]

function questaoAleatoria(questoes) {
    let pergunta = Math.floor(Math.random() * questoes.length)
    questoes.splice(pergunta, 1)
    return {
        questao: pergunta,
        array: questoes
    }
}

console.log(questaoAleatoria(questoes))