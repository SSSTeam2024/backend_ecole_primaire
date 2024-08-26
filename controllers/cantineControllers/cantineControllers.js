const cantineServices = require("../../services/cantineServices/cantineServices");
const globalFunctions = require("../../utils/globalFunctions");

const createCantine = async (req, res) => {
  try {
    const {
      jour,
      repas,
      desc,
      creation_date,
      fichier_base64_string,
      fichier_extension,
    } = req.body;

    const cantineFilesPath = "files/cantineFiles/";

    let fichier = globalFunctions.generateUniqueFilename(
      fichier_extension,
      "Cantine"
    );

    let documents = [
      {
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: cantineFilesPath,
      },
    ];

    const newCantine = await cantineServices.createCantine(
      {
        jour,
        repas,
        desc,
        creation_date,
        fichier,
      },
      documents
    );
    res.status(201).json(newCantine);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getCantines = async (req, res) => {
  try {
    const cantines = await cantineServices.getCantines();
    res.json(cantines);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteCantine = async (req, res) => {
  try {
    const cantineId = req.params.id;

    const deleteCantine = await cantineServices.deleteCantine(cantineId);

    if (!deleteCantine) {
      return res.status(404).send("Cantine not found");
    }
    res.sendStatus(200);
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
//     const etudiant = await cantineServices.updateEtudiant(
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
  createCantine,
  deleteCantine,
  getCantines,
  //   updateAvis,
};
