const express = require("express");
const noteController = require("../../controllers/noteControllers/noteControllers");

const router = express.Router();

router.post("/newNote", noteController.createNote);
router.get("/getNotes", noteController.getNotes);
// router.patch("/updateMatiere/:id", noteController.updateMatiere);
// router.delete("/deleteMatiere/:id", noteController.deleteMatiere);

module.exports = router;
