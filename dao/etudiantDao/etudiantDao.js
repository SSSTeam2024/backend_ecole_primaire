const Etudiant = require("../../models/etudiantModel/etudiantModel");
const Parent = require("../../models/parentModel/parentModel");

const createEtudiant = async (etudiantData) => {
  return await Etudiant.create(etudiantData);
};

const getEtudiants = async () => {
  return await Etudiant.find().populate("parent").populate("classe");
};

const getEtudiantById = async (id) => {
  return await Etudiant.findById(id);
};

const deleteEtudiant = async (id) => {
  return await Etudiant.findByIdAndDelete(id);
};

const updateEtudiant = async (id, updateData) => {
  return await Etudiant.findByIdAndUpdate(id, updateData, { new: true });
};

const updateEtudiantParentAssignment = async (etudiantId, newParentId) => {
  // Find the student by ID
  const etudiant = await Etudiant.findById(etudiantId);

  if (!etudiant) {
    throw new Error("Etudiant not found");
  }

  // If the student already has a parent, remove the student from the old parent's "fils" array
  if (etudiant.parent) {
    await Parent.findByIdAndUpdate(etudiant.parent, {
      $pull: { fils: etudiantId },
    });
  }

  // Add the student to the new parent's "fils" array
  await Parent.findByIdAndUpdate(newParentId, {
    $addToSet: { fils: etudiantId },
  });

  // Update the student's parent reference
  etudiant.parent = newParentId;
  return await etudiant.save();
};

module.exports = {
  createEtudiant,
  getEtudiantById,
  getEtudiants,
  deleteEtudiant,
  updateEtudiant,
  updateEtudiantParentAssignment,
};
