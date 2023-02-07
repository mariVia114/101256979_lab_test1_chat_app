const express = require("express");
const mongoose = require("mongoose");
const chatRouter = require("./routes/chatRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require('http')
const server = http.createServer(app);
const path = require('path')
const socketio = require('socket.io')
const formatMessage = require('./utils/message')


//Server side socket
const io = socketio(server);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'pages')));
//Connect app to mongoDB
//TODO - Replace you Connection String here
mongoose
  .connect(
    "mongodb+srv://marie:vianca@cluster0.cmkzudn.mongodb.net/chat_db?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((success) => {
    console.log("Success Mongodb connection");
  })
  .catch((err) => {
    console.log("Error Mongodb connection");
  });


io.on('connection', (socket) =>{
  console.log('New WS connection')
  socket.emit("message", formatMessage('ChatCord', "Welcome to the chat!"))
  socket.broadcast.emit('message', formatMessage('ChatCord','A user has joined the chat'))
  socket.on('disconnect',() =>{
    io.emit('message', formatMessage('ChatCord','A user has left the chat'));
  })

  socket.on('chatMessage', (msg) =>{
    io.emit('message' ,formatMessage(`USER`, msg));
  })
  
})  

app.use(chatRouter);
app.use(userRouter);
server.listen(8000, () => {
  console.log(`Server is running at http://localhost:8000`);
});
