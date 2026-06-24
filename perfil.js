 
// Variável global (ou de controle) que você já usa para o ID do usuário
let idUsuarioLogado = null; 

// ==========================================================================
// 1. LÓGICA DO MODAL DE SELEÇÃO DE ÍCONES
// ==========================================================================

// Aguarda o DOM carregar completamente para garantir que os elementos existem
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal-icones');
    const btnAlterarFoto = document.getElementById('btn-alterar-foto');
    const btnFecharModal = document.querySelector('.fechar-modal');
    const avatarDisplay = document.getElementById('avatar-display');
    const opcoesIcone = document.querySelectorAll('.opcao-icone');

    // Abre o modal ao clicar em "Alterar Foto"
    if (btnAlterarFoto) {
        btnAlterarFoto.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    // Fecha o modal ao clicar no botão de fechar (X)
    if (btnFecharModal) {
        btnFecharModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Fecha o modal se o usuário clicar na área escura (fora da caixa branca)
    window.addEventListener('click', (evento) => {
        if (evento.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Trata o clique em cada uma das opções de ícone
    opcoesIcone.forEach(icone => {
        icone.addEventListener('click', () => {
            // Pega o valor guardado no atributo data-icon (ex: "🦊")
            const iconeSelecionado = icone.getAttribute('data-icon');
            
            // Atualiza o miolo do seu círculo de avatar na tela
            avatarDisplay.textContent = iconeSelecionado;
            
            // Se futuramente você usar imagens em vez de emojis, a lógica seria:
            // avatarDisplay.innerHTML = `<img src="${iconeSelecionado}" style="width:100%; height:100%; border-radius:50%;">`;

            // Fecha o modal após a escolha
            modal.style.display = 'none';
        });
    });
});

// ==========================================================================
// 2. SUA FUNÇÃO DE CADASTRO EXISTENTE
// ==========================================================================
async function cadastrarUsuario(nomeDigitado) {
    try {
        const resposta = await fetch('cadastrar.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: nomeDigitado })
        });
        
        const dados = await resposta.json();
        
        if (dados.sucesso) {
            idUsuarioLogado = dados.id;
            console.log(`Usuário logado com sucesso! ID: ${idUsuarioLogado}`);
        }
    } catch (erro) {
        console.error('Erro no cadastro:', erro);
    }
}