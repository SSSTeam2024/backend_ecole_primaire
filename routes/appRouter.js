const Router = require("express");
const router = new Router();

const etudiantRoutes = require("./etudianttRoutes/etudiantRoutes");
const classeRoutes = require("./classeRoutes/classeRoutes");
const parentRoutes = require("./parentRoutes/parentRoutes");
const observationRoutes = require("./observationRoutes/observationRoutes");
const centralAppRoutes = require("./centralAppRoutes/centralAppRoutes");
const enseignantRoutes = require("./enseignantRoutes/enseignantRoutes");
const exerciceRoutes = require("./exerciceRoutes/exerciceRoutes");
const disciplineRoutes = require("./disciplineRoutes/disciplineRoutes");
const emploiRoutes = require("./emploiRoutes/emploiRoutes");
const matiereRoutes = require("./matiereRoutes/matiereRoutes");
const noteRoutes = require("./noteRoutes/noteRoutes");
const carnetRoutes = require("./carnetRoutes/carnetRoutes");

router.use("/etudiants", etudiantRoutes);
router.use("/classes", classeRoutes);
router.use("/parents", parentRoutes);
router.use("/observations", observationRoutes);
router.use("/central", centralAppRoutes);
router.use("/enseignants", enseignantRoutes);
router.use("/exercices", exerciceRoutes);
router.use("/disciplines", disciplineRoutes);
router.use("/emplois", emploiRoutes);
router.use("/matieres", matiereRoutes);
router.use("/notes", noteRoutes);
router.use("/carnets", carnetRoutes);

module.exports = router;