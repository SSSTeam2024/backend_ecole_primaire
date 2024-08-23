const Carnet = require("../../models/carnetModel/carnetModel");

const createCarnet = async (carnetData) => {
  return await Carnet.create(carnetData);
};

const getCarnets = async () => {
  return await Carnet.find().populate("eleve");
};

// const updateCarnet = async (id, updateData) => {
//   return await Carnet.findByIdAndUpdate(id, updateData, { new: true });
// };

const deleteCarnet = async (id) => {
  return await Carnet.findByIdAndDelete(id);
};

const getCarnetsByEleveId = async (eleveId) => {
  const query = {
    eleve: eleveId,
  };
  return await Carnet.find(query).populate("eleve");
};

module.exports = {
  createCarnet,
  getCarnets,
  //   updateCarnet,
  deleteCarnet,
  getCarnetsByEleveId,
};
