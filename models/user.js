const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+\d{1,4}\d{6,}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 25,
      required: true,
    },
    email: {
      type: String,
      match: emailRegex,
      required: true,
    },
    phone: {
      type: String,
      match: phoneRegex,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  email: Joi.string().regex(emailRegex).required().email(),
  phone: Joi.string()
    .regex(phoneRegex)
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};