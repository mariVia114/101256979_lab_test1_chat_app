const express = require("express");
const GroupModel = require("../model/Group");
const app = express();

app.get("/chats", (req, res) => {
  Chat.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.get("/room", (req, res) => {
  GroupModel.find({}, (err, message) => {
    res.send(message);
  });
});

app.post("/room", (req, res) => {
  const message = {
    from_user: req.body.from_user,
    room: req.body.room,
    message: req.body.message,
  };
  const groupMessage = new GroupModel(message);
  groupMessage.save((err) =>{
    if(err){
        console.log(err);
    }
  })
});

module.exports = app;
