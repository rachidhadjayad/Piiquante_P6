const express = require('express');
const router = express.Router();
// On associe la fonction au differentes routes
const userCtrl = require('../controllers/user');

// Nos routes pour la connexion à l'applications de chaque utilisateur
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// On exporte ici notre router pour la route des utilisateurs
module.exports = router;
