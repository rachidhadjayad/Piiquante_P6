// création des routeurs

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
// On appelle multer qui est principalement utilisé pour télécharger des fichiers
const multer = require('../middleware/multer-config'); 

const stuffCtrl = require('../controllers/sauces');

// on n'appelle pas la fonction on l'applique juste à la route
// on ajoute auth à nos routes pour l'authentification
// ici on presente notre CRUD (Create Read Update Delete)
router.get('/', auth, stuffCtrl.getAllThings);
router.post('/', auth,multer, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth,multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

// pour exporter notre routeur

module.exports = router;