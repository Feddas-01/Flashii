

let bancos = {};
let bancoAtual = "";



const popupBanco = document.getElementById("popupBanco");
const popupQuestao = document.getElementById("popupQuestao");

const btnNovoBanco = document.getElementById("btnNovoBanco");
const btnNovaQuestao = document.getElementById("btnNovaQuestao");
const btnExcluirBanco = document.getElementById("btnExcluirBanco");

const btnCriarBanco = document.getElementById("criarBanco");
const btnFecharBanco = document.getElementById("fecharBanco");

const btnSalvarQuestao = document.getElementById("salvarQuestao");
const btnFecharQuestao = document.getElementById("fecharQuestao");

const selectBanco = document.getElementById("selectBanco");



function salvar() {

    localStorage.setItem(
        "flashiiBancoQuestoes",
        JSON.stringify(bancos)
    );

}

function carregar() {

    const salvo =
        localStorage.getItem(
            "flashiiBancoQuestoes"
        );

    if (salvo) {

        bancos = JSON.parse(salvo);

    } else {

        bancos = {
            "Geral": []
        };

        salvar();

    }

    bancoAtual =
        Object.keys(bancos)[0];

    atualizarSelect();

}



function atualizarSelect() {

    const select = document.getElementById("selectBanco");

    select.innerHTML = "";

    Object.keys(bancos).forEach(function(nome) {

        const option = document.createElement("option");

        option.value = nome;
        option.textContent = nome;

        select.appendChild(option);

    });

    select.value = bancoAtual;
}

btnNovoBanco.onclick = function(){

    popupBanco.style.display = "flex";

};

btnFecharBanco.onclick = function(){

    popupBanco.style.display = "none";

    document
        .getElementById("nomeBanco")
        .value = "";

};

btnNovaQuestao.onclick = function(){

    popupQuestao.style.display = "flex";

};

btnFecharQuestao.onclick = function(){

    popupQuestao.style.display = "none";

};



btnCriarBanco.onclick = function(){

    const nome =
        document
        .getElementById("nomeBanco")
        .value
        .trim();

    if(nome === ""){

        alert("Digite um nome.");

        return;

    }

    if(bancos[nome]){

        alert("Esse banco já existe.");

        return;

    }

    bancos[nome] = [];

    bancoAtual = nome;

    salvar();

    atualizarSelect();

    popupBanco.style.display = "none";

    document
        .getElementById("nomeBanco")
        .value = "";

    renderizarQuestoes();

};



selectBanco.onchange = function(){

    bancoAtual = this.value;

    renderizarQuestoes();

};



btnExcluirBanco.onclick = function(){

    if(Object.keys(bancos).length <= 1){

        alert(
            "Deixe pelo menos um banco criado."
        );

        return;

    }

    if(
        !confirm(
            "Deseja excluir este banco?"
        )
    ){

        return;

    }

    delete bancos[bancoAtual];

    bancoAtual =
        Object.keys(bancos)[0];

    salvar();

    atualizarSelect();

    renderizarQuestoes();

};



btnSalvarQuestao.onclick = function () {

    const pergunta =
        document
            .getElementById("pergunta")
            .value
            .trim();

    const alternativaA =
        document
            .getElementById("alternativaA")
            .value
            .trim();

    const alternativaB =
        document
            .getElementById("alternativaB")
            .value
            .trim();

    const alternativaC =
        document
            .getElementById("alternativaC")
            .value
            .trim();

    const alternativaD =
        document
            .getElementById("alternativaD")
            .value
            .trim();

    const respostaCorreta =
        parseInt(
            document
                .getElementById("respostaCorreta")
                .value
        );

    if (
        pergunta === "" ||
        alternativaA === "" ||
        alternativaB === "" ||
        alternativaC === "" ||
        alternativaD === ""
    ) {

        alert(
            "Preencha todos os campos."
        );

        return;

    }

    bancos[bancoAtual].push({

        pergunta: pergunta,

        alternativas: [

            alternativaA,

            alternativaB,

            alternativaC,

            alternativaD

        ],

        correta: respostaCorreta

    });

    salvar();

    popupQuestao.style.display = "none";

    document
        .getElementById("pergunta")
        .value = "";

    document
        .getElementById("alternativaA")
        .value = "";

    document
        .getElementById("alternativaB")
        .value = "";

    document
        .getElementById("alternativaC")
        .value = "";

    document
        .getElementById("alternativaD")
        .value = "";

    document
        .getElementById("respostaCorreta")
        .value = "0";

    renderizarQuestoes();

};


function excluirQuestao(indice) {

    const confirmar = confirm(
        "Deseja excluir esta questão?"
    );

    if (!confirmar) {

        return;

    }

    bancos[bancoAtual].splice(
        indice,
        1
    );

    salvar();

    renderizarQuestoes();

}



function renderizarQuestoes() {

    const lista = document.getElementById("listaQuestoes");

    lista.innerHTML = "";

    if (!bancos[bancoAtual]) {
        return;
    }

    bancos[bancoAtual].forEach(function (questao, indice) {

        const card = document.createElement("div");
        card.className = "questao";

        const titulo = document.createElement("h3");
        titulo.textContent = questao.pergunta;
        card.appendChild(titulo);

        const resultado = document.createElement("p");
        resultado.className = "resultado";

        
        let respondida = false;

        questao.alternativas.forEach(function (texto, i) {

            const botao = document.createElement("button");
            botao.className = "alternativa";

            const letras = ["A", "B", "C", "D"];

            botao.textContent =
                letras[i] + ") " + texto;

            botao.onclick = function () {

                if (respondida) {
                    return;
                }

                respondida = true;

                
                const alternativas =
                    card.querySelectorAll(".alternativa");

                alternativas.forEach(function (btn, indiceAlt) {

                    if (indiceAlt === questao.correta) {

                        btn.classList.add("correta");

                    }

                });

                if (i === questao.correta) {

                    resultado.textContent =
                        "✅ Você acertou!";

                    resultado.style.color =
                        "#2ecc71";

                } else {

                    botao.classList.add("errada");

                    const letraCorreta =
                        letras[questao.correta];

                    resultado.textContent =
                        "❌ Você errou! A resposta correta é " +
                        letraCorreta + ".";

                    resultado.style.color =
                        "#e74c3c";

                }

            };

            card.appendChild(botao);

        });

       
        card.appendChild(resultado);

        const btnExcluir =
            document.createElement("button");

        btnExcluir.className =
            "btnExcluirQuestao";

        btnExcluir.textContent =
            "🗑 Excluir Questão";

        btnExcluir.onclick = function () {

            excluirQuestao(indice);

        };

        card.appendChild(btnExcluir);

        lista.appendChild(card);

    });

}


carregar();

renderizarQuestoes();

const btnReset = document.createElement("button");

btnReset.textContent = "🔄 Tentar novamente";
btnReset.className = "btnResetQuestao";

btnReset.onclick = function () {
    renderizarQuestoes();
};

card.appendChild(btnReset);
