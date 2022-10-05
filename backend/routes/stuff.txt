// création des routers

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const stuffCtrl = require('../controllers/stuff');

// on n'appelle pas la fonction on l'applique juste à la route
// on ajoute auth à nos routes pour l'authentification

router.get('/', auth, stuffCtrl.getAllThings);
router.post('/', auth, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

// pour exporter notre routeur

module.exports = router;