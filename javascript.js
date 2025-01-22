// Seleciona o elemento onde o resultado será exibido
const resultado = document.getElementById('resultado');

// Variável para armazenar a expressão atual
let expressao = '';

// Função para atualizar o resultado na tela
function atualizarResultado() {
    resultado.innerText = expressao || '0'; // Se a expressão estiver vazia, mostra 0
}

// Função para adicionar um número ou operador à expressão
function adicionarValor(valor) {
    expressao += valor; // Adiciona o valor à expressão
    atualizarResultado(); // Atualiza o resultado na tela
}

// Função para calcular o resultado da expressão
function calcular() {
    try {
        // Substitui 'X' por '*' para multiplicação
        expressao = expressao.replace(/X/g, '*');

        // Se a expressão contém '%', calcula a porcentagem
        if (expressao.includes('%')) {
            const partes = expressao.split('%');
            const numero = eval(partes[0]); // Avalia a parte antes do '%'
            const porcentagem = numero / 100; // Converte para decimal
            expressao = partes[1] ? eval(partes[1]) * porcentagem : porcentagem; // Se houver algo após '%', multiplica
        } else {
            expressao = eval(expressao); // Avalia a expressão normalmente
        }

        atualizarResultado(); // Atualiza o resultado na tela
    } catch (error) {
        resultado.innerText = 'Erro'; // Se houver um erro, mostra 'Erro'
        expressao = ''; // Limpa a expressão
    }
}

// Função para limpar a expressão
function limpar() {
    expressao = ''; // Limpa a expressão
    atualizarResultado(); // Atualiza o resultado na tela
}

// Adiciona eventos de clique aos botões
document.querySelectorAll('.botao').forEach(botao => {
    botao.addEventListener('click', () => {
        const valor = botao.innerText; // Obtém o texto do botão clicado
        if (valor === '=') {
            calcular(); // Se o botão for '=', chama a função calcular
        } else if (valor === 'C') {
            limpar(); // Se o botão for 'C', chama a função limpar
        } else {
            adicionarValor(valor); // Para outros botões, adiciona o valor à expressão
        }
    });
});
