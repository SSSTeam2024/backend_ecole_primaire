const paiementDao = require("../../dao/paiementDao/paiementDao");
const etudiantDao = require("../../dao/etudiantDao/etudiantDao");
const smsService = require("../smsServices/smsServices");
const smsSettingDao = require("../../dao/smsSettingDao/smsSettingDao");

const createPaiement = async (paiementData) => {
  let paiement = await paiementDao.createPaiement(paiementData);
  let settings = await smsSettingDao.getSmsSettings();
  let paiement_sms_service = settings.filter(
    (service) => service.service_name === "Paiements"
  );
  if (paiement_sms_service[0].sms_status === "1") {
    const eleve = await etudiantDao.getEtudiantById(paiement.eleve);
    let receivers = [];

    receivers.push({
      phone: eleve.parent.phone,
      msg: `${eleve.prenom} ${eleve.nom} ${eleve.classe.nom_classe}, %0AVotre paiement a été effectué avec succès pour la désignation du ${paiement.period}`,
    });

    console.log(receivers);
    // smsService.sendSms(receivers);
  }
  return paiement;
};

const getPaiements = async () => {
  return await paiementDao.getPaiements();
};

const updatePaiement = async (id, updateData) => {
  return await paiementDao.updatePaiement(id, updateData);
};

const deletePaiement = async (id) => {
  return await paiementDao.deletePaiement(id);
};

const getPaiementByEleveId = async (eleveId) => {
  return await paiementDao.getPaiementByEleveId(eleveId);
};

module.exports = {
  createPaiement,
  getPaiements,
  updatePaiement,
  deletePaiement,
  getPaiementByEleveId,
};
