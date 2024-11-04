const express = require("express");
const retardControllers = require("../../controllers/retardControllers/retardControllers");

const router = express.Router();

router.post("/createRetard", retardControllers.createRetard);
router.get("/getRetards", retardControllers.getRetards);
router.patch("/updateRetard/:id", retardControllers.updateRetard);
router.delete("/deleteRetard/:id", retardControllers.deleteRetard);
router.get("/retardByEleveId/:id", retardControllers.getRetardByEleveId);
module.exports = router;
