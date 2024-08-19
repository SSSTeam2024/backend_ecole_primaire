const express = require("express");
const centralAppController = require("../../controllers/centralAppControllers/centralAppControllers");

const router = express.Router();

router.post("/newCentralApp", centralAppController.registerCentralApp);
router.post("/login", centralAppController.login);
router.post("/logout/:id", centralAppController.logout);
router.post(
  "/getCentralAppByToken",
  centralAppController.getCentralAppByJwtToken
);
router.get("/getParent/:id", centralAppController.getAccountById);

module.exports = router;
