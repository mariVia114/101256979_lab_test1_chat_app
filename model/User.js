const mongoose = require("mongoose");
const User = new mongoose.Schema({
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
User.pre("save", (next) => {
  console.log("Before Save");
  let now = Date.now();

  this.updatedat = now;
  // Set a value for createdAt only if it is null
  if (!this.created) {
    this.created = now;
  }

  // Call the next function in the pre-save chain
  next();
});

User.pre("findOneAndUpdate", (next) => {
  console.log("Before findOneAndUpdate");
  let now = Date.now();
  this.updatedat = now;
  console.log(this.updatedat);
  next();
});

User.post("init", (doc) => {
  console.log("%s has been initialized from the db", doc._id);
});

User.post("validate", (doc) => {
  console.log("%s has been validated (but not saved yet)", doc._id);
});

User.post("save", (doc) => {
  console.log("%s has been saved", doc._id);
});

User.post("remove", (doc) => {
  console.log("%s has been removed", doc._id);
});
module.exports = mongoose.model("Users", User);
