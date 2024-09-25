const smsServices = require("../../services/smsServices/smsServices");

const createSms = async (req, res) => {
  try {
    const {
      sender,
      receivers,
      msg,
      status,
      specefic_students,
      include_names,
      total_sms,
      sms_par_destinataire,
      eleve,
    } = req.body;
    const newSms = await smsServices.createSms({
      sender,
      receivers,
      msg,
      status,
      specefic_students,
      include_names,
      total_sms,
      sms_par_destinataire,
      eleve,
    });
    res.status(201).json(newSms);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const sendPendingSmses = async (req, res) => {
  try {
    const result = await smsServices.sendCustomeSms();
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getSms = async (req, res) => {
  try {
    const sms = await smsServices.getSms();
    res.json(sms);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateSms = async (req, res) => {
  try {
    const smsId = req.params.id;
    const { sender, receiver, msg, status } = req.body;

    const updateSms = await smsServices.updateSms(smsId, {
      sender,
      receiver,
      msg,
      status,
    });

    if (!updateSms) {
      return res.status(404).send("Sms not found");
    }
    res.json(updateSms);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteSms = async (req, res) => {
  try {
    const smsIds = req.body.ids; // Expect the IDs in the request body as an array

    if (!smsIds || smsIds.length === 0) {
      return res.status(400).send("No IDs provided");
    }

    const deleteSmsResult = await smsServices.deleteSms(smsIds);

    if (deleteSmsResult.deletedCount === 0) {
      return res.status(404).send("No SMS found with provided IDs");
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deletePendingSms = async (req, res) => {
  try {
    const deleteSms = await smsServices.deletePendingSms();

    if (!deleteSms) {
      return res.status(404).send("Sms not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createSms,
  getSms,
  updateSms,
  deleteSms,
  sendPendingSmses,
  deletePendingSms,
};
