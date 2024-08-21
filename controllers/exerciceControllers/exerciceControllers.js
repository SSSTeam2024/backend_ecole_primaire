const exerciceService = require("../../services/exerciceServices/exerciceServices");
const globalFunctions = require("../../utils/globalFunctions");

const createExercice = async (req, res) => {
  try {
    const {
      classes,
      titre,
      desc,
      creation_date,
      badge_date,
      enseignant,
      fichier_base64_string,
      fichier_extension,
    } = req.body;

    const exerciceFilesPath = "files/exerciceFiles/";

    let fichier = globalFunctions.generateUniqueFilename(
      fichier_extension,
      "Exercice"
    );

    let documents = [
      {
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: exerciceFilesPath,
      },
    ];

    const newExercice = await exerciceService.createExercice(
      {
        classes,
        titre,
        desc,
        creation_date,
        badge_date,
        enseignant,
        fichier,
      },
      documents
    );
    res.status(201).json(newExercice);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// const deleteExercice = async (req, res) => {
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

const getExercices = async (req, res) => {
  try {
    const exercices = await exerciceService.getExercices();
    res.json(exercices);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// const updateExercice = async (req, res) => {
//   try {
//     const etudiantId = req.params.id;
//     const {
//       nom,
//       prenom,
//       date_de_naissance,
//       classe,
//       parent,
//       genre,
//       avatar_base64_string,
//       avatar_extension,
//     } = req.body;

//     const etudiantFilesPath = "files/etudiantFiles/";

//     let avatar = globalFunctions.generateUniqueFilename(
//       avatar_extension,
//       "Avatar"
//     );

//     let etudiantBody = {
//       nom,
//       prenom,
//       date_de_naissance,
//       classe,
//       parent,
//       genre,
//     };

//     let documents = [];

//     if (avatar_base64_string) {
//       documents.push({
//         base64String: avatar_base64_string,
//         extension: avatar_extension,
//         name: avatar,
//         path: etudiantFilesPath,
//       });
//     }

//     if (avatar_base64_string) {
//       etudiantBody.avatar = avatar;
//     }
//     const etudiant = await etudiantService.updateEtudiant(
//       etudiantId,
//       etudiantBody,
//       documents
//     );

//     res.status(200).json(etudiant);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };

module.exports = {
  createExercice,
  //   deleteExercice,
  getExercices,
  //   updateExercice,
};
