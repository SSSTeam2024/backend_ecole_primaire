const moment = require("moment-timezone");
const axios = require("axios");
const smsDao = require("../../dao/smsEnseignantDao/smsEnseignantDao");
const enseignantDao = require("../../dao/enseignantDao/enseignantDao");

const sendCustomeSms = async () => {
  const timezone = "Africa/Tunis";
  const currentDateTime = moment().tz(timezone).format("DD/MM/YYYY HH:mm");
  const date = currentDateTime.substring(0, 10);
  const time = currentDateTime.substring(11, 16);
  const sender = "SLS Sousse";

  let smses = await smsDao.getPendingSmses();

  for (let sms of smses) {
    try {
      // sms.sender
      let url = `https://app.tunisiesms.tn/Api/Api.aspx?fct=sms&key=F8Y7759dYMdFgkAaUWbxStKLaD13r0kUZF4MROq1Q5TKj8kU7hmryp/-/RThej1BeSezb4M/-/sPX2SYYsDh7gy7A3hxbGBZVcaC&mobile=216${sms.receiver.phone}&sms=${sms.msg}&sender=${sms.sender}&date=${date}&heure=${time}`;
      const response = await axios.post(url);
      console.log(`Response from ${url}:`, response.data);

      await smsDao.updateSmsStatus(sms._id, "sent");
    } catch (error) {
      console.error(`Error fetching ${url}:`, error.message);
    }
  }

  return "Smses sent";
};

const generateNewMessageBody = (enseignant, msg) => {
  let newMsg = msg;
  if (msg.includes("[enseignant]")) {
    newMsg = newMsg.replace("[enseignant]", enseignant.prenom_enseignant);
  }

  return newMsg;
};

const createSms = async (smsData) => {
  if (smsData.specefic_enseignants.length > 0) {
    for (const receiver of smsData.specefic_enseignants) {
      let enseignant = await enseignantDao.getEnseignantById(receiver);
      let newBody = generateNewMessageBody(enseignant, smsData.msg);
      let sms = {
        sender: smsData.sender,
        receiver: receiver,
        msg: newBody,
        status: smsData.status,
        total_sms: smsData.total_sms,
        sms_par_destinataire: smsData.sms_par_destinataire,
      };
      await smsDao.createSms(sms);
    }
  }
  return "Sms saved with success";
};

const getSms = async () => {
  return await smsDao.getSms();
};

const updateSms = async (id, updateData) => {
  return await smsDao.updateSms(id, updateData);
};

const deleteSms = async (id) => {
  return await smsDao.deleteSms(id);
};

module.exports = {
  createSms,
  getSms,
  updateSms,
  deleteSms,
  sendCustomeSms,
};
