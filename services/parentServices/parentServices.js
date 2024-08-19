const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const parentDao = require("../../dao/parentDao/parentDao");

const createParent = async (parentData) => {
  const hashedPassword = await bcrypt.hash(parentData.password, 10);
  const parent = await parentDao.createParent({
    ...parentData,
    password: hashedPassword,
  });

  if (parent.fils && parent.fils.length > 0) {
    await parentDao.updateEtudiantParent(parent.fils, parent._id);
  }

  return parent;
};

const loginParent = async (email, password) => {
  const parent = await parentDao.findParentByUsername(email);

  if (!parent) {
    throw new Error("Parent not found");
  }

  if (await bcrypt.compare(password, parent.password)) {
    const accessToken = jwt.sign({ parent: parent.username }, "yourSecretKey");
    await parentDao.updateJwtToken(parent._id, String(accessToken));
    let updatedParent = await parentDao.getParentById(parent._id);
    return updatedParent;
  } else {
    throw new Error("Incorrect password");
  }
};

const getParents = async () => {
  return await parentDao.getParents();
};

const logout = async (id) => {
  return await parentDao.logout(id);
};

const getParentByToken = async (token) => {
  return await parentDao.findParentByToken(token);
};

const getParentById = async (id) => {
  return await parentDao.getParentById(id);
};

const deleteParent = async (id) => {
  return await parentDao.deleteParent(id);
};

module.exports = {
  createParent,
  loginParent,
  getParents,
  logout,
  getParentByToken,
  getParentById,
  deleteParent,
};
