const surveillantDao = require("../../dao/surveillantDao/surveillantDao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createSurveillant = async (surveillantData) => {
  const hashedPassword = await bcrypt.hash(surveillantData.mot_de_passe, 10);
  return await surveillantDao.createSurveillant({
    ...surveillantData,
    mot_de_passe: hashedPassword,
  });
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

// login Surveillant service acccount
const login = async (nom_utilisateur, password) => {
  const surveillant = await surveillantDao.findSurveillantByUsername(
    nom_utilisateur
  );
  if (!surveillant) {
    throw new Error("Surveillant not found");
  }

  if (await bcrypt.compare(password, surveillant.mot_de_passe)) {
    const accessToken = jwt.sign(
      { login: surveillant.nom_utilisateur },
      "yourSecretKey"
    );
    await surveillantDao.updateJwtToken(surveillant._id, String(accessToken));
    let updatedSurveillant = await surveillantDao.getSurveillantById(
      surveillant._id
    );
    return updatedSurveillant;
  } else {
    throw new Error("Incorrect password");
  }
};

const getSurveillantById = async (id) => {
  return await surveillantDao.getSurveillantById(id);
};

const getSurveillantByToken = async (token) => {
  return await surveillantDao.findSurveillantByToken(token);
};

const logout = async (id) => {
  return await surveillantDao.logout(id);
};

module.exports = {
  createSurveillant,
  getSurveillants,
  updateSurveillant,
  deleteSurveillant,
  login,
  getSurveillantById,
  getSurveillantByToken,
  logout,
};
