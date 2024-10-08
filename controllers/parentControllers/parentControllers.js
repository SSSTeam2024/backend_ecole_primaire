const parentService = require("../../services/parentServices/parentServices");

const createParent = async (req, res) => {
  try {
    const {
      cin,
      nom_parent,
      prenom_parent,
      phone,
      username,
      password,
      fils,
      profession,
    } = req.body;

    const parent = await parentService.createParent({
      cin,
      nom_parent,
      prenom_parent,
      phone,
      username,
      password,
      fils,
      profession,
    });
    res.json(parent);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await parentService.loginParent(username, password);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(401).send(error.message);
  }
};

const updateParent = async (req, res) => {
  try {
    const parentId = req.params.id;
    const {
      cin,
      nom_parent,
      prenom_parent,
      phone,
      username,
      fils,
      profession,
    } = req.body;

    const updateParent = await parentService.updateParent(parentId, {
      cin,
      nom_parent,
      prenom_parent,
      phone,
      username,
      fils,
      profession,
    });

    if (!updateParent) {
      return res.status(404).send("Parent not found");
    }
    res.json(updateParent);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const logout = async (req, res) => {
  let id = req.params.id;

  await parentService.logout(id);
  res.send({ result: "Successfully logged out" });
};

const getParentByJwtToken = async (req, res) => {
  try {
    const token = req.body.token;

    const getParent = await parentService.getParentByToken(token);

    if (!getParent) {
      return res.status(404).send("Parent not found");
    }
    res.json(getParent);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getParentByUsername = async (req, res) => {
  try {
    const username = req.body.username;

    const getParent = await parentService.getParentByUsername(username);

    if (!getParent) {
      return res.status(404).send("Parent not found");
    }
    res.json(getParent);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getParentById = async (req, res) => {
  try {
    const parentId = req.params.id;

    const getParent = await parentService.getParentById(parentId);

    if (!getParent) {
      return res.status(404).send("Parent not found");
    }
    res.json(getParent);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getParents = async (req, res) => {
  try {
    const parents = await parentService.getParents();
    res.json(parents);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteParent = async (req, res) => {
  try {
    const parentId = req.params.id;

    const deletedParent = await parentService.deleteParent(parentId);

    if (!deletedParent) {
      return res.status(404).send("Parent not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateAPIKey = async (req, res) => {
  try {
    const { id, key } = req.body;
    const sentResult = await parentService.updateApiKey(id, key);
    res.json(sentResult);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updatePassword = async (req, res) => {
  try {
    const parentId = req.params.id;
    const { password } = req.body;

    const updateParent = await parentService.updatePassword(parentId, {
      password,
    });

    if (!updateParent) {
      return res.status(404).send("Parent not found!");
    }
    res.json(updateParent);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createParent,
  login,
  logout,
  getParentByJwtToken,
  getParentById,
  getParents,
  deleteParent,
  updateParent,
  updateAPIKey,
  getParentByUsername,
  updatePassword,
};
