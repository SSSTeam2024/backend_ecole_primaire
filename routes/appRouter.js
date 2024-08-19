const Router = require("express");
const router = new Router();

const etudiantRoutes = require("./etudianttRoutes/etudiantRoutes");
const classeRoutes = require("./classeRoutes/classeRoutes");
const parentRoutes = require("./parentRoutes/parentRoutes");
const observationRoutes = require("./observationRoutes/observationRoutes");
const centralAppRoutes = require("./centralAppRoutes/centralAppRoutes");
const enseignantRoutes = require("./enseignantRoutes/enseignantRoutes");

router.use("/etudiants", etudiantRoutes);
router.use("/classes", classeRoutes);
router.use("/parents", parentRoutes);
router.use("/observations", observationRoutes);
router.use("/central", centralAppRoutes);
router.use("/enseignants", enseignantRoutes);
module.exports = router;
