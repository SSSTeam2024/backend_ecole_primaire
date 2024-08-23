const evenementService = require("../../services/evenementServices/evenementServices");
const globalFunctions = require("../../utils/globalFunctions");

const createEvenement = async (req, res) => {
  try {
    const {
      classes,
      titre,
      desc,
      type,
      creation_date,
      fichier_base64_string,
      fichier_extension,
    } = req.body;

    const evenementFilesPath = "files/evenementFiles/";

    let fichier = globalFunctions.generateUniqueFilename(
      fichier_extension,
      "Evenement"
    );

    let documents = [
      {
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: evenementFilesPath,
      },
    ];

    const newEvenement = await evenementService.createEvenement(
      {
        classes,
        titre,
        desc,
        type,
        creation_date,
        fichier,
      },
      documents
    );
    res.status(201).json(newEvenement);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEvenements = async (req, res) => {
  try {
    const evenements = await evenementService.getEvenements();
    res.json(evenements);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteEvenement = async (req, res) => {
  try {
    const evenementId = req.params.id;

    const deleteEvenement = await evenementService.deleteEvenement(evenementId);

    if (!deleteEvenement) {
      return res.status(404).send("Evenement not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEvenementsByClasseId = async (req, res) => {
  try {
    const { id: classeId } = req.params;
    const evenement = await evenementService.getEvenementsByClasseId(classeId);
    res.json(evenement);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// const updateAvis = async (req, res) => {
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
  createEvenement,
  deleteEvenement,
  getEvenements,
  getEvenementsByClasseId,
  //   updateAvis,
};
