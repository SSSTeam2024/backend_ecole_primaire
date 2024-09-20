const absenceDao = require("../../dao/absenceDao/absenceDao");
const parentDao = require("../../dao/parentDao/parentDao");
const smsService = require("../smsServices/smsServices");
const etudiantDao = require("../../dao/etudiantDao/etudiantDao");

const createAbsence = async (absenceData) => {
  console.log(absenceData);
  const absence = await absenceDao.createAbsence(absenceData);

  let receivers = [];

  for (const eleveID of absenceData.eleves) {
    if (eleveID.typeAbsent !== "P") {
      let etudiant = await etudiantDao.getEtudiantById(eleveID.eleve);
      if (eleveID.typeAbsent === "A") {
        receivers.push({
          phone: etudiant.parent.phone,
          msg: `${etudiant.prenom} ${etudiant.nom} ${etudiant.classe.nom_classe}, %0A votre enfant était absent en ${absenceData.matiere} à ${absenceData.heure}`,
        });
      }
      if (eleveID.typeAbsent === "R") {
        receivers.push({
          phone: etudiant.parent.phone,
          msg: `${etudiant.prenom} ${etudiant.nom} ${etudiant.classe.nom_classe}, %0A votre enfant était en retard en ${absenceData.matiere} à ${absenceData.heure}`,
        });
      }
    }
  }
  await smsService.sendSms(receivers);

  return absence;
};

const getAbsences = async () => {
  let parents = await parentDao.getParents();
  return await absenceDao.getAbsences();
};

const updateAbsence = async (id, updateData) => {
  return await absenceDao.updateAbsence(id, updateData);
};

const deleteAbsence = async (id) => {
  return await absenceDao.deleteAbsence(id);
};

const getAbsencesByEleveId = async (eleveId) => {
  return await absenceDao.getAbsencesByEleveId(eleveId);
};

module.exports = {
  createAbsence,
  getAbsences,
  updateAbsence,
  deleteAbsence,
  getAbsencesByEleveId,
};
