const ws = new WebSocket('ws://localhost:8000');
const chatbot_button = document.getElementById("chatbot-button")

async function sendMessage() {
    const userInput = document.getElementById("userInput");
    const message = `${userInput.value}`;
    ws.send(message);
}

async function displayMessage(message) {
    if (message.includes("*default")) {
        message = message.replace("*default", "")
        document.dispatchEvent(new Event("setDefault"));
    }

    // else if (message.includes("*kenarAyarla")) {
    //     message = message.replace("*kenarAyarla", "")
    //     let gelenKenar = message.split(" ");
    //     let gelenKenarValue = gelenKenar[gelenKenar.lenght - 1]
    //     localStorage.setItem("gelenKenar", gelenKenarValue);

    //     document.dispatchEvent(new Event("setKenar"));
    // }

    const userInput = document.getElementById("userInput");
    const messagesContainer = document.getElementById("messageContainer");
    const messagesDiv = document.getElementById("dynamic_message");
    const newMessageDiv = document.createElement("div");
    const bot_message = document.getElementById("bot_message");


    newMessageDiv.innerHTML = `<p><span>User: </span><span>${userInput.value}</span></p>`;
    bot_message.appendChild(newMessageDiv);
    userInput.value = "";
    const satir_olustur = document.createElement("div");

    satir_olustur.innerText = "Bot: ";
    bot_message.appendChild(satir_olustur)
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll'u en altta tut

    for (let harf of message) {
        satir_olustur.textContent += harf;
        await sleep(20);
    }
    satir_olustur.innerHTML += "<br><br>"
}


document.getElementById("userInput").addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

ws.addEventListener('message', (event) => {
    displayMessage(event.data);
});

chatbot_button.addEventListener("click", () => {
    if (chatbot_button.innerText == "x") {
        chatbot_button.innerText = "Chatbot"
        document.getElementById("chatBot").style.display = "none"
    }

    else {
        chatbot_button.innerText = "x"
        document.getElementById("chatBot").style.display = "block"
        document.getElementById("userInput").focus()
    }
})
