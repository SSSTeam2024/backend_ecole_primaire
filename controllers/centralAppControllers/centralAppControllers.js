const centralApp = require("../../services/centralAppServices/centralAppServices");
const globalFunctions = require("../../utils/globalFunctions");

const registerCentralApp = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      login,
      password,
      logoBase64String,
      logoExtension,
    } = req.body;

    let logo = globalFunctions.generateUniqueFilename(
      logoExtension,
      "logoCentralApp"
    );

    let documents = [
      {
        base64String: logoBase64String,
        extension: logoExtension,
        name: logo,
      },
    ];

    await centralApp.registerCentralApp(
      {
        name,
        email,
        phone,
        address,
        login,
        password,
        logo,
      },
      documents
    );
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { login, password } = req.body;
    const result = await centralApp.login(login, password);

    res.json({ central: result });
  } catch (error) {
    console.error(error);
    res.status(401).send(error.message);
  }
};

const logout = async (req, res) => {
  let id = req.params.id;

  await centralApp.logout(id);

  res.sendStatus(200);
};

const getCentralAppByJwtToken = async (req, res) => {
  try {
    const token = req.body.token;

    const getCentral = await centralApp.getCentralAppByToken(token);

    if (!getCentral) {
      return res.status(404).send("Account not found");
    }
    res.json({ central: getCentral });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAccountById = async (req, res) => {
  try {
    const accountId = req.params.id;

    const getAccount = await centralApp.getCentralAppById(accountId);

    if (!getAccount) {
      return res.status(404).send("Account not found");
    }
    res.json(getAccount);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAccounts = async (req, res) => {
  try {
    const accounts = await centralApp.getCentralApps();
    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  registerCentralApp,
  login,
  logout,
  getCentralAppByJwtToken,
  getAccountById,
  getAccounts,
};
