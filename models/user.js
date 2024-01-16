const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
   
  },
  { versionKey: false }
);

// userSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  email: Joi.string().min(5).max(255).required().email(),
  phone: Joi.string()
    .regex(/^[0-9]{12}$/)
    .required(),
});

const schemas = {
  addSchema,

};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};