const bcrypt = require("bcryptjs");
// const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
// const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const { Auth } = require("../models/auth");
const { ctrlWrapper, HttpError} = require("../helpers");

const { SECRET_KEY, BASE_URL } = process.env;
// const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await Auth.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  // const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();

  const newUser = await Auth.create({
    ...req.body,
    password: hashPassword,
    // avatarURL,
    verificationCode,
  });
  // const verifyEmail = {
  //   to: email,
  //   from: "liudmylabolotova@ukr.net",
  //   subject: "Verify email",
  //   html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`,
  // };

  // await nodemailerEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      // subscription: newUser.subscription,
    },
  });
};

// const verifyEmail = async (req, res) => {
//   const { verificationCode } = req.params;
//   const user = await Auth.findOne({ verificationCode });
//   if (!user) {
//     throw HttpError(404, "User not found");
//   }
//   await Auth.findByIdAndUpdate(user._id, {
//     verify: true,
//     verificationCode: null,
//   });

//   res.json({
//     message: "Verification successful",
//   });
// };

// const resendVerifyEmail = async (req, res) => {
//   const { email } = req.body;
//   const user = await Auth.findOne({ email });
//   if (!user) {
//     throw HttpError(400, "Missing required field email");
//   }
//   if (user.verify) {
//     throw HttpError(400, "Verification has already been passed");
//   }

//   const verifyEmail = {
//     to: email,
//     from: "liudmylabolotova@ukr.net",
//     subject: "Verify email",
//     html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click verify email</a>`,
//   };
//   await nodemailerEmail(verifyEmail);

//   res.join({
//     message: "Verification successful",
//   });
// };

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Auth.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  // if (!user.verify) {
  //   throw HttpError(404, "User not found");
  // }
  const passwordCompare = bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await Auth.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
    },
  });
};

// const getCurrent = async (req, res) => {
//   const { email } = req.user;
//   res.json({ email });
// };

// const logout = async (req, res) => {
//   const { _id } = req.user;
//   await Auth.findByIdAndUpdate(_id, { token: " " });
//   res.json({
//     message: "Logout success",
//   });
// };

// const updateAvatar = async (req, res) => {
//   const { _id } = req.user;
//   const { path: tempUpload, originalname } = req.file;

//   await Jimp.read(tempUpload).then((image) =>
//     image.resize(250, 250).write(`${tempUpload}`)
//   );

//   const filename = `${_id}_${originalname}`;
//   const resultUpload = path.join(avatarsDir, filename);

//   await fs.rename(tempUpload, resultUpload);
//   const avatarURL = path.join("avatars", filename);
//   await Auth.findByIdAndUpdate(_id, { avatarURL });

//   res.json({
//     avatarURL,
//   });
// };

module.exports = {
  register: ctrlWrapper(register),
//   verifyEmail: ctrlWrapper(verifyEmail),
//   resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
//   getCurrent: ctrlWrapper(getCurrent),
//   logout: ctrlWrapper(logout),
//   updateAvatar: ctrlWrapper(updateAvatar),
};