const paiementDao = require("../../dao/paiementDao/paiementDao");
const etudiantDao = require("../../dao/etudiantDao/etudiantDao");
const smsService = require("../smsServices/smsServices");

const createPaiement = async (paiementData) => {
  let paiement = await paiementDao.createPaiement(paiementData);
  const eleve = await etudiantDao.getEtudiantById(paiement.eleve);
  let receivers = [
    {
      phone: eleve.parent.phone,
      msg: `${eleve.prenom} ${eleve.nom} ${eleve.classe.nom_classe}, %0AVotre paiement a été effectué avec succès pour la désignation du ${paiement.period}`,
    },
  ];
  // console.log(receivers);
  smsService.sendSms(receivers);
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
