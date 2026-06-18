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
            tbody.innerHTML = `<tr><td colspan="3">${dados.erro}
             </td></tr>`; return;
        }
        forEach((jogador, index) => { const tr = document.createElement('tr'); tr.innerHTML = ` <td>#${index + 1}</td> <td>${jogador.nome}</td> <td>${jogador.pontuacao} pts</td> `; tbody.appendChild(tr); });
    } catch (erro) { console.error('Erro ao carregar o ranking:', erro); }
}  