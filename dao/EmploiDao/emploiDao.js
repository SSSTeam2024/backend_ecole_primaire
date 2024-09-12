const Emploi = require("../../models/emploiModel/emploiModel");

const createEmploi = async (emploiData) => {
  const newEmploi = await Emploi.create(emploiData);
  return await Emploi.findById(newEmploi._id).populate("classe");
};

const getEmplois = async () => {
  return await Emploi.find().populate("classe");
};

// const updateExercice = async (id, updateData) => {
//   return await Exercice.findByIdAndUpdate(id, updateData, { new: true });
// };

const deleteEmploi = async (id) => {
  return await Emploi.findByIdAndDelete(id);
};

const getEmploisByClasseId = async (classeId) => {
  const query = {
    classe: classeId,
  };
  return await Emploi.find(query).populate("classe");
};

module.exports = {
  createEmploi,
  getEmplois,
  //   updateExercice,
  deleteEmploi,
  getEmploisByClasseId,
};
