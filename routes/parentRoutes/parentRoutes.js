const express = require("express");
const parentController = require("../../controllers/parentControllers/parentControllers");

const router = express.Router();

router.post("/newParent", parentController.createParent);
router.post("/login", parentController.login);
router.post("/logout/:id", parentController.logout);
router.post("/getParentByToken", parentController.getParentByJwtToken);
router.get("/getParent/:id", parentController.getParentById);
router.get("/getAllParents", parentController.getParents);
router.delete("/deleteParent/:id", parentController.deleteParent);

module.exports = router;
