const compteRenduService = require("../../services/compteRenduServices/compteRenduServices");
const globalFunctions = require("../../utils/globalFunctions");

const createCompteRendu = async (req, res) => {
  try {
    const {
      classe,
      matiere,
      enseignant,
      titre,
      desc,
      creation_date,
      fichier_base64_string,
      fichier_extension,
    } = req.body;

    const compteRenduFilesPath = "files/compteRenduFiles/";

    let fichier = globalFunctions.generateUniqueFilename(
      fichier_extension,
      "CompteRendu"
    );

    let documents = [
      {
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: compteRenduFilesPath,
      },
    ];

    const newCompteRendu = await compteRenduService.createCompteRendu(
      {
        classe,
        matiere,
        enseignant,
        titre,
        desc,
        creation_date,
        fichier,
      },
      documents
    );
    res.status(201).json(newCompteRendu);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getCompteRendus = async (req, res) => {
  try {
    const compteRendu = await compteRenduService.getCompteRendus();
    res.json(compteRendu);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteCompteRendu = async (req, res) => {
  try {
    const compteRenduId = req.params.id;

    const deleteCompteRendu = await compteRenduService.deleteCompteRendu(
      compteRenduId
    );

    if (!deleteCompteRendu) {
      return res.status(404).send("CompteRendu not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getCompteRendusByClasseId = async (req, res) => {
  try {
    const { id: classeId } = req.params;
    const compteRendu = await compteRenduService.getCompteRendus(classeId);
    res.json(compteRendu);
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
  createCompteRendu,
  deleteCompteRendu,
  getCompteRendus,
  getCompteRendusByClasseId,
  //   updateAvis,
};
