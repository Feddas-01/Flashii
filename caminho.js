

const cardsMaterias = document.querySelectorAll(".cardMateria");

const overlayModulo = document.getElementById("overlayModulo");
const overlayQuestao = document.getElementById("overlayQuestao");
const overlayConclusao = document.getElementById("overlayConclusao");

const listaModulos = document.getElementById("listaModulos");
const tituloMateria = document.getElementById("tituloMateria");

const perguntaQuestao = document.getElementById("perguntaQuestao");
const alternativas = document.getElementById("alternativas");

const btnProximaQuestao =
document.getElementById("btnProximaQuestao");

const btnContinuar =
document.getElementById("btnContinuar");

const fecharModulo =
document.getElementById("fecharModulo");

const fecharQuestoes =
document.getElementById("fecharQuestoes");





let progresso = JSON.parse(

localStorage.getItem("flashiiCaminho")

);

if(!progresso){

    progresso = {

        matematica:0,

        portugues:0,

        historia:0,

        geografia:0,

        biologia:0,

        quimica:0,

        fisica:0,

        ingles:0

    };

    salvarProgresso();

}

function salvarProgresso(){

    localStorage.setItem(

        "flashiiCaminho",

        JSON.stringify(progresso)

    );

}






let materiaAtual = "";

let moduloAtual = 0;

let questaoAtual = 0;




const materias = {

matematica:[

"Introdução",

"Operações",

"Frações",

"Equações",

"Funções",

"Geometria"

],

portugues:[

"Gramática",

"Classes Gramaticais",

"Ortografia",

"Interpretação",

"Literatura"

],

historia:[

"Pré-História",

"Idade Antiga",

"Idade Média",

"Brasil Colônia",

"Brasil República"

],

geografia:[

"Cartografia",

"Relevo",

"Clima",

"Vegetação",

"Globalização"

],

biologia:[

"Células",

"Genética",

"Ecologia",

"Corpo Humano",

"Evolução"

],

quimica:[

"Átomos",

"Ligações",

"Tabela Periódica",

"Reações",

"Orgânica"

],

fisica:[

"Mecânica",

"Cinemática",

"Dinâmica",

"Energia",

"Eletricidade"

],

ingles:[

"Greetings",

"Verbs",

"Simple Present",

"Reading",

"Vocabulary"

]

};




cardsMaterias.forEach(card=>{

card.addEventListener("click",()=>{

    materiaAtual=

    card.dataset.materia;

    abrirMateria();

});

});




function abrirMateria(){

tituloMateria.innerHTML=

materiaAtual.charAt(0).toUpperCase()+

materiaAtual.slice(1);

listaModulos.innerHTML="";

const lista=materias[materiaAtual];

lista.forEach((nome,index)=>{

const modulo=

document.createElement("div");

modulo.className="modulo";

let status="🔒 Bloqueado";

if(index<progresso[materiaAtual]){

status="✅ Concluído";

}

else if(index==progresso[materiaAtual]){

status="▶ Disponível";

}

modulo.innerHTML=`

<h3>${nome}</h3>

<p>Módulo ${index+1}</p>

<span class="status">

${status}

</span>

`;

if(index<=progresso[materiaAtual]){

modulo.addEventListener("click",()=>{

moduloAtual=index;

abrirQuestoes();

});

}

listaModulos.appendChild(modulo);

});

overlayModulo.style.display="flex";

}




fecharModulo.onclick=()=>{

overlayModulo.style.display="none";

};

fecharQuestoes.onclick=()=>{

overlayQuestao.style.display="none";

};

btnContinuar.onclick=()=>{

overlayConclusao.style.display="none";

};


const questoes = {

matematica:[

{
pergunta:"Quanto é 2 + 2?",
alternativas:["2","3","4","5"],
correta:2
},

{
pergunta:"Quanto é 8 x 5?",
alternativas:["35","40","45","50"],
correta:1
},

{
pergunta:"Quanto é 25 ÷ 5?",
alternativas:["2","5","10","20"],
correta:1
}

],



portugues:[

{
pergunta:"Qual é um substantivo?",
alternativas:["Bonito","Correr","Casa","Rapidamente"],
correta:2
},

{
pergunta:"Qual palavra é um verbo?",
alternativas:["Mesa","Comer","Bonito","Lápis"],
correta:1
},

{
pergunta:"Qual é um pronome?",
alternativas:["Ele","Livro","Azul","Rua"],
correta:0
}

],



historia:[

{
pergunta:"Quem chegou ao Brasil em 1500?",
alternativas:[
"Napoleão",
"Pedro Álvares Cabral",
"Dom Pedro II",
"Getúlio Vargas"
],
correta:1
}

],



geografia:[

{
pergunta:"Qual é o maior oceano do planeta?",
alternativas:[
"Atlântico",
"Pacífico",
"Índico",
"Ártico"
],
correta:1
}

],



biologia:[

{
pergunta:"Qual é a unidade básica da vida?",
alternativas:[
"Célula",
"Átomo",
"Tecido",
"Molécula"
],
correta:0
}

],



quimica:[

{
pergunta:"Qual elemento possui símbolo O?",
alternativas:[
"Ouro",
"Oxigênio",
"Osmio",
"Prata"
],
correta:1
}

],



fisica:[

{
pergunta:"Qual é a unidade de força?",
alternativas:[
"Metro",
"Newton",
"Joule",
"Watt"
],
correta:1
}

],



ingles:[

{
pergunta:"Como se diz 'Casa' em inglês?",
alternativas:[
"House",
"Car",
"Book",
"School"
],
correta:0
}

]

};






