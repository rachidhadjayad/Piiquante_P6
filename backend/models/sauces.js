const mongoose = require('mongoose');
// Plugin simple pour Mongoose, qui nettoie les champs du document avant de les enregistrer.
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

// Notre Shema pour le Thing

const thingSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type:  [String] },
  usersDisliked: { type:  [String] },
});
thingSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model('Thing', thingSchema);