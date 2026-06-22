



function abrirPopup() {
    document.getElementById("overlay").style.display = "flex";
}

function fecharPopup() {
    document.getElementById("overlay").style.display = "none";
}


window.onload = function () {
    carregarFlashcards();

    document
        .getElementById("salvar")
        .addEventListener("click", salvarFlashcard);
};



function salvarFlashcard() {
    const pergunta = document.getElementById("pergunta").value.trim();
    const resposta = document.getElementById("resposta").value.trim();

    if (pergunta === "" || resposta === "") {
        alert("Preencha a pergunta e a resposta.");
        return;
    }

    let flashcards =
        JSON.parse(localStorage.getItem("flashcards")) || [];

    flashcards.push({
        pergunta,
        resposta
    });

    localStorage.setItem(
        "flashcards",
        JSON.stringify(flashcards)
    );

    criarFlashcard(pergunta, resposta);

    document.getElementById("pergunta").value = "";
    document.getElementById("resposta").value = "";

    fecharPopup();
}



function criarFlashcard(pergunta, resposta) {

    const lista = document.getElementById("listaFlashcards");

    const card = document.createElement("div");
    card.className = "flashcard";

    card.innerHTML = `
        <button class="btn-excluir">&times;</button>

        <div class="flashcard-inner">

            <div class="flashcard-front">
                ${pergunta}
            </div>

            <div class="flashcard-back">
                ${resposta}
            </div>

        </div>
    `;

   
    card.addEventListener("click", function (e) {

        if (e.target.classList.contains("btn-excluir")) {
            return;
        }

        card.classList.toggle("virado");

    });

   
    card.querySelector(".btn-excluir").addEventListener("click", function (e) {

        e.stopPropagation();

        if (!confirm("Deseja excluir este flashcard?")) {
            return;
        }

        let flashcards =
            JSON.parse(localStorage.getItem("flashcards")) || [];

        const indice = flashcards.findIndex(function (item) {
            return (
                item.pergunta === pergunta &&
                item.resposta === resposta
            );
        });

        if (indice !== -1) {
            flashcards.splice(indice, 1);
        }

        localStorage.setItem(
            "flashcards",
            JSON.stringify(flashcards)
        );

        card.remove();

    });

    lista.appendChild(card);

}



function carregarFlashcards() {

    const lista = document.getElementById("listaFlashcards");
    lista.innerHTML = "";

    const flashcards =
        JSON.parse(localStorage.getItem("flashcards")) || [];

    flashcards.forEach(function (flashcard) {

        criarFlashcard(
            flashcard.pergunta,
            flashcard.resposta
        );

    });

}

