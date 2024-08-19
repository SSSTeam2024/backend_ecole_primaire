const Classe = require("../../models/classeModel/classeModel");

const createClasse = async (classeData) => {
  return await Classe.create(classeData);
};

const getClasses = async () => {
  return await Classe.find();
};

// const getEtudiantById = async (id) => {
//   return await Classe.findById(id);
// };

// const deleteEtudiant = async (id) => {
//   return await Classe.findByIdAndDelete(id);
// };

// const updateEtudiant = async (id, updateData) => {
//   return await Classe.findByIdAndUpdate(id, updateData, { new: true });
// };

module.exports = {
  createClasse,
  getClasses,
};
