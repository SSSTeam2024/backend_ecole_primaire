const express = require("express");
const classeController = require("../../controllers/classeControllers/classeControllers");

const router = express.Router();

router.post("/newClasse", classeController.createClasse);
router.get("/getClasses", classeController.getClasses);
router.patch("/updateClasse/:id", classeController.updateClasse);
router.delete("/deleteClasse/:id", classeController.deleteClasse);
router.get("/getClasse/:id", classeController.getClasseById);

module.exports = router;
