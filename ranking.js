document.addEventListener('DOMContentLoaded', () => {
    carregarRanking();
});

async function carregarRanking() {
    try {
        const resposta = await fetch('api.php');
        const dados = await resposta.json();
        const tbody = document.getElementById('ranking-body');
        tbody.innerHTML = '';

        if (dados.erro) {
            tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color: red;">${dados.erro}</td></tr>`;
            return;
        }

        // CORREÇÃO: Vinculado corretamente o loop ao array de dados retornado
        dados.forEach((jogador, index) => {
            const tr = document.createElement('tr');
            const posicao = index + 1;

            // Define medalhas visuais para o top 3 e classes para estilização CSS
            let medalhaOuPosicao = `#${posicao}`;
            if (posicao === 1) {
                tr.className = 'top-1';
                medalhaOuPosicao = '🥇 1º';
            } else if (posicao === 2) {
                tr.className = 'top-2';
                medalhaOuPosicao = '🥈 2º';
            } else if (posicao === 3) {
                tr.className = 'top-3';
                medalhaOuPosicao = '🥉 3º';
            }

            tr.innerHTML = `
                <td>${medalhaOuPosicao}</td>
                <td>${jogador.nome}</td>
                <td><strong>${jogador.pontuacao}</strong> pts</td>
            `;
            tbody.appendChild(tr);
        });

    } catch (erro) {
        console.error('Erro ao carregar o ranking:', erro);
        const tbody = document.getElementById('ranking-body');
        if(tbody) {
            tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color: #777;">Não foi possível carregar o ranking atual.</td></tr>`;
        }
    }
}