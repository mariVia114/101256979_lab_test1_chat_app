const mongoose = require('mongoose')
const Group = new mongoose.Schema(
    {
        from_user:{
            type:String,
            required: true
        },
        room:{
            type:String,
            required:true
        },
        message:{
            type:String,
            required:true
        },
        date_sent:{
            type:Date,
            default:Date.now
        }
        
    }
    
)
Group.pre("save", (next) => {
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

Group.pre("findOneAndUpdate", (next) => {
  console.log("Before findOneAndUpdate");
  let now = Date.now();
  this.updatedat = now;
  console.log(this.updatedat);
  next();
});

Group.post("init", (doc) => {
  console.log("%s has been initialized from the db", doc._id);
});

Group.post("validate", (doc) => {
  console.log("%s has been validated (but not saved yet)", doc._id);
});

Group.post("save", (doc) => {
  console.log("%s has been saved", doc._id);
});

Group.post("remove", (doc) => {
  console.log("%s has been removed", doc._id);
});
module.exports = mongoose.model("GroupMessage", Group);