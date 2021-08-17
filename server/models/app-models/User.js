require("dotenv").config();
const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: 2,
      maxlength: 40,
    },
    userName: {
      type: String,
      minlength: 2,
      maxlength: 40,
      required: [true, "Please provide a user name"],
      index: { unique: true, sparse: true },
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 1,
      maxlength: 255,
    }
  },
  { timestamps: true }
);

//hash password middleware
userSchema.pre("save", async function (next) { 
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//compare login password with hash one
userSchema.methods.matchesPassword = async function (password) { 
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () { 
  const token = jwt.sign(
    { _id: this._id, name: this.name },
    process.env.CHAT_JWT_KEY,
    { expiresIn: '1h' }
  );
  return token;
};


const User = mongoose.model("User", userSchema);


const userValidate = (input) => {
  const schema = {
    name: Joi.string().min(2).max(40).required(),
    userName: Joi.string().min(2).max(40).required(),
    password: Joi.string().min(1).max(255).required(),
  };
  return Joi.validate(input, schema);
};

const loginValidate = (input) => {
  const schema = {
      userName: Joi.string().min(2).max(40).required(),
      password: Joi.string().min(1).max(255).required(),
  }
  return Joi.validate(input, schema);
}


module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.userValidate = userValidate;
module.exports.loginValidate = loginValidate;
