async function registrarAcerto() {
    if (!idUsuarioLogado) {
        alert('Você precisa se cadastrar primeiro!');
        return;
    }

    try {
        const resposta = await fetch('atualizar_pontos.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id: idUsuarioLogado, 
                pontos: 10
            })
        });

        const dados = await resposta.json();
        
        if (dados.sucesso) {
            console.log('10 pontos adicionados!');
        }
    } catch (erro) {
        console.error('Erro ao salvar os pontos:', erro);
    }
}