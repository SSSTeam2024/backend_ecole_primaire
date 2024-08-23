const express = require("express");
const emploiController = require("../../controllers/emploiControllers/emploiControllers");

const router = express.Router();

router.post("/newEmploi", emploiController.createEmploi);
router.get("/getEmplois", emploiController.getEmplois);
router.delete("/deleteEmploi/:id", emploiController.deleteEmploi);
router.get("/emploi-classe-id/:id", emploiController.getEmploisByClasseId);

module.exports = router;
