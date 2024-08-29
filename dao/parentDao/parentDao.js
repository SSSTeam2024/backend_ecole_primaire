const Parent = require("../../models/parentModel/parentModel");
const Etudiant = require("../../models/etudiantModel/etudiantModel");

const createParent = async (parentData) => {
  return await Parent.create(parentData);
};

const getParents = async () => {
  return await Parent.find().populate({
    path: "fils",
    populate: {
      path: "classe",
    },
  });
};

const logout = async (id) => {
  return await Parent.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        api_token: "",
      },
    }
  );
};

const findParentByToken = async (token) => {
  let api_token = token;
  return await Parent.findOne({ api_token });
};

const getParentById = async (id) => {
  return await Parent.findById(id).populate({
    path: "fils",
    populate: {
      path: "classe",
    },
  });
};

const findParentByUsername = async (username) => {
  return await Parent.findOne({ username });
};

const updateJwtToken = async (id, token) => {
  return await Parent.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        api_token: token,
      },
    }
  );
};

const updateEtudiantParent = async (etudiantIds, parentId) => {
  return await Etudiant.updateMany(
    { _id: { $in: etudiantIds } },
    { parent: parentId }
  );
};

const updateParent = async (id, updateData) => {
  return await Parent.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteParent = async (id) => {
  return await Parent.findByIdAndDelete(id);
};

module.exports = {
  createParent,
  getParents,
  logout,
  findParentByToken,
  getParentById,
  findParentByUsername,
  updateJwtToken,
  updateEtudiantParent,
  deleteParent,
  updateParent,
};
