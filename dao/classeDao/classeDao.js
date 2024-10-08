const Classe = require("../../models/classeModel/classeModel");

const createClasse = async (classeData) => {
  return await Classe.create(classeData);
};

const getClasses = async () => {
  return await Classe.find().populate("niveau");
};

const updateClasse = async (id, updateData) => {
  return await Classe.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteClasse = async (id) => {
  return await Classe.findByIdAndDelete(id);
};

const getClasseById = async (id) => {
  return await Classe.findById(id).populate("niveau");
};

module.exports = {
  createClasse,
  getClasses,
  deleteClasse,
  updateClasse,
  getClasseById,
};
