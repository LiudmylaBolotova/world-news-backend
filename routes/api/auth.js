const express = require("express");
const { schemas } = require("../../models/auth");
const ctrl = require("../../controllers/auth");
const { validateBody } = require("../../middlewares");
const router = express.Router();


router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
// router.post("/logout", ctrl.logout);
// router.get("/current", ctrl.current);
// router.get("/verify/:verificationToken", ctrl.verify);
// router.post("/verify", validateBody(schemas.emailSchema), ctrl.verifyEmail);
// router.post("/verify", validateBody(schemas.emailSchema), ctrl.verifyEmail);

module.exports = router;