const CentralApp = require("../../models/centralAppModel/centralAppModel");

const creatAappCentralApp = async (centralAppData) => {
  return await CentralApp.create(centralAppData);
};

const getCentralApps = async () => {
  return await CentralApp.find();
};

const findCentralAppByUsername = async (login) => {
  return await CentralApp.findOne({ login });
};

const findCentralAppByToken = async (token) => {
  let api_token = token;
  return await CentralApp.findOne({ api_token });
};

const getCentralAppById = async (id) => {
  return await CentralApp.findById(id);
};

const updateJwtToken = async (id, token) => {
  return await CentralApp.findByIdAndUpdate(
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
  return await CentralApp.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        api_token: "",
      },
    }
  );
};

module.exports = {
  creatAappCentralApp,
  findCentralAppByUsername,
  findCentralAppByToken,
  getCentralAppById,
  updateJwtToken,
  logout,
  getCentralApps,
};
