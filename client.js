//this is diff from index.js which was used for nodejs backend

const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

var audio = new Audio("ting.mp3");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
};
const Name = prompt("Enter your name");
socket.emit("new-user-joined", Name);

socket.on('user-joined', (Name) => {
    append(`${Name} joined the chat`, 'right');
});
socket.on('recieve', (data) => {
    append(`${data.Name}: ${data.message}`, 'left');
});
socket.on('left', (Name) => {
    append(`${Name} left the chat`, 'right');
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = "";
});
