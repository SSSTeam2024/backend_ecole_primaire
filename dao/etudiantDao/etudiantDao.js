const Etudiant = require("../../models/etudiantModel/etudiantModel");

const createEtudiant = async (etudiantData) => {
  return await Etudiant.create(etudiantData);
};

const getEtudiants = async () => {
  return await Etudiant.find().populate("parent");
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

module.exports = {
  createEtudiant,
  getEtudiantById,
  getEtudiants,
  deleteEtudiant,
  updateEtudiant,
};
