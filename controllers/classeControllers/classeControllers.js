const classeService = require("../../services/classeServices/classeServices");

const createClasse = async (req, res) => {
  try {
    const { nom_classe } = req.body;
    const newClasse = await classeService.createClasse({
      nom_classe,
    });
    res.status(201).json(newClasse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// const deleteEtudiant = async (req, res) => {
//   try {
//     const etudiantId = req.params.id;

//     const deleteEtudiant = await etudiantService.deleteEtudiant(etudiantId);

//     if (!deleteEtudiant) {
//       return res.status(404).send("Etudiant not found");
//     }
//     res.sendStatus(200);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };
const getClasses = async (req, res) => {
  try {
    const Classes = await classeService.getClasses();
    res.json(Classes);
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
  createClasse,
  getClasses,
  // getEtudiantById,
  // updateEtudiant,
};
