const Etudiant = require("../../models/etudiantModel/etudiantModel");
const Parent = require("../../models/parentModel/parentModel");

const createEtudiant = async (etudiantData) => {
  return await Etudiant.create(etudiantData);
};

const getEtudiants = async () => {
  return await Etudiant.find().populate("parent").populate("classe");
};

const getEtudiantById = async (id) => {
  return await Etudiant.findById(id).populate("parent");
};

const deleteEtudiant = async (id) => {
  return await Etudiant.findByIdAndDelete(id);
};

const updateEtudiant = async (id, updateData) => {
  return await Etudiant.findByIdAndUpdate(id, updateData, { new: true });
};

const updateEtudiantParentAssignment = async (etudiantId, newParentId) => {
  const etudiant = await Etudiant.findById(etudiantId);

  if (!etudiant) {
    throw new Error("Etudiant not found");
  }

  if (etudiant.parent) {
    await Parent.findByIdAndUpdate(etudiant.parent, {
      $pull: { fils: etudiantId },
    });
  }

  await Parent.findByIdAndUpdate(newParentId, {
    $addToSet: { fils: etudiantId },
  });

  etudiant.parent = newParentId;
  return await etudiant.save();
};

const getEtudiantsByClasseId = async (classeId) => {
  const query = {
    classe: classeId,
  };
  return await Etudiant.find(query).populate("classe").populate("parent");
};

const updateStatusPaiement = async (id, paiement) => {
  return await Etudiant.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        statusPaiement: paiement,
      },
    }
  );
};

module.exports = {
  createEtudiant,
  getEtudiantById,
  getEtudiants,
  deleteEtudiant,
  updateEtudiant,
  updateEtudiantParentAssignment,
  getEtudiantsByClasseId,
  updateStatusPaiement,
};
