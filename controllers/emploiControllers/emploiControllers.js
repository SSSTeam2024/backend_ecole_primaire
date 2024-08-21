const emploiService = require("../../services/emploiServices/emploiServices");
const globalFunctions = require("../../utils/globalFunctions");

const createEmploi = async (req, res) => {
  try {
    const { titre, date, image_base64_string, image_extension } = req.body;

    const emploiFilesPath = "files/emploiFiles/";

    let image = globalFunctions.generateUniqueFilename(
      image_extension,
      "Emploi"
    );

    let documents = [
      {
        base64String: image_base64_string,
        extension: image_extension,
        name: image,
        path: emploiFilesPath,
      },
    ];

    const newEmploi = await emploiService.createEmploi(
      {
        titre,
        date,
        image,
      },
      documents
    );
    res.status(201).json(newEmploi);
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

const getEmplois = async (req, res) => {
  try {
    const emplois = await emploiService.getEmplois();
    res.json(emplois);
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
  createEmploi,
  //   deleteExercice,
  getEmplois,
  //   updateExercice,
};
