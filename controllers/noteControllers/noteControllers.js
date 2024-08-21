const noteService = require("../../services/notesServices/notesServices");

const createNote = async (req, res) => {
  try {
    const { eleve, matiere, trimestre, type, note, date } = req.body;
    const newNote = await noteService.createNote({
      eleve,
      matiere,
      trimestre,
      type,
      note,
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

// const updateMatiere = async (req, res) => {
//   try {
//     const matiereId = req.params.id;
//     const { nom_matiere } = req.body;

//     const updatedMatiere = await matiereService.updateMatiere(matiereId, {
//       nom_matiere,
//     });

//     if (!updatedMatiere) {
//       return res.status(404).send("Matiere not found");
//     }
//     res.json(updatedMatiere);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };

// const deleteMatiere = async (req, res) => {
//   try {
//     const matiereId = req.params.id;

//     const deletedMatiere = await matiereService.deleteMatiere(matiereId);

//     if (!deletedMatiere) {
//       return res.status(404).send("Matiere not found");
//     }
//     res.sendStatus(200);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };

module.exports = {
  createNote,
  getNotes,
  //   updateMatiere,
  //   deleteMatiere,
};
