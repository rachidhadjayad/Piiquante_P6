const mongoose = require('mongoose');
// Plugin simple pour Mongoose, qui nettoie les champs du document avant de les enregistrer.
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

// Notre Shema pour le Thing pour le pge du frontend

const thingSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  // Sytème de Like et Dislikes
  // Sur cette partie on ne met pas de "required" car ceci n'est pas obligatoire
  likes: { type: Number, defaut: 0},
  dislikes: { type: Number, defaut: 0},
  // Ceci va nous permettre de faire un tableau pour les autres utilisateurs
  usersLiked: { type:  [String] },
  usersDisliked: { type:  [String] }
});

thingSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model('Thing', thingSchema);