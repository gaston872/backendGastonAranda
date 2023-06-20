import mongoose from "mongoose";
import { chatModel } from "../../DAOs/models/chat.model";

const connection = mongoose.connect('mongodb+srv://gaston872:32981170axsc@cluster0.svhmcqq.mongodb.net/?retryWrites=true&w=majority')
//SOCKET = TODOS LOS EVENTOS DEL FRONT END QUE SERAN ENVIADOS AL SERVIDORT
const socket = io() 

//DOM ELEMENTS
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', function () {
    socket.emit('chat:message', {
        message: message.value,
        username: username.value
    });

    message.innerHTML = '';
    
});

message.addEventListener('keypress', function () {
    socket.emit('chat:typing', username.value)
})

//ESCUCHA DESDE EL CLIENTE LOS DATOS   
socket.on('chat:message', function (data) {
    //USA LOS DATOS PARA PINTARLOS EN EL HTML
    actions.innerHTML = '';
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`

    message.innerHTML = '';

});

socket.on('chat:typing', function (data) {
    actions.innerHTML = `<p><em>${data} está escribiendo un mensaje</em></p>`
})