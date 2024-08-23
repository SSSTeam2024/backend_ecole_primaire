const CompteRendu = require("../../models/compteRenduModel/compteRenduModel");

const createCompteRendu = async (compteRenduData) => {
  return await CompteRendu.create(compteRenduData);
};

const getCompteRendus = async () => {
  return await CompteRendu.find()
    .populate("classe")
    .populate("matiere")
    .populate("enseignant");
};

const updateCompteRendu = async (id, updateData) => {
  return await CompteRendu.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCompteRendu = async (id) => {
  return await CompteRendu.findByIdAndDelete(id);
};

const getCompteRendusByClasseId = async (classeId) => {
  const query = {
    classe: classeId,
  };
  return await CompteRendu.find(query)
    .populate("classe")
    .populate("matiere")
    .populate("enseignant");
};

module.exports = {
  createCompteRendu,
  getCompteRendus,
  updateCompteRendu,
  deleteCompteRendu,
  getCompteRendusByClasseId,
};