function abrirQuestoes(){

overlayModulo.style.display="none";

overlayQuestao.style.display="flex";

questaoAtual=0;

mostrarQuestao();

}




function mostrarQuestao(){

const lista=questoes[materiaAtual];

const questao=lista[questaoAtual];

perguntaQuestao.innerHTML=questao.pergunta;

alternativas.innerHTML="";

btnProximaQuestao.style.display="none";

questao.alternativas.forEach((texto,index)=>{

const alternativa=

document.createElement("div");

alternativa.className="alternativa";

alternativa.innerHTML=texto;

alternativa.onclick=()=>{

responder(index);

};

alternativas.appendChild(alternativa);

});

}





function responder(resposta){

const lista=questoes[materiaAtual];

const questao=lista[questaoAtual];

const alternativasHTML=

document.querySelectorAll(".alternativa");

alternativasHTML.forEach((alt,index)=>{

alt.onclick=null;

if(index==questao.correta){

alt.classList.add("correta");

}

else if(index==resposta){

alt.classList.add("errada");

}

});

if(resposta==questao.correta){

concluirQuestao();

}

btnProximaQuestao.style.display="block";

}






btnProximaQuestao.onclick=function(){

questaoAtual++;

const lista=questoes[materiaAtual];

if(questaoAtual>=lista.length){

finalizarModulo();

return;

}

mostrarQuestao();

};


function finalizarModulo(){

    overlayQuestao.style.display="none";


    if(progresso[materiaAtual] <= moduloAtual){

        progresso[materiaAtual]++;

        salvarProgresso();

    }

    // Gamificação
    concluirModulo(
        materiaAtual + " - Módulo " + (moduloAtual+1)
    );

    atualizarEstatisticas();

    document.getElementById("xpRecebido").innerHTML="+100";

    document.getElementById("fpRecebido").innerHTML="+50";

    overlayConclusao.style.display="flex";

}





function atualizarEstatisticas(){

    if(typeof getUsuario!="function"){
        return;
    }

    const usuario=getUsuario();

    const nivel=document.getElementById("nivel");
    const xp=document.getElementById("xp");
    const fp=document.getElementById("flashPoints");

    const modulos=document.getElementById("modulosConcluidos");
    const questoes=document.getElementById("questoesRespondidas");
    const flashcards=document.getElementById("flashcardsConcluidos");
    const tempo=document.getElementById("tempoEstudo");

    if(nivel){

        nivel.innerHTML=usuario.nivel;

    }

    if(xp){

        xp.innerHTML=usuario.xp;

    }

    if(fp){

        fp.innerHTML=usuario.flashPoints;

    }

    if(modulos){

        modulos.innerHTML=usuario.modulosConcluidos;

    }

    if(questoes){

        questoes.innerHTML=usuario.questoesRespondidas;

    }

    if(flashcards){

        flashcards.innerHTML=usuario.flashcardsConcluidos;

    }

    if(tempo){

        tempo.innerHTML=usuario.tempoEstudo+" min";

    }

    atualizarConquistas();

    atualizarBarraXP();

}




function atualizarConquistas(){

    if(typeof getUsuario!="function"){
        return;
    }

    const usuario=getUsuario();

    const lista=document.getElementById("listaConquistas");

    if(!lista){
        return;
    }

    lista.innerHTML="";

    if(usuario.conquistas.length==0){

        lista.innerHTML="<p>Nenhuma conquista desbloqueada.</p>";

        return;

    }

    usuario.conquistas.forEach(function(conquista){

        const div=document.createElement("div");

        div.className="conquista";

        div.innerHTML=`

            <div class="icone">🏆</div>

            <span>${conquista}</span>

        `;

        lista.appendChild(div);

    });

}



function atualizarBarraXPLocal(){

    if(typeof progressoNivel!="function"){
        return;
    }

    const barra=document.getElementById("barraXP");

    if(barra){

        barra.style.width=

        progressoNivel()+"%";

    }

}





window.onclick=function(event){

    if(event.target==overlayModulo){

        overlayModulo.style.display="none";

    }

    if(event.target==overlayQuestao){

        overlayQuestao.style.display="none";

    }

    if(event.target==overlayConclusao){

        overlayConclusao.style.display="none";

    }

}




window.onload=function(){

    atualizarEstatisticas();

    atualizarConquistas();

    atualizarBarraXPLocal();

}




console.log("Caminho do Estudante carregado com sucesso!");