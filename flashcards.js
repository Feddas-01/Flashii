let dados = {};
let baralhoAtual = "";



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



function salvarDados() {
    localStorage.setItem(
        "flashii_baralhos",
        JSON.stringify(dados)
    );
}

function carregarDados() {

    const salvo =
        localStorage.getItem("flashii_baralhos");

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

    const select =
        document.getElementById("baralhoSelect");

    select.innerHTML = "";

    Object.keys(dados).forEach(function(nome){

        const option =
            document.createElement("option");

        option.value = nome;
        option.textContent = nome;

        select.appendChild(option);

    });

    if (
        !baralhoAtual ||
        !dados[baralhoAtual]
    ) {

        baralhoAtual =
            Object.keys(dados)[0];

    }

    select.value = baralhoAtual;

    renderizarFlashcards();

}



window.onload = function(){

    carregarDados();

    document
        .getElementById("novoBaralhoBtn")
        .addEventListener(
            "click",
            abrirPopupBaralho
        );

    document
        .getElementById("criarBaralho")
        .addEventListener(
            "click",
            criarBaralho
        );

    document
        .getElementById("salvar")
        .addEventListener(
            "click",
            criarFlashcard
        );

    document
        .getElementById("baralhoSelect")
        .addEventListener(
            "change",
            function(){

                baralhoAtual = this.value;

                renderizarFlashcards();

            }
        );

    document
        .getElementById("excluirBaralhoBtn")
        .addEventListener(
            "click",
            excluirBaralho
        );

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

    const confirmar = confirm(
        `Deseja realmente excluir o baralho "${baralhoAtual}"?`
    );

    if (!confirmar) {
        return;
    }

    delete dados[baralhoAtual];

    baralhoAtual = Object.keys(dados)[0];

    salvarDados();

    atualizarSelect();
}


function criarFlashcard() {

    const pergunta =
        document.getElementById("pergunta")
        .value
        .trim();

    const resposta =
        document.getElementById("resposta")
        .value
        .trim();

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

    const confirmar = confirm(
        "Deseja excluir este flashcard?"
    );

    if (!confirmar) {
        return;
    }

    dados[baralhoAtual].splice(indice, 1);

    salvarDados();

    renderizarFlashcards();
}


function renderizarFlashcards() {

    const lista = document.getElementById("listaFlashcards");

    lista.innerHTML = "";

    if (!dados[baralhoAtual]) {
        return;
    }

    dados[baralhoAtual].forEach(function (flashcard, indice) {

        const card = document.createElement("div");
        card.className = "flashcard";

        card.innerHTML = `
            <button class="btn-excluir">&times;</button>

            <div class="flashcard-inner">

                <div class="flashcard-front">
                    ${flashcard.pergunta}
                </div>

                <div class="flashcard-back">
                    ${flashcard.resposta}
                </div>

            </div>
        `;


        card.addEventListener("click", function (event) {

            if (event.target.classList.contains("btn-excluir")) {
                return;
            }

            card.classList.toggle("virado");

        });

     
        const botaoExcluir =
            card.querySelector(".btn-excluir");

        botaoExcluir.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                excluirFlashcard(indice);

            }
        );

        lista.appendChild(card);

    });

}
