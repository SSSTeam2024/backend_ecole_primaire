const express = require("express");
const evaluationsControllers = require("../../controllers/evaluationsControllers/evaluationsControllers");

const router = express.Router();

router.post("/createEvaluation", evaluationsControllers.createEvaluation);
router.get("/getEvaluations", evaluationsControllers.getEvaluations);
router.patch("/updateEvaluation/:id", evaluationsControllers.updateEvaluation);
router.delete("/deleteEvaluation/:id", evaluationsControllers.deleteEvaluation);
router.get(
  "/evaluation-eleve-id/:id",
  evaluationsControllers.getEvaluationsByEleveId
);

module.exports = router;
