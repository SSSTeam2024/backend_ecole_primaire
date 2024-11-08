const Retard = require("../../models/retardModel/retardModel");

const createRetard = async (retardData) => {
  const retard = await Retard.create(retardData);
  return await Retard.findById(retard._id).populate("id_eleve");
};

const getRetards = async () => {
  return await Retard.find().populate("id_eleve");
};

const updateRetard = async (id, updateData) => {
  return await Retard.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteRetard = async (id) => {
  return await Retard.findByIdAndDelete(id);
};

const getRetardsByEleveId = async (eleveId) => {
  const query = {
    id_eleve: eleveId,
  };
  return await Retard.find(query).populate("id_eleve");
};

module.exports = {
  createRetard,
  getRetards,
  updateRetard,
  deleteRetard,
  getRetardsByEleveId,
};
