const moment = require("moment-timezone");
const axios = require("axios");
const smsDao = require("../../dao/smsDao/smsDao");
const parentDao = require("../../dao/parentDao/parentDao");
const studentDao = require("../../dao/etudiantDao/etudiantDao");

const sendSms = async (users, msg) => {
  const timezone = "Africa/Tunis";
  const currentDateTime = moment().tz(timezone).format("DD/MM/YYYY HH:mm");
  const date = currentDateTime.substring(0, 10);
  const time = currentDateTime.substring(11, 16);
  const sender = "SLS Sousse";

  for (let user of users) {
    try {
      let url = `https://app.tunisiesms.tn/Api/Api.aspx?fct=sms&key=F8Y7759dYMdFgkAaUWbxStKLaD13r0kUZF4MROq1Q5TKj8kU7hmryp/-/RThej1BeSezb4M/-/sPX2SYYsDh7gy7A3hxbGBZVcaC&mobile=216${user.phone}&sms=${msg}&sender=${sender}&date=${date}&heure=${time}`;
      const response = await axios.get(url);
      console.log(`Response from ${url}:`, response.data);
    } catch (error) {
      console.error(`Error fetching ${url}:`, error.message);
    }
  }
};

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

const generateNewMessageBody = (parent, msg) => {
  let newMsg = msg;
  if (msg.includes("[parent]")) {
    newMsg = newMsg.replace("[parent]", parent.prenom_parent);
  }
  if (msg.includes("[login]")) {
    newMsg = newMsg.replace("[login]", parent.username);
  }
  if (msg.includes("[pass_parent]")) {
    newMsg = newMsg.replace("[pass_parent]", "123456");
  }
  return newMsg;
};

const createSms = async (smsData) => {
  if (smsData.receivers.length > 0 && smsData.specefic_students[0] === "") {
    if (smsData.include_names === "0") {
      for (const receiver of smsData.receivers) {
        let parent = await parentDao.getParentById(receiver);
        let newBody = generateNewMessageBody(parent, smsData.msg);
        let sms = {
          sender: smsData.sender,
          receiver: receiver,
          msg: newBody,
          status: smsData.status,
        };
        await smsDao.createSms(sms);
      }
    } else {
      for (const receiver of smsData.receivers) {
        let parent = await parentDao.getParentById(receiver);
        for (const eleve of parent.fils) {
          let newBody = generateNewMessageBody(parent, smsData.msg);
          let body_with_eleve_name = `${eleve.prenom} ${eleve.nom} : ${eleve.classe.nom_classe} %0A ${newBody}`;
          let sms = {
            sender: smsData.sender,
            receiver: receiver,
            msg: body_with_eleve_name,
            status: smsData.status,
          };
          // console.log("sms", sms);
          await smsDao.createSms(sms);
        }
      }
    }
  } else if (
    smsData.receivers[0] === "" &&
    smsData.specefic_students.length > 0
  ) {
    if (smsData.include_names === "0") {
      for (const student of smsData.specefic_students) {
        let etudiant = await studentDao.getEtudiantById(student);
        let newBody = generateNewMessageBody(etudiant.parent, smsData.msg);
        let sms = {
          sender: smsData.sender,
          receiver: etudiant.parent._id,
          msg: newBody,
          status: smsData.status,
        };
        await smsDao.createSms(sms);
        console.log("sms", sms);
      }
    } else {
      for (const student of smsData.specefic_students) {
        let etudiant = await studentDao.getEtudiantById(student);
        let newBody = generateNewMessageBody(etudiant.parent, smsData.msg);
        let body_with_eleve_name = `${etudiant.prenom} ${etudiant.nom} : ${etudiant.classe.nom_classe} %0A ${newBody}`;
        let sms = {
          sender: smsData.sender,
          receiver: etudiant.parent._id,
          msg: body_with_eleve_name,
          status: smsData.status,
        };
        await smsDao.createSms(sms);
        console.log("sms", sms);
      }
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
  sendSms,
  createSms,
  getSms,
  updateSms,
  deleteSms,
  sendCustomeSms,
};
