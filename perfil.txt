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