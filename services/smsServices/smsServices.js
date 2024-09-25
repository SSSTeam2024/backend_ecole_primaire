const moment = require("moment-timezone");
const axios = require("axios");
const smsDao = require("../../dao/smsDao/smsDao");
const parentDao = require("../../dao/parentDao/parentDao");
const studentDao = require("../../dao/etudiantDao/etudiantDao");
const enseignantDao = require("../../dao/enseignantDao/enseignantDao");

const sendSms = async (users) => {
  const timezone = "Africa/Tunis";
  const currentDateTime = moment().tz(timezone).format("DD/MM/YYYY HH:mm");
  const date = currentDateTime.substring(0, 10);
  const time = currentDateTime.substring(11, 16);
  const sender = "SLS Sousse";

  for (let receiver of users) {
    // console.log(receiver);
    try {
      let url = `https://app.tunisiesms.tn/Api/Api.aspx?fct=sms&key=F8Y7759dYMdFgkAaUWbxStKLaD13r0kUZF4MROq1Q5TKj8kU7hmryp/-/RThej1BeSezb4M/-/sPX2SYYsDh7gy7A3hxbGBZVcaC&mobile=216${receiver.phone}&sms=${receiver.msg}&sender=${sender}&date=${date}&heure=${time}`;
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

const generateNewMessageBody = (parent, msg, etudiant) => {
  let newMsg = msg;
  if (msg.includes("[parent]")) {
    newMsg = newMsg.replace("[parent]", parent.prenom_parent);
  }
  if (msg.includes("[login]")) {
    newMsg = newMsg.replace("[login]", parent.username);
  }
  const lastSixDigits = parent.phone.slice(-6);
  const reversedLastSixDigits = lastSixDigits.split("").reverse().join("");

  if (msg.includes("[pass_parent]")) {
    newMsg = newMsg.replace("[pass_parent]", reversedLastSixDigits);
  }
  if (msg.includes("[classe]")) {
    newMsg = newMsg.replace("[classe]", etudiant.classe.nom_classe);
  }
  if (msg.includes("[nom_eleve]")) {
    newMsg = newMsg.replace("[nom_eleve]", etudiant.prenom);
  }
  if (msg.includes("[lien_inscription]")) {
    newMsg = newMsg.replace("[lien_inscription]", "https://sls.tn/inscription");
  }
  if (msg.includes("[lien_app]")) {
    newMsg = newMsg.replace("[lien_app]", "https://sls.tn/");
  }
  return newMsg;
};

// const createSms = async (smsData) => {
//   console.log("receivers", smsData.receivers);
//   console.log("specefic_students", smsData.specefic_students);
//   console.log("specefic_enseignants", smsData.specefic_enseignants);
//   if (smsData.receivers.length > 0 && smsData.specefic_students[0] === "") {
//     console.log("inside first if");
//     if (smsData.include_names === "0") {
//       for (const receiver of smsData.receivers) {
//         let parent = await parentDao.getParentById(receiver);
//         let newBody = generateNewMessageBody(parent, smsData.msg);
//         let sms = {
//           sender: smsData.sender,
//           receiver: receiver,
//           msg: newBody,
//           status: smsData.status,
//           total_sms: smsData.total_sms,
//           sms_par_destinataire: smsData.sms_par_destinataire,
//         };
//         await smsDao.createSms(sms);
//       }
//     } else {
//       for (const receiver of smsData.receivers) {
//         let parent = await parentDao.getParentById(receiver);
//         for (const eleve of parent.fils) {
//           let newBody = generateNewMessageBody(parent, smsData.msg);
//           let body_with_eleve_name = `${eleve.prenom} ${eleve.nom} : ${eleve.classe.nom_classe} %0A ${newBody}`;
//           let sms = {
//             sender: smsData.sender,
//             receiver: receiver,
//             msg: body_with_eleve_name,
//             status: smsData.status,
//             total_sms: smsData.total_sms,
//             sms_par_destinataire: smsData.sms_par_destinataire,
//           };
//           await smsDao.createSms(sms);
//         }
//       }
//     }
//   } else if (
//     smsData.receivers[0] === "" &&
//     smsData.specefic_students.length > 0
//   ) {
//     console.log("inside first else if");
//     if (smsData.include_names === "0") {
//       for (const student of smsData.specefic_students) {
//         let etudiant = await studentDao.getEtudiantById(student);
//         let newBody = generateNewMessageBody(etudiant.parent, smsData.msg);
//         let sms = {
//           sender: smsData.sender,
//           receiver: etudiant.parent._id,
//           msg: newBody,
//           status: smsData.status,
//           total_sms: smsData.total_sms,
//           sms_par_destinataire: smsData.sms_par_destinataire,
//         };
//         await smsDao.createSms(sms);
//       }
//     } else {
//       for (const student of smsData.specefic_students) {
//         let etudiant = await studentDao.getEtudiantById(student);
//         let newBody = generateNewMessageBody(etudiant.parent, smsData.msg);
//         let body_with_eleve_name = `${etudiant.prenom} ${etudiant.nom} : ${etudiant.classe.nom_classe} %0A ${newBody}`;
//         let sms = {
//           sender: smsData.sender,
//           receiver: etudiant.parent._id,
//           msg: body_with_eleve_name,
//           status: smsData.status,
//           total_sms: smsData.total_sms,
//           sms_par_destinataire: smsData.sms_par_destinataire,
//         };
//         await smsDao.createSms(sms);
//       }
//     }
//   } else if (
//     smsData.receivers[0] === "" &&
//     smsData.specefic_students[0] === "" &&
//     smsData.specefic_enseignants.length > 0
//   ) {
//     for (const receiver of smsData.specefic_enseignants) {
//       console.log(receiver);
//       let enseignant = await enseignantDao.getEnseignantById(receiver);
//       let newBody = generateNewMessageBody(enseignant, smsData.msg);
//       let sms = {
//         sender: smsData.sender,
//         receiver: receiver,
//         msg: newBody,
//         status: smsData.status,
//         total_sms: smsData.total_sms,
//         sms_par_destinataire: smsData.sms_par_destinataire,
//       };
//       console.log(sms);
//       await smsDao.createSms(sms);
//     }
//     else {
//       for (const receiver of smsData.specefic_enseignants) {
//         let enseignant = await enseignantDao.getParentById(receiver);
//         for (const eleve of parent.fils) {
//           let newBody = generateNewMessageBody(parent, smsData.msg);
//           let body_with_eleve_name = `${eleve.prenom} ${eleve.nom} : ${eleve.classe.nom_classe} %0A ${newBody}`;
//           let sms = {
//             sender: smsData.sender,
//             receiver: receiver,
//             msg: body_with_eleve_name,
//             status: smsData.status,
//             total_sms: smsData.total_sms,
//             sms_par_destinataire: smsData.sms_par_destinataire,
//           };
//           await smsDao.createSms(sms);
//         }
//       }
//     }
//   }
//   return "Sms saved with success";
// };

// const createSms = async (smsData) => {
//   if (
//     smsData.receivers.some((receiver) => receiver !== "") &&
//     smsData.specefic_students[0] === ""
//   ) {
//     if (smsData.include_names === "0") {
//       for (const receiver of smsData.receivers) {
//         if (receiver !== "") {
//           let parent = await parentDao.getParentById(receiver);
//           for (const eleve of parent.fils) {
//             let newBody = generateNewMessageBody(parent, smsData.msg, eleve);
//             let sms = {
//               sender: smsData.sender,
//               receiver: receiver,
//               msg: newBody,
//               status: smsData.status,
//               total_sms: smsData.total_sms,
//               sms_par_destinataire: smsData.sms_par_destinataire,
//               eleve: eleve._id,
//             };
//             await smsDao.createSms(sms);
//           }
//         }
//       }
//     } else {
//       for (const receiver of smsData.receivers) {
//         if (receiver !== "") {
//           let parent = await parentDao.getParentById(receiver);
//           for (const eleve of parent.fils) {
//             let newBody = generateNewMessageBody(parent, smsData.msg, eleve);
//             let body_with_eleve_name = `${eleve.prenom} ${eleve.nom} : ${eleve.classe.nom_classe} %0A ${newBody}`;
//             let sms = {
//               sender: smsData.sender,
//               receiver: receiver,
//               msg: body_with_eleve_name,
//               status: smsData.status,
//               total_sms: smsData.total_sms,
//               sms_par_destinataire: smsData.sms_par_destinataire,
//               eleve: eleve._id,
//             };
//             await smsDao.createSms(sms);
//           }
//         }
//       }
//     }
//   } else if (
//     smsData.receivers.every((receiver) => receiver === "") &&
//     smsData.specefic_students.some((student) => student !== "")
//   ) {
//     console.log("inside first else if");
//     if (smsData.include_names === "0") {
//       for (const student of smsData.specefic_students) {
//         if (student !== "") {
//           let etudiant = await studentDao.getEtudiantById(student);
//           let newBody = generateNewMessageBody(
//             etudiant.parent,
//             smsData.msg,
//             etudiant
//           );
//           let sms = {
//             sender: smsData.sender,
//             receiver: etudiant.parent._id,
//             msg: newBody,
//             status: smsData.status,
//             total_sms: smsData.total_sms,
//             sms_par_destinataire: smsData.sms_par_destinataire,
//             eleve: student,
//           };
//           await smsDao.createSms(sms);
//         }
//       }
//     } else {
//       for (const student of smsData.specefic_students) {
//         if (student !== "") {
//           let etudiant = await studentDao.getEtudiantById(student);
//           let newBody = generateNewMessageBody(
//             etudiant.parent,
//             smsData.msg,
//             etudiant
//           );
//           let body_with_eleve_name = `${etudiant.prenom} ${etudiant.nom} : ${etudiant.classe.nom_classe} %0A ${newBody}`;
//           let sms = {
//             sender: smsData.sender,
//             receiver: etudiant.parent._id,
//             msg: body_with_eleve_name,
//             status: smsData.status,
//             total_sms: smsData.total_sms,
//             sms_par_destinataire: smsData.sms_par_destinataire,
//             eleve: student,
//           };
//           await smsDao.createSms(sms);
//         }
//       }
//     }
//   }
//   return "Sms saved with success";
// };

const createSms = async (smsData) => {
  if (smsData.receivers.length > 0 && smsData.specefic_students[0] === "") {
    console.log("inside first if");
    if (smsData.include_names === "0") {
      for (const receiver of smsData.receivers) {
        let parent = await parentDao.getParentById(receiver);
        for (const eleve of parent.fils) {
          let newBody = generateNewMessageBody(parent, smsData.msg, eleve);
          let sms = {
            sender: smsData.sender,
            receiver: receiver,
            msg: newBody,
            status: smsData.status,
            total_sms: smsData.total_sms,
            sms_par_destinataire: smsData.sms_par_destinataire,
            eleve: eleve._id,
          };
          console.log("sms", sms);
          await smsDao.createSms(sms);
        }
      }
    } else {
      console.log("inside first else");
      for (const receiver of smsData.receivers) {
        let parent = await parentDao.getParentById(receiver);
        for (const eleve of parent.fils) {
          let newBody = generateNewMessageBody(parent, smsData.msg, eleve);
          let body_with_eleve_name = `${eleve.prenom} ${eleve.nom} : ${eleve.classe.nom_classe} %0A ${newBody}`;
          let sms = {
            sender: smsData.sender,
            receiver: receiver,
            msg: body_with_eleve_name,
            status: smsData.status,
            total_sms: smsData.total_sms,
            sms_par_destinataire: smsData.sms_par_destinataire,
            eleve: eleve._id,
          };
          console.log("sms", sms);
          await smsDao.createSms(sms);
        }
      }
    }
  } else if (
    smsData.receivers[0] === "" &&
    smsData.specefic_students.length > 0
  ) {
    console.log("inside first else if");
    if (smsData.include_names === "0") {
      console.log("inside if of else if");
      for (const student of smsData.specefic_students) {
        let etudiant = await studentDao.getEtudiantById(student);
        let newBody = generateNewMessageBody(
          etudiant.parent,
          smsData.msg,
          etudiant
        );
        let sms = {
          sender: smsData.sender,
          receiver: etudiant.parent._id,
          msg: newBody,
          status: smsData.status,
          total_sms: smsData.total_sms,
          sms_par_destinataire: smsData.sms_par_destinataire,
          eleve: student,
        };
        await smsDao.createSms(sms);
        console.log("sms", sms);
      }
    } else {
      console.log("inside else of else if");
      for (const student of smsData.specefic_students) {
        let etudiant = await studentDao.getEtudiantById(student);
        console.log("etudiant", etudiant);
        let newBody = generateNewMessageBody(
          etudiant.parent,
          smsData.msg,
          etudiant
        );
        let body_with_eleve_name = `${etudiant.prenom} ${etudiant.nom} : ${etudiant.classe.nom_classe} %0A ${newBody}`;
        let sms = {
          sender: smsData.sender,
          receiver: etudiant.parent._id,
          msg: body_with_eleve_name,
          status: smsData.status,
          total_sms: smsData.total_sms,
          sms_par_destinataire: smsData.sms_par_destinataire,
          eleve: student,
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

const deletePendingSms = async () => {
  return await smsDao.deletePendingSmses();
};

module.exports = {
  sendSms,
  createSms,
  getSms,
  updateSms,
  deleteSms,
  sendCustomeSms,
  deletePendingSms,
};
