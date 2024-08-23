const documentService = require("../../services/documentServices/documentServices");
const globalFunctions = require("../../utils/globalFunctions");

const createDocument = async (req, res) => {
  try {
    const {
      classes,
      titre,
      desc,
      creation_date,
      fichier_base64_string,
      fichier_extension,
    } = req.body;

    const documentFilesPath = "files/documentFiles/";

    let fichier = globalFunctions.generateUniqueFilename(
      fichier_extension,
      "Document"
    );

    let documents = [
      {
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: documentFilesPath,
      },
    ];

    const newDocument = await documentService.createDocument(
      {
        classes,
        titre,
        desc,
        creation_date,
        fichier,
      },
      documents
    );
    res.status(201).json(newDocument);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getDocuments = async (req, res) => {
  try {
    const documents = await documentService.getDocuments();
    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteDocument = async (req, res) => {
  try {
    const documentId = req.params.id;

    const deleteDocument = await documentService.deleteDocument(documentId);

    if (!deleteDocument) {
      return res.status(404).send("Document not found");
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
  createDocument,
  deleteDocument,
  getDocuments,
  //   updateAvis,
};
