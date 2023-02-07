const express = require("express");
const mongoose = require("mongoose");
// const chatRouter = require("./routes/chatRouter.js");

const app = express();
app.use(express.json());

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

// app.use(chatRouter);

app.listen(8000, () => {
  console.log("Server is running...");
});
