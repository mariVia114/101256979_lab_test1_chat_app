const express = require("express");
const mongoose = require("mongoose");
const chatRouter = require("./routes/chatRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require('http').createServer(app);


//Server side socket
const io = require('socket.io')(http);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
  socket.emit("Welcome", "Welcome to the chat!")
  socket.broadcast.emit('message', 'A user has joined the chat')
  socket.on('disconnect',() =>{
    const message = {
      msg: 'User disconnected'
    }
    socket.broadcast.emit("message", message);
  })

  socket.on('message', (data, username) =>{
    const info = {
      from_user: username,
      message: data
    };
    socket.broadcast.emit('newInfo', info);
  })

  socket.on("userTyping", (data) => {
    if (data.typing == true) io.emit("show", data);
    else io.emit("show", data);
  });

  socket.on("room_message", (data) => {
    const alert = {
      from_user: data.from_user,
      message: data.message,
    };
    socket.broadcast.to(data.room).emit("newAlert", alert);
  });
})  

app.use(chatRouter);
app.use(userRouter);
http.listen(8000, () => {
  console.log(`Server is running at http://localhost:8000`);
});
