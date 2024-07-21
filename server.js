const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);


const port = 3000;
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));





app.get("/auth", (req, res) => {

    res.render("userauth.ejs");
})


app.get("/chatapp", (req, res) => {

    const name = req.query.user;
    console.log(name);
    
    

    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
 
//Run When Client Connects
io.on('connection', socket => {

    console.log("New client Connected");

    //Welcome current user
    socket.emit("message", "Welcome Current-User");


    //broadcast message except the joined client
    socket.broadcast.emit("message", "New User Connected");

    //to all the clients
    // io.emit("message", "Hello to All User");



    //Incoming message from client   and   sending to all the connected clients
    socket.on("IncomingData", data => {
        // console.log(data);
        io.emit("NewMessage", data);
    });


    //disconnect
    socket.on("disconnect", () => {

        io.emit("message", "User has left the chat");
    });

})



server.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})