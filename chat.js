document.addEventListener("DOMContentLoaded", () => {
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");
    const chatMessages = document.querySelector(".chat-messages");

   
    function enviarMensagem() {
        const messageText = chatInput.value.trim();

      
        if (messageText === "") return;

      
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", "sent"); 

       
        const horario = new Date();
        const timeString = horario.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

       
        messageDiv.innerHTML = `
            <p>${messageText}</p>
            <span class="time">${timeString}</span>
        `;


        chatMessages.appendChild(messageDiv);

        
        chatInput.value = "";

  
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

  
    sendBtn.addEventListener("click", enviarMensagem);


    chatInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            enviarMensagem();
        }
    });
});