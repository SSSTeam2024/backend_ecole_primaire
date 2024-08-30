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

const updateParent = async (id, updateData) => {
  const existingParent = await parentDao.getParentById(id);

  const updatedParent = await parentDao.updateParent(id, updateData);

  if (!updatedParent) {
    throw new Error("Parent not found");
  }

  if (updateData.fils) {
    const oldFils = existingParent.fils || [];
    const newFils = updateData.fils;

    const removedFils = oldFils.filter(
      (filsId) => !newFils.includes(filsId.toString())
    );

    const addedFils = newFils.filter(
      (filsId) => !oldFils.includes(filsId.toString())
    );

    if (removedFils.length > 0) {
      await parentDao.updateEtudiantParent(removedFils, null);
    }

    if (addedFils.length > 0) {
      await parentDao.updateEtudiantParent(addedFils, updatedParent._id);
    }
  }

  return updatedParent;
};

const deleteParent = async (id) => {
  return await parentDao.deleteParent(id);
};

const updateApiKey = async (id, key) => {
  return await parentDao.updateApiKey(id, key);
};

module.exports = {
  createParent,
  loginParent,
  getParents,
  logout,
  getParentByToken,
  getParentById,
  deleteParent,
  updateParent,
  updateApiKey,
};
