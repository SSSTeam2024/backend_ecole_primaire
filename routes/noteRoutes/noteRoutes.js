const express = require("express");
const noteController = require("../../controllers/noteControllers/noteControllers");

const router = express.Router();

router.post("/newNote", noteController.createNote);
router.get("/getNotes", noteController.getNotes);
// router.patch("/updateMatiere/:id", noteController.updateMatiere);
router.delete("/deleteNote/:id", noteController.deleteNote);
router.get("/note-eleve-id/:id", noteController.getNotesByEleveId);

module.exports = router;
