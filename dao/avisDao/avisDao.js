const Avis = require("../../models/avisModel/avisModel");

const createAvis = async (avisData) => {
  return await Avis.create(avisData);
};

const getAvis = async () => {
  return await Avis.find().populate("classes");
};

const updateAvis = async (id, updateData) => {
  return await Avis.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteAvis = async (id) => {
  return await Avis.findByIdAndDelete(id);
};

const getAvisByClasseId = async (classeId) => {
  const query = {
    classes: classeId,
  };
  return await Avis.find(query).populate("classes");
};

module.exports = {
  createAvis,
  getAvis,
  updateAvis,
  deleteAvis,
  getAvisByClasseId,
};
