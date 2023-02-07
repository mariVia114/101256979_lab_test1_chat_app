const express = require('express');
const userModel = require('../model/User');
const app = express();
const path = require('path');

app.get("/users", async (req, res) => {
  const users = await userModel.find({});
  try {
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/register', async(req, res) =>{
    res.sendFile(path.join(__dirname, "../pages/register.html"));
});

app.post('/register', async(req,res) =>{
  const user = new userModel(req.body);
  try {
    await user.save((error) => {
      if (error) {
        res.send(error);
      } else {
        res.sendFile(path.join(__dirname, "../pages/login.html"));
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
  res.sendFile(path.join(__dirname, "../pages/login.html"));
})

app.get('/', async(req, res) =>{
    res.sendFile(path.join(__dirname, "../pages/login.html"));
})

app.get("/login", async (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/login.html"));
});

app.post('/login', async(req,res)=>{
    const user = await userModel.findOne({username: req.body.username, password: req.body.password});
    try{
        if(user == null){
            res.send(JSON.stringify({message: "User credentials does not exist"}));
        }else{
            res.cookie('username', user.username);
            res.sendFile(path.join(__dirname, "../pages/index.html"));
        }
    }catch(error){
        res.status(400).send(error)
    }
});

app.get("/logout", async (req, res) => {
  res.clearCookie("username");
  res.sendFile(path.join(__dirname, "../pages/login.html"));
});

module.exports = app;