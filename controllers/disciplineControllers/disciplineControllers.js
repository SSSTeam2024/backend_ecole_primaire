const disciplineService = require("../../services/disciplineServices/disciplineServices");
const globalFunctions = require("../../utils/globalFunctions");

const createDiscipline = async (req, res) => {
  try {
    const {
      eleve,
      type,
      texte,
      editeur,
      date,
      fichier_base64_string,
      fichier_extension,
    } = req.body;

    const disciplineFilesPath = "files/disciplineFiles/";

    let fichier = globalFunctions.generateUniqueFilename(
      fichier_extension,
      "Discipline"
    );

    let documents = [
      {
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: disciplineFilesPath,
      },
    ];

    const newDiscipline = await disciplineService.createDiscipline(
      {
        eleve,
        type,
        texte,
        editeur,
        date,
        fichier,
      },
      documents
    );
    res.status(201).json(newDiscipline);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteDiscipline = async (req, res) => {
  try {
    const disciplineId = req.params.id;

    const deleteDiscipline = await disciplineService.deleteDiscipline(
      disciplineId
    );

    if (!deleteDiscipline) {
      return res.status(404).send("Discipline not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getDisciplines = async (req, res) => {
  try {
    const disciplines = await disciplineService.getDisciplines();
    res.json(disciplines);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getDisciplinesByEleveId = async (req, res) => {
  try {
    const { id: eleveId } = req.params;
    const disciplines = await disciplineService.getDisciplineByEleveId(eleveId);
    res.json(disciplines);
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
  createDiscipline,
  deleteDiscipline,
  getDisciplines,
  getDisciplinesByEleveId,
  //   updateExercice,
};
