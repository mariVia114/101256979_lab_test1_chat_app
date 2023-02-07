const mongoose = require("mongoose");
const Private = new mongoose.Schema({
  from_user: {
    type: String,
    required: true,
  },
  to_user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date_sent: {
    type: Date,
    default: Date.now,
  },
});
Private.pre("save", (next) => {
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

Private.pre("findOneAndUpdate", (next) => {
  console.log("Before findOneAndUpdate");
  let now = Date.now();
  this.updatedat = now;
  console.log(this.updatedat);
  next();
});

Private.post("init", (doc) => {
  console.log("%s has been initialized from the db", doc._id);
});

Private.post("validate", (doc) => {
  console.log("%s has been validated (but not saved yet)", doc._id);
});

Private.post("save", (doc) => {
  console.log("%s has been saved", doc._id);
});

Private.post("remove", (doc) => {
  console.log("%s has been removed", doc._id);
});
module.exports = mongoose.model("PrivateMessage", Private);
