const express = require("express");
const cantineControllers = require("../../controllers/cantineControllers/cantineControllers");

const router = express.Router();

router.post("/createCantine", cantineControllers.createCantine);
router.get("/getCantines", cantineControllers.getCantines);
router.patch("/updateCantine/:id", cantineControllers.updateCantine);
router.delete("/deleteCantine/:id", cantineControllers.deleteCantine);

module.exports = router;
