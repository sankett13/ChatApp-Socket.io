const socket = io();

socket.on("message", (message)=>{
    console.log(message);
    displayGreetings(message);
    
})


socket.on("NewMessage",message=>{
    // console.log(message);
    displayMessage(message);
})




function sendMessage(){

    const username = document.getElementById("username").value;
    const message = document.getElementById("message").value;
    // console.log(username, message);
    
    if(username && message){
        const Incomingdata = {username , message};
        socket.emit("IncomingData", Incomingdata);
        console.log(Incomingdata);
        document.getElementById("message").value = "";

    }
    else{
        alert("Please Enter both Username and Message");
    }
}


function displayMessage(message){
    const chatbox = document.getElementById("chatbox");
    const messageElement = document.createElement("div");
    messageElement.textContent = `${message.username} : ${message.message}`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}



function displayGreetings(message){
    const chatbox = document.getElementById("chatbox");
    const messageElement = document.createElement("div");
    messageElement.textContent = `${message}`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}