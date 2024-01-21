const express = require("express");
const ctrl = require("../../controllers/users");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/filter", authenticate, isValidId, ctrl.getFilter);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.put("/:id", authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch(
    "/:id/favorite",
    authenticate, 
    isValidId,
    validateBody(schemas.updateFavoriteSchema),
    ctrl.updateStatusUser
  );

router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

module.exports = router;