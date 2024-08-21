const classeDao = require("../../dao/classeDao/classeDao");

const createClasse = async (classeData) => {
  return await classeDao.createClasse(classeData);
};

const getClasses = async () => {
  return await classeDao.getClasses();
};

const updateClasse = async (id, updateData) => {
  return await classeDao.updateClasse(id, updateData);
};

const deleteClasse = async (id) => {
  return await classeDao.deleteClasse(id);
};

module.exports = {
  createClasse,
  getClasses,
  deleteClasse,
  updateClasse,
};
