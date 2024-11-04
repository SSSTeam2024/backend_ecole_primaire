const express = require("express");
const sortieControllers = require("../../controllers/sortieControllers/sortieControllers");

const router = express.Router();

router.post("/createSortie", sortieControllers.createSortie);
router.get("/getSorties", sortieControllers.getSorties);
router.patch("/updateSortie/:id", sortieControllers.updateSortie);
router.delete("/deleteSortie/:id", sortieControllers.deleteSortie);
router.get("/sortiesByEleveId/:id", sortieControllers.getSortiesByEleveId);
module.exports = router;
