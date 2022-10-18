// Le node "path" fournit des utilitaires pour travailler avec les chemins de fichiers et de répertoires
const path = require("path");
// importation de express avec "require
const express = require('express');
// app qui sera notre application qui appelle la methode express
const app = express();
// ajout de la constante pour connecter notre API à notre cluster MongoDB
const mongoose = require('mongoose');
// importation de notre routeur 
const stuffRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');


mongoose.connect('mongodb+srv://PIIQUANTERachid:P6@cluster0.kzedkr3.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// pour acceder au corps de la reqête au format ici "Json" ce ceci existe aussi en Bodyparser
app.use(express.json());

// une fonction qui recoit la requete et la reponse, on fait la route avec notre endpoint "/api/stuff" ceci est notre middlware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// pour indiquer qu'on notre utiliser notre routeur
app.use("/images", express.static(path.join(__dirname, "images")));
app.use('/api/sauces', stuffRoutes);
// afin d'enregistrer nos routes ici et la route attendue par notre frontend
app.use('/api/auth', userRoutes);

// pour exporter l'application (notre constante)

module.exports = app;