const etudiantService = require("../../services/etudiantServices/etudiantServices");
const globalFunctions = require("../../utils/globalFunctions");

const createEtudiant = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      date_de_naissance,
      classe,
      parent,
      genre,
      avatar_base64_string,
      avatar_extension,
    } = req.body;

    const etudiantFilesPath = "files/etudiantFiles/";

    let avatar = globalFunctions.generateUniqueFilename(
      avatar_extension,
      "Avatar"
    );

    let documents = [
      {
        base64String: avatar_base64_string,
        extension: avatar_extension,
        name: avatar,
        path: etudiantFilesPath,
      },
    ];

    const newEtudiant = await etudiantService.createEtudiant(
      {
        nom,
        prenom,
        date_de_naissance,
        classe,
        parent,
        genre,
        avatar,
      },
      documents
    );
    res.status(201).json(newEtudiant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteEtudiant = async (req, res) => {
  try {
    const etudiantId = req.params.id;

    const deleteEtudiant = await etudiantService.deleteEtudiant(etudiantId);

    if (!deleteEtudiant) {
      return res.status(404).send("Etudiant not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEtudiants = async (req, res) => {
  try {
    const Etudiants = await etudiantService.getEtudiants();
    res.json(Etudiants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// const getEtudiantById = async (req, res) => {
//   try {
//     const DefectId = req.params.id;
//     const getDefect = await defectService.getDefectById(DefectId);
//     if (!getDefect) {
//       return res.status(404).send("Defect not found");
//     }
//     res.json(getDefect);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };

// const updateEtudiant = async (req, res) => {
//   try {
//     const DefectId = req.params.id;
//     const { vehicle, time, level, issue, defectStatus, note, date } = req.body;

//     const updatedDefect = await defectService.updateDefect(DefectId, {
//       vehicle,
//       time,
//       level,
//       issue,
//       defectStatus,
//       note,
//       date,
//     });

//     if (!updatedDefect) {
//       return res.status(404).send("Defect not found");
//     }
//     res.json(updatedDefect);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };

module.exports = {
  createEtudiant,
  deleteEtudiant,
  getEtudiants,
  // getEtudiantById,
  // updateEtudiant,
};
