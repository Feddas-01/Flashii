let timerInterval;
let tempoRestante; // em segundos
let estaPausado = false;

document.addEventListener('DOMContentLoaded', () => {
    const btnIniciar = document.getElementById('btnIniciar');
    const btnPausar = document.getElementById('btnPausar');
    const btnResetar = document.getElementById('btnResetar');
    const inputMinutos = document.getElementById('inputMinutos');
    const configBox = document.getElementById('configBox');
    const timerBox = document.getElementById('timerBox');
    const countdownDisplay = document.getElementById('countdownDisplay');

    // Função que formata segundos em formato MM:SS
    function formatarTempo(segundos) {
        const mins = Math.floor(segundos / 60);
        const segs = segundos % 60;
        return `${mins.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
    }

    // Função principal que gerencia a contagem regressiva
    function iniciarContador() {
        clearInterval(timerInterval);
        
        timerInterval = setInterval(() => {
            if (!estaPausado) {
                // Se o timer foi configurado por timestamp, recalculamos com base no relógio real
                const endTime = localStorage.getItem('pomodoro_end_time');
                
                if (endTime) {
                    const agora = Date.now();
                    tempoRestante = Math.max(0, Math.round((parseInt(endTime) - agora) / 1000));
                } else {
                    tempoRestante--;
                }

                countdownDisplay.textContent = formatarTempo(tempoRestante);
                document.title = `(${formatarTempo(tempoRestante)}) Flashii ⚡`;

                // Quando o tempo esgotar
                if (tempoRestante <= 0) {
                    clearInterval(timerInterval);
                    alert("⏰ O tempo de foco acabou! Hora de dar uma pausa.");
                    resetarInterface();
                }
            }
        }, 1000);
    }

    // VERIFICAÇÃO AO CARREGAR A PÁGINA: O segredo para continuar contando!
    const endTimeSalvo = localStorage.getItem('pomodoro_end_time');
    const statusPausaSalvo = localStorage.getItem('pomodoro_pausado');

    if (endTimeSalvo) {
        const agora = Date.now();
        const diferenca = Math.round((parseInt(endTimeSalvo) - agora) / 1000);

        if (diferenca > 0) {
            tempoRestante = diferenca;
            configBox.classList.add('escondido');
            timerBox.classList.remove('escondido');
            countdownDisplay.textContent = formatarTempo(tempoRestante);

            // Restaura o estado de pausa se o usuário saiu com ele pausado
            if (statusPausaSalvo === 'true') {
                estaPausado = true;
                btnPausar.textContent = "Retomar";
                btnPausar.style.backgroundColor = "#27ae60";
            }

            iniciarContador();
        } else {
            // Se o tempo acabou enquanto ele estava fora da página, limpa
            localStorage.removeItem('pomodoro_end_time');
            localStorage.removeItem('pomodoro_pausado');
        }
    }

    // Ação de Iniciar o Timer do zero
    btnIniciar.addEventListener('click', () => {
        const minutos = parseInt(inputMinutos.value);
        
        if (isNaN(minutos) || minutos <= 0 || minutos > 60) {
            alert("Por favor, escolha um tempo válido entre 1 e 60 minutos.");
            return;
        }

        // Calcula o momento exato no futuro em que o timer deve acabar (em milissegundos)
        const endTime = Date.now() + (minutos * 60 * 1000);
        localStorage.setItem('pomodoro_end_time', endTime);
        localStorage.setItem('pomodoro_pausado', 'false');

        tempoRestante = minutos * 60;
        estaPausado = false;
        btnPausar.textContent = "Pausar";

        configBox.classList.add('escondido');
        timerBox.classList.remove('escondido');
        countdownDisplay.textContent = formatarTempo(tempoRestante);
        
        iniciarContador();
    });

    // Botão de Pausar / Retomar
    btnPausar.addEventListener('click', () => {
        estaPausado = !estaPausado;
        btnPausar.textContent = estaPausado ? "Retomar" : "Pausar";
        btnPausar.style.backgroundColor = estaPausado ? "#27ae60" : "";
        
        localStorage.setItem('pomodoro_pausado', estaPausado ? 'true' : 'false');

        // Se pausou, precisamos reajustar o endTime para não continuar contando na ausência
        if (estaPausado) {
            localStorage.removeItem('pomodoro_end_time');
            localStorage.setItem('pomodoro_tempo_restante_pausa', tempoRestante);
        } else {
            // Se retomou, calcula um novo horário de término baseado no tempo que faltava
            const novoTempoRestante = parseInt(localStorage.getItem('pomodoro_tempo_restante_pausa'));
            const novoEndTime = Date.now() + (novoTempoRestante * 1000);
            localStorage.setItem('pomodoro_end_time', novoEndTime);
        }
    });

    // Botão de Cancelar/Resetar
    btnResetar.addEventListener('click', () => {
        resetarInterface();
    });

    function resetarInterface() {
        clearInterval(timerInterval);
        localStorage.removeItem('pomodoro_end_time');
        localStorage.removeItem('pomodoro_pausado');
        localStorage.removeItem('pomodoro_tempo_restante_pausa');
        
        configBox.classList.remove('escondido');
        timerBox.classList.add('escondido');
        document.title = "Flashii ⚡ - Pomodoro";
    }
});