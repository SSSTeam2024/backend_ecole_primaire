const messagerieServices = require("../../services/messagerieServices/messagerieServices");
const globalFunctions = require("../../utils/globalFunctions");

const createMessagerie = async (req, res) => {
  try {
    const {
      msg,
      sender,
      receiver,
      date,
      heure,
      fichier_base64_string = [],
      fichier_extension = [],
    } = req.body;

    const msgFilesPath = "files/msgFiles/";

    const fichiers = fichier_extension.map((ext, index) =>
      globalFunctions.generateUniqueFilename(ext, `Message${index}`)
    );

    let documents = [
      ...fichier_base64_string.map((base64String, index) => ({
        base64String: base64String,
        extension: fichier_extension[index],
        name: fichiers[index],
        path: msgFilesPath,
      })),
    ];

    const newMessagerie = await messagerieServices.createMessagerie(
      {
        msg,
        sender,
        receiver,
        date,
        heure,
        fichiers,
      },
      documents
    );
    res.status(201).json(newMessagerie);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getMessageries = async (req, res) => {
  try {
    const messages = await messagerieServices.getMessageries();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteMessagerie = async (req, res) => {
  try {
    const msgId = req.params.id;

    const deleteMessagerie = await messagerieServices.deleteMessagerie(msgId);

    if (!deleteMessagerie) {
      return res.status(404).send("Message not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// const updateMessagerie = async (req, res) => {
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

const getMessageriesByParentId = async (req, res) => {
  try {
    const parentId = req.params.id;
    const messages = await messagerieServices.getMessageriesByParentId(
      parentId
    );

    if (!messages) {
      return res.status(404).send("This parents does not have any message!!");
    }

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createMessagerie,
  getMessageries,
  deleteMessagerie,
  //   updateMessagerie,
  getMessageriesByParentId,
};
