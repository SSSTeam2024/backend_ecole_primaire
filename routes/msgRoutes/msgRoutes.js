const express = require("express");
const messagerieControllers = require("../../controllers/messagerieControllers/messagerieControllers");

const router = express.Router();

router.post("/newMessagerie", messagerieControllers.createMessagerie);
router.get("/getMessageries", messagerieControllers.getMessageries);
// router.patch("/updateMatiere/:id", messagerieControllers.updateMatiere);
router.delete("/deleteMessagerie/:id", messagerieControllers.deleteMessagerie);

module.exports = router;
