const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "please provide first name"],
  },
  lastName: {
    type: String,
    required: [true, "please provide last name"],
  },
  email: {
    type: String,
    required: [true, "please provide email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minlength: 6,
    select: false,
  },
  phone: String,
  address: String,
  role : {
    type : String,
    required : true
  }
});

UserSchema.pre("save", async function(next) {
  if(!this.isModified("password")){
      next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt);
  next();
})


UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}; 

UserSchema.methods.getSignedToken = function(){
  return jwt.sign({id : this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
};

const User = mongoose.model("User", UserSchema);
module.exports = User;

