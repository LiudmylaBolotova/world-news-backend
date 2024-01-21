const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const authSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 25,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      minlength: 7,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    // avatarURL: {
    //   type: String,
    //   required: true,
    // },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false }
);

authSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  email: Joi.string().min(5).max(255).required().pattern(emailRegexp),
  password: Joi.string().required().pattern(passwordRegexp),
});

const emailSchema = Joi.object({
  email: Joi.string().min(5).max(255).required().pattern(emailRegexp),
});

const loginSchema = Joi.object({
  email: Joi.string().min(5).max(255).required().pattern(emailRegexp),
  password: Joi.string().required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
};

const Auth = model("auth", authSchema);

module.exports = {
  Auth,
  schemas,
};
