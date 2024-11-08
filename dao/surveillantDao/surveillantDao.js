const Surveillant = require("../../models/surveillantModel/surveillantModel");

const createSurveillant = async (surveillantData) => {
  return await Surveillant.create(surveillantData);
};

const getSurveillants = async () => {
  return await Surveillant.find();
};

const updateSurveillant = async (id, updateData) => {
  return await Surveillant.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteSurveillant = async (id) => {
  return await Surveillant.findByIdAndDelete(id);
};

const findSurveillantByUsername = async (nom_utilisateur) => {
  return await Surveillant.findOne({ nom_utilisateur });
};

const findSurveillantByToken = async (token) => {
  let api_token = token;
  return await Surveillant.findOne({ api_token });
};

const getSurveillantById = async (id) => {
  return await Surveillant.findById(id);
};

const updateJwtToken = async (id, token) => {
  return await Surveillant.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        api_token: token,
      },
    }
  );
};

// logout
const logout = async (id) => {
  return await Surveillant.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        api_token: "",
      },
    }
  );
};

module.exports = {
  createSurveillant,
  getSurveillants,
  updateSurveillant,
  deleteSurveillant,
  findSurveillantByUsername,
  findSurveillantByToken,
  getSurveillantById,
  updateJwtToken,
  logout,
};
