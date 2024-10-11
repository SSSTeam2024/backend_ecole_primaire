const noteService = require("../../services/notesServices/notesServices");

const createNote = async (req, res) => {
  try {
    const { classe, eleves, matiere, trimestre, type, date } = req.body;
    const newNote = await noteService.createNote({
      classe,
      eleves,
      matiere,
      trimestre,
      type,
      date,
    });
    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await noteService.getNotes();
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getNotesByEleveId = async (req, res) => {
  try {
    const { id: eleveId } = req.params;
    const notes = await noteService.getNotesByEleveId(eleveId);
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { updateData, eleves } = req.body;

    const elevesWithNotes = eleves.map((eleveData) => {
      const { eleve, note } = eleveData;
      return {
        eleve,
        note,
      };
    });

    updateData.eleves = elevesWithNotes;

    const updatedNote = await noteService.updateNote(id, updateData);

    if (!updatedNote) {
      return res.status(404).send("Note not found");
    }
    res.json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    const deletedNote = await noteService.deleteNote(noteId);

    if (!deletedNote) {
      return res.status(404).send("Note not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  getNotesByEleveId,
};
