const multer = require('multer');

// Le type Multipurpose Internet Mail Extensions (type MIME) est un standard permettant d'indiquer la nature et le format d'un document
// Ici on souhaite que notre format d'image il soit de type soit JPG, JPEG ou PNG
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// On dit qu'on enregistre sur le disque 
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
// On indique quel nom et quel format on souhaite l'enregistrer 
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');