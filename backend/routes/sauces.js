// Création des routeurs
const express = require('express');
const router = express.Router();

// Importation du controllers des likes
const like = require('../controllers/like');

// Importation du middleware d'autentification
const auth = require('../middleware/auth');

// On appelle multer qui est principalement utilisé pour télécharger des fichiers
const multer = require('../middleware/multer-config'); 

const stuffCtrl = require('../controllers/sauces');

// On n'appelle pas la fonction on l'applique juste à la route
// On ajoute auth à nos routes pour l'authentification
// Ici on presente notre CRUD (Create Read Update Delete)
router.get('/', auth, stuffCtrl.getAllThings);
router.post('/', auth,multer, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth,multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
// partie Likes et Dislikes
router.post('/:id/like', auth, like.likeThing);

// On exporte notre routeur
module.exports = router;