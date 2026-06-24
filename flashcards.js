let dados = {};
let baralhoAtual = "";
// Controle para o usuário não pontuar múltiplas vezes no mesmo card sem resetar a tela
let cardsPontuados = []; 

function abrirPopup() {
    document.getElementById("overlay").style.display = "flex";
}

function fecharPopup() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("pergunta").value = "";
    document.getElementById("resposta").value = "";
}

function abrirPopupBaralho() {
    document.getElementById("overlayBaralho").style.display = "flex";
}

function fecharPopupBaralho() {
    document.getElementById("overlayBaralho").style.display = "none";
    document.getElementById("nomeBaralho").value = "";
}


function obterSaldoMoedas() {
    const saldo = localStorage.getItem("flashiiMoedas");
    return saldo ? parseInt(saldo) : 0;
}

function adicionarMoedas(quantidade) {
    const saldoAtual = obterSaldoMoedas();
    const novoSaldo = saldoAtual + quantidade;
    localStorage.setItem("flashiiMoedas", novoSaldo);
    console.log(`+${quantidade} moedas adicionadas! Saldo atual: ${novoSaldo}`);
}


function salvarDados() {
    localStorage.setItem("flashii_baralhos", JSON.stringify(dados));
}

function carregarDados() {
    const salvo = localStorage.getItem("flashii_baralhos");

    if (salvo) {
        dados = JSON.parse(salvo);
    } else {
        dados = {
            "Meu Primeiro Baralho": []
        };
        salvarDados();
    }
    atualizarSelect();
}

function atualizarSelect() {
    const select = document.getElementById("baralhoSelect");
    select.innerHTML = "";

    Object.keys(dados).forEach(function(nome){
        const option = document.createElement("option");
        option.value = nome;
        option.textContent = nome;
        select.appendChild(option);
    });

    if (!baralhoAtual || !dados[baralhoAtual]) {
        baralhoAtual = Object.keys(dados)[0];
    }

    select.value = baralhoAtual;
    cardsPontuados = []; // Reseta a lista de pontuação ao trocar de baralho
    renderizarFlashcards();
}

window.onload = function(){
    carregarDados();

    document.getElementById("novoBaralhoBtn").addEventListener("click", abrirPopupBaralho);
    document.getElementById("criarBaralho").addEventListener("click", criarBaralho);
    document.getElementById("salvar").addEventListener("click", criarFlashcard);
    
    document.getElementById("baralhoSelect").addEventListener("change", function(){
        baralhoAtual = this.value;
        cardsPontuados = []; 
        renderizarFlashcards();
    });

    document.getElementById("excluirBaralhoBtn").addEventListener("click", excluirBaralho);
};

function criarBaralho() {
    const input = document.getElementById("nomeBaralho");
    const nome = input.value.trim();

    if (nome === "") {
        alert("Digite um nome para o baralho.");
        return;
    }

    if (dados[nome]) {
        alert("Já existe um baralho com esse nome.");
        return;
    }

    dados[nome] = [];
    baralhoAtual = nome;

    salvarDados();
    atualizarSelect();
    fecharPopupBaralho();
}

function excluirBaralho() {
    const nomes = Object.keys(dados);

    if (nomes.length <= 1) {
        alert("É necessário manter pelo menos um baralho.");
        return;
    }

    const confirmar = confirm(`Deseja realmente excluir o baralho "${baralhoAtual}"?`);
    if (!confirmar) return;

    delete dados[baralhoAtual];
    baralhoAtual = Object.keys(dados)[0];

    salvarDados();
    atualizarSelect();
}

function criarFlashcard() {
    const pergunta = document.getElementById("pergunta").value.trim();
    const resposta = document.getElementById("resposta").value.trim();

    if (pergunta === "" || resposta === "") {
        alert("Preencha a pergunta e a resposta.");
        return;
    }

    dados[baralhoAtual].push({
        pergunta: pergunta,
        resposta: resposta
    });

    salvarDados();
    fecharPopup();
    renderizarFlashcards();
}

function excluirFlashcard(indice) {
    const confirmar = confirm("Deseja excluir este flashcard?");
    if (!confirmar) return;

    dados[baralhoAtual].splice(indice, 1);
    salvarDados();
    renderizarFlashcards();
}

function renderizarFlashcards() {
    const lista = document.getElementById("listaFlashcards");
    lista.innerHTML = "";

    if (!dados[baralhoAtual]) return;

    dados[baralhoAtual].forEach(function (flashcard, indice) {
        const card = document.createElement("div");
        card.className = "flashcard";
        
      
        const cardId = `${baralhoAtual}_${indice}`;

        
        card.innerHTML = `
            <button class="btn-excluir">&times;</button>
            <div class="flashcard-inner">
                <div class="flashcard-front">
                    <div class="card-conteudo">${flashcard.pergunta}</div>
                </div>
                <div class="flashcard-back">
                    <div class="card-conteudo">${flashcard.resposta}</div>
                    <div class="flashcard-acoes">
                        <button class="btn-feedback errei" data-action="errou">Errei ❌</button>
                        <button class="btn-feedback acertei" data-action="acertou">Acertei 👍</button>
                    </div>
                </div>
            </div>
        `;

        // Gerencia a virada do card
        card.addEventListener("click", function (event) {
   
            if (
                event.target.classList.contains("btn-excluir") || 
                event.target.classList.contains("btn-feedback")
            ) {
                return;
            }
            card.classList.toggle("virado");
        });

      
        const btnAcertei = card.querySelector(".btn-feedback.acertei");
        const btnErrei = card.querySelector(".btn-feedback.errei");

     
        if (cardsPontuados.includes(cardId)) {
            btnAcertei.disabled = true;
            btnErrei.disabled = true;
            btnAcertei.textContent = "Pontuado ✓";
            btnAcertei.style.opacity = "0.6";
            btnErrei.style.display = "none";
        }

        btnAcertei.addEventListener("click", function (event) {
            event.stopPropagation(); 
            
            if (!cardsPontuados.includes(cardId)) {
                cardsPontuados.push(cardId);
                
          
                adicionarMoedas(10);
                
                // Feedback visual rápido antes de desvirar
                btnAcertei.textContent = "Ganhou +10! 🎉";
                
                setTimeout(() => {
                    card.classList.remove("virado");
                    renderizarFlashcards(); 
                }, 800);
            }
        });

        btnErrei.addEventListener("click", function (event) {
            event.stopPropagation();
            // Erros não dão moedas, apenas desviram o card para focar nos estudos
            card.classList.remove("virado");
        });

        const botaoExcluir = card.querySelector(".btn-excluir");
        botaoExcluir.addEventListener("click", function (event) {
            event.stopPropagation();
            excluirFlashcard(indice);
        });

        lista.appendChild(card);
    });
    
document.getElementById("gerarBaralhoIABtn").addEventListener("click", () => {
    alert("✨ Em breve: A Vertex AI vai gerar um baralho completo com base no assunto que você escolher!");
});
}