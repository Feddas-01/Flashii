
let usuario = JSON.parse(localStorage.getItem("flashiiUsuario"));

if (!usuario) {

    usuario = {

        nome: "Estudante",

        flashPoints: 0,

        xp: 0,

        nivel: 1,

        streak: 0,

        tempoEstudo: 0,

        flashcardsConcluidos: 0,

        questoesRespondidas: 0,

        modulosConcluidos: 0,

        conquistas: [],

        inventario: []

    };

    salvarUsuario();

}




function salvarUsuario(){

    localStorage.setItem(
        "flashiiUsuario",
        JSON.stringify(usuario)
    );

   
    localStorage.setItem(
        "flashiiMoedas",
        usuario.flashPoints
    );

}



function adicionarFlashPoints(valor) {

    usuario.flashPoints += valor;

   
    localStorage.setItem("flashiiMoedas", usuario.flashPoints);

    verificarNivel();
    salvarUsuario();

}


function removerFlashPoints(valor){

    if(usuario.flashPoints >= valor){

        usuario.flashPoints -= valor;

        
        localStorage.setItem("flashiiMoedas", usuario.flashPoints);

        salvarUsuario();

        return true;

    }

    return false;

}


function adicionarXP(valor){

    usuario.xp += valor;

    verificarNivel();

    salvarUsuario();

}



function verificarNivel(){

    const novoNivel =

        Math.floor(usuario.xp / 100) + 1;

    if(novoNivel > usuario.nivel){

        usuario.nivel = novoNivel;

        alert("🎉 Parabéns! Você alcançou o nível " + usuario.nivel);

    }

}



function registrarFlashcard(){

    usuario.flashcardsConcluidos++;

    adicionarFlashPoints(2);

    adicionarXP(1);

}

function registrarQuestao(){

    usuario.questoesRespondidas++;

    adicionarFlashPoints(5);

    adicionarXP(3);

}

function registrarModulo(){

    usuario.modulosConcluidos++;

    adicionarFlashPoints(50);

    adicionarXP(100);

}



function getFlashPoints(){

    return usuario.flashPoints;

}

function getNivel(){

    return usuario.nivel;

}

function getXP(){

    return usuario.xp;

}

function getUsuario(){

    return usuario;

}


function desbloquearConquista(nome){

    if(usuario.conquistas.includes(nome)){
        return;
    }

    usuario.conquistas.push(nome);

    salvarUsuario();

    alert("🏆 Nova conquista desbloqueada!\n\n" + nome);

}

function verificarConquistas(){

    if(usuario.flashcardsConcluidos >= 1){

        desbloquearConquista("Primeiro Flashcard");

    }

    if(usuario.flashcardsConcluidos >= 100){

        desbloquearConquista("Mestre dos Flashcards");

    }

    if(usuario.questoesRespondidas >= 1){

        desbloquearConquista("Primeira Questão");

    }

    if(usuario.questoesRespondidas >= 100){

        desbloquearConquista("Especialista em Questões");

    }

    if(usuario.flashPoints >= 100){

        desbloquearConquista("100 Flash Points");

    }

    if(usuario.flashPoints >= 500){

        desbloquearConquista("500 Flash Points");

    }

    if(usuario.flashPoints >= 1000){

        desbloquearConquista("1000 Flash Points");

    }

    if(usuario.modulosConcluidos >= 10){

        desbloquearConquista("Explorador do Conhecimento");

    }

}





function adicionarItem(item){

    if(usuario.inventario.includes(item)){
        return;
    }

    usuario.inventario.push(item);

    salvarUsuario();

}

function possuiItem(item){

    return usuario.inventario.includes(item);

}

function comprarItem(nome,preco){

    if(usuario.flashPoints < preco){

        alert("Você não possui Flash Points suficientes.");

        return false;

    }

    usuario.flashPoints -= preco;

    adicionarItem(nome);

    salvarUsuario();

    alert("🎉 Compra realizada!");

    return true;

}



function atualizarStreak(){

    const hoje = new Date().toLocaleDateString();

    if(usuario.ultimoLogin == hoje){

        return;

    }

    const ontem = new Date();

    ontem.setDate(ontem.getDate()-1);

    if(usuario.ultimoLogin == ontem.toLocaleDateString()){

        usuario.streak++;

    }

    else{

        usuario.streak = 1;

    }

    usuario.ultimoLogin = hoje;

    salvarUsuario();

}





