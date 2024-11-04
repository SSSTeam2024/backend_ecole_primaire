const surveillantDao = require("../../dao/surveillantDao/surveillantDao");

const createSurveillant = async (surveillantData) => {
  return await surveillantDao.createSurveillant(surveillantData);
};

const getSurveillants = async () => {
  return await surveillantDao.getSurveillants();
};

const updateSurveillant = async (id, updateData) => {
  return await surveillantDao.updateSurveillant(id, updateData);
};

const deleteSurveillant = async (id) => {
  return await surveillantDao.deleteSurveillant(id);
};

module.exports = {
  createSurveillant,
  getSurveillants,
  updateSurveillant,
  deleteSurveillant,
};
