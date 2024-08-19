const parentService = require("../../services/parentServices/parentServices");

const createParent = async (req, res) => {
  try {
    const { cin, nom_parent, prenom_parent, username, password, fils } =
      req.body;

    const parent = await parentService.createParent({
      cin,
      nom_parent,
      prenom_parent,
      username,
      password,
      fils,
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

module.exports = {
  createParent,
  login,
  logout,
  getParentByJwtToken,
  getParentById,
  getParents,
  deleteParent,
};
