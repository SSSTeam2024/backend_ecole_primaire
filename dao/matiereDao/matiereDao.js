const Matiere = require("../../models/matiereModel/matriereModel");
const Classe = require("../../models/classeModel/classeModel");
const Etudiant = require("../../models/etudiantModel/etudiantModel");

const createMatiere = async (matiereData) => {
  return await Matiere.create(matiereData);
};

const getMatieres = async () => {
  return await Matiere.find().populate("niveau");
};

const updateMatiere = async (id, updateData) => {
  return await Matiere.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteMatiere = async (id) => {
  return await Matiere.findByIdAndDelete(id);
};

const getMatieresByClasseId = async (classeId) => {
  const classe = await Classe.findById(classeId).populate("niveau");

  if (!classe || !classe.niveau) {
    throw new Error("Classe or associated Niveau not found");
  }

  return await Matiere.find({ niveau: classe.niveau._id }).populate("niveau");
};

const getMatieresByEtudiantId = async (etudiantId) => {
  const etudiant = await Etudiant.findById(etudiantId).populate({
    path: "classe",
    populate: {
      path: "niveau",
    },
  });

  if (!etudiant || !etudiant.classe || !etudiant.classe.niveau) {
    throw new Error("Etudiant, Classe, or Niveau not found");
  }

  return await Matiere.find({ niveau: etudiant.classe.niveau._id }).populate(
    "niveau"
  );
};

module.exports = {
  createMatiere,
  getMatieres,
  updateMatiere,
  deleteMatiere,
  getMatieresByClasseId,
  getMatieresByEtudiantId,
};
