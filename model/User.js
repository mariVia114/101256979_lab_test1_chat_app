const mongoose = require("mongoose");
const User = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createOn: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Users", User);