function criarMissoes(){

    const hoje = new Date().toLocaleDateString();

    if(usuario.dataMissoes == hoje){

        return;

    }

    usuario.dataMissoes = hoje;

    usuario.missoes = [

        {

            nome:"Resolver 10 questões",

            progresso:0,

            objetivo:10,

            recompensa:40,

            concluida:false

        },

        {

            nome:"Estudar 20 flashcards",

            progresso:0,

            objetivo:20,

            recompensa:30,

            concluida:false

        },

        {

            nome:"Concluir 1 Pomodoro",

            progresso:0,

            objetivo:1,

            recompensa:20,

            concluida:false

        }

    ];

    salvarUsuario();

}

function atualizarMissao(nome){

    usuario.missoes.forEach(function(missao){

        if(missao.nome != nome){

            return;

        }

        if(missao.concluida){

            return;

        }

        missao.progresso++;

        if(missao.progresso >= missao.objetivo){

            missao.concluida = true;

            adicionarFlashPoints(missao.recompensa);

            alert("🎯 Missão concluída!\n+"+missao.recompensa+" Flash Points");

        }

    });

    salvarUsuario();

}




function registrarTempo(minutos){

    usuario.tempoEstudo += minutos;

    salvarUsuario();

}




atualizarStreak();

criarMissoes();

verificarConquistas();


function receberBonusDiario(){

    const hoje = new Date().toLocaleDateString();

    if(usuario.ultimoBonus == hoje){
        return false;
    }

    usuario.ultimoBonus = hoje;

    adicionarFlashPoints(20);

    adicionarXP(10);

    salvarUsuario();

    alert("🎁 Você recebeu 20 Flash Points pelo login diário!");

    return true;

}




function xpNecessario(){

    return usuario.nivel * 100;

}

function progressoNivel(){

    const xpAtual = usuario.xp;

    const xpAnterior = (usuario.nivel-1)*100;

    const xpProximo = usuario.nivel*100;

    return ((xpAtual-xpAnterior)/(xpProximo-xpAnterior))*100;

}





function atualizarPerfil(){

    const fp=document.getElementById("flashPoints");
    const xp=document.getElementById("xp");
    const nivel=document.getElementById("nivel");
    const streak=document.getElementById("streak");

    if(fp) fp.textContent=usuario.flashPoints;

    if(xp) xp.textContent=usuario.xp;

    if(nivel) nivel.textContent=usuario.nivel;

    if(streak) streak.textContent=usuario.streak;

}



function atualizarBarraXP(){

    const barra=document.getElementById("barraXP");

    if(!barra){
        return;
    }

    barra.style.width=progressoNivel()+"%";

}




function salvarRanking(){

    let ranking=

    JSON.parse(localStorage.getItem("flashiiRanking"))||[];

    const indice=ranking.findIndex(function(j){

        return j.nome==usuario.nome;

    });

    const dados={

        nome:usuario.nome,

        nivel:usuario.nivel,

        xp:usuario.xp,

        flashPoints:usuario.flashPoints

    };

    if(indice==-1){

        ranking.push(dados);

    }

    else{

        ranking[indice]=dados;

    }

    ranking.sort(function(a,b){

        return b.flashPoints-a.flashPoints;

    });

    localStorage.setItem(

        "flashiiRanking",

        JSON.stringify(ranking)

    );

}




function atualizarSistema(){

    verificarConquistas();

    atualizarPerfil();

    atualizarBarraXP();

    salvarRanking();

    salvarUsuario();

}




const antigaFP=adicionarFlashPoints;

adicionarFlashPoints=function(valor){

    antigaFP(valor);

    atualizarSistema();

}

const antigoXP=adicionarXP;

adicionarXP=function(valor){

    antigoXP(valor);

    atualizarSistema();

}




function concluirModulo(nome){

    registrarModulo();

    desbloquearConquista(nome);

    atualizarSistema();

}




function concluirFlashcard(){

    registrarFlashcard();

    atualizarMissao("Estudar 20 flashcards");

    atualizarSistema();

}




function concluirQuestao(){

    registrarQuestao();

    atualizarMissao("Resolver 10 questões");

    atualizarSistema();

}




function concluirPomodoro(minutos){

    registrarTempo(minutos);

    atualizarMissao("Concluir 1 Pomodoro");

    adicionarFlashPoints(5);

    adicionarXP(5);

    atualizarSistema();

}





receberBonusDiario();

atualizarSistema();

console.log("Flashii Gamificação carregado com sucesso!");