const express = require("express");
const salleControllers = require("../../controllers/salleControllers/salleControllers");

const router = express.Router();

router.post("/createSalle", salleControllers.createSalle);
router.get("/getSalles", salleControllers.getSalles);
router.patch("/updateSalle/:id", salleControllers.updateSalle);
router.delete("/deleteSalle/:id", salleControllers.deleteSalle);

module.exports = router;
