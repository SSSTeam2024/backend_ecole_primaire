// const mongoose = require("mongoose");

// const notesSchema = new mongoose.Schema({
//   classe: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Classe",
//     required: false,
//     default: null,
//   },
//   matiere: String,
//   trimestre: String,
//   type: String,
//   notes: [
//     {
//       note: String,
//       eleve: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Etudiant",
//         required: false,
//         default: null,
//       },
//     },
//   ],
//   date: String,
// });

// module.exports = mongoose.model("Note", notesSchema);

const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  eleve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Etudiant",
    required: false,
    default: null,
  },
  matiere: String,
  trimestre: String,
  type: String,
  note: String,
  date: String,
});

module.exports = mongoose.model("Note", notesSchema);
