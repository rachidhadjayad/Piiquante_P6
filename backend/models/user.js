const mongoose = require('mongoose');
// On rajoute le validateur comme pluggin à notre schema
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
// Pour éviter que 2 utilisateurs n'utilisent la même adresse e-mail, nous utiliserons le mot clé "unique" pour l'attribut email
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// On l'applique au schema avant de faire un model
userSchema.plugin(uniqueValidator);

// On va exporter le Schema sous forme de model, dans le model mongoose

module.exports = mongoose.model('User', userSchema);