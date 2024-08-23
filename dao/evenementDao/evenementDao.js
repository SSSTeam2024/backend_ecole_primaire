const Evenement = require("../../models/evenementModel/evenementModel");

const createEvenement = async (evenementData) => {
  return await Evenement.create(evenementData);
};

const getEvenements = async () => {
  return await Evenement.find().populate("classes");
};

const updateEvenement = async (id, updateData) => {
  return await Evenement.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteEvenement = async (id) => {
  return await Evenement.findByIdAndDelete(id);
};

const getEvenementsByClasseId = async (classeId) => {
  const query = {
    classes: classeId,
  };
  return await Evenement.find(query).populate("classes");
};

module.exports = {
  createEvenement,
  getEvenements,
  updateEvenement,
  deleteEvenement,
  getEvenementsByClasseId,
};
