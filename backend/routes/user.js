const express = require('express');
const router = express.Router();
// on associe la fonction au differentes routes
const userCtrl = require('../controllers/user');

// Nos routes pour la connexion à l'applications de chaque utilisateur
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
