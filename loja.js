// CORREÇÃO: Em vez de começar com [1] fixo, lê do localStorage. Se não existir, começa com o ícone ID 1 (padrão gratuito).
let iconesAdquiridos = localStorage.getItem("flashiiIconesComprados") 
    ? JSON.parse(localStorage.getItem("flashiiIconesComprados")) 
    : [1]; 

// Garante que o padrão inicial esteja salvo
if (!localStorage.getItem("flashiiIconesComprados")) {
    localStorage.setItem("flashiiIconesComprados", JSON.stringify(iconesAdquiridos));
}

// ... dentro do seu botão.addEventListener('click', () => { ...
// LOGO APÓS A LINHA: iconesAdquiridos.push(id);
// ADICIONE ISTO PARA SALVAR NO BANCO DO NAVEGADOR:
localStorage.setItem("flashiiIconesComprados", JSON.stringify(iconesAdquiridos)); 

document.addEventListener('DOMContentLoaded', () => {
    const carteira = document.getElementById('carteira-moedas');
    const cards = document.querySelectorAll('.card-icone');

    // CORREÇÃO CENTRAL: Buscar o saldo direto do localStorage toda vez que atualizar a tela
    function obterSaldoAtual() {
        const saldoSalvo = localStorage.getItem("flashiiMoedas");
        return saldoSalvo ? parseInt(saldoSalvo) : 0;
    }

    // Função para renderizar o saldo e os estados dos botões
    function atualizarLoja() {
        // Busca o valor mais recente que o Banco de Questões acabou de salvar
        const saldoMoedas = obterSaldoAtual();
        
        // Atualiza o contador de moedas no HTML da loja
        if (carteira) {
            carteira.textContent = saldoMoedas;
        }

        cards.forEach(card => {
            const id = parseInt(card.getAttribute('data-id'));
            const preco = parseInt(card.getAttribute('data-preco'));
            const botao = card.querySelector('.btn-comprar');

            if (!botao) return;

            // Caso 1: Já possui o ícone
            if (iconesAdquiridos.includes(id)) {
                card.classList.add('adquirido');
                botao.textContent = "Adquirido";
                botao.disabled = true;
                botao.style.backgroundColor = '#4caf50'; // Verde de sucesso
            } 
            // Caso 2: Não tem moedas suficientes
            else if (saldoMoedas < preco) {
                botao.disabled = true;
                botao.style.backgroundColor = '#ccc';
            }
            // Caso 3: Disponível para compra
            else {
                botao.disabled = false;
                botao.style.backgroundColor = '#e64a19'; // Laranja Flashii
                botao.textContent = `${preco} ⚡`;
            }
        });
    }

    // Gerencia o clique nos botões de compra
    cards.forEach(card => {
        const botao = card.querySelector('.btn-comprar');
        if (!botao) return;
        
        botao.addEventListener('click', () => {
            const id = parseInt(card.getAttribute('data-id'));
            const preco = parseInt(card.getAttribute('data-preco'));
            let saldoMoedas = obterSaldoAtual(); // Pega o saldo fresco antes de deduzir

            if (saldoMoedas >= preco && !iconesAdquiridos.includes(id)) {
                // Deduz as moedas do saldo local
                saldoMoedas -= preco;
                
                // Grava imediatamente o novo saldo de volta no localStorage
                localStorage.setItem("flashiiMoedas", saldoMoedas);
                
                // Adiciona o item ao inventário
                iconesAdquiridos.push(id);
                
                alert("Ícone adquirido com sucesso! 🎉");
                atualizarLoja();
            }
        });
    });

    // CORREÇÃO EXTRA: Se o usuário estiver com a loja aberta e responder as 
    // questões em outra aba/janela, isso atualiza o saldo na hora!
    window.addEventListener('storage', (e) => {
        if (e.key === 'flashiiMoedas') {
            atualizarLoja();
        }
    });

    // Inicializa a interface da loja
    atualizarLoja();
});