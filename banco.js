
const btnNovoBanco = document.getElementById('btn-novo-banco');
const gridBancos = document.getElementById('grid-bancos');


btnNovoBanco.addEventListener('click', () => {

  const nomeMateria = prompt("Digite o nome da matéria/baralho:") || "Nova Matéria";


  const novoCard = document.createElement('div');
  novoCard.classList.add('card');

  novoCard.innerHTML = `
    <div class="card-header">
      <span class="icon">📖</span>
      <span>${nomeMateria}</span>
    </div>
    <span class="badge-questoes">0 questões</span>
    <button class="btn-compartilhar">
      <svg 
      width="16"
       height="16" 
       viewBox="0 0 24 24" 
       fill="none" 
       stroke="currentColor" 
       stroke-width="2">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/>
      </svg>
      Compartilhar
    </button>
  `;


  gridBancos.appendChild(novoCard);
});