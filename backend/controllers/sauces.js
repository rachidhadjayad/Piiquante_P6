// Création des routers

const Thing = require('../models/sauces');

// Importation du module fs de node.js pour acceder aux fichiers du serveur
const fs = require('fs');

// Intercepter les requêtes de la route POST

exports.createThing = (req, res, next) => {
  // On parse notre sauceObject pour otenir nos information sous forme de tableau 
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  
  const thing = new Thing({
    ...sauceObject, 
    userId: sauceObject.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked:  [],
    usersDisliked:  []
  });
  
  thing.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneThing = (req, res, next) => {
// On utilise ensuite la méthode findOne() dans notre modèle Thing pour trouver le Thing unique ayant le même _id que le paramètre de la requête 
Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      console.log(thing);
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyThing = (req, res, next) => {
  const sauceObject = req.file ? { 
    ...JSON.parse(req.body.sauce), 
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
} : { ...req.body }; 
  // La méthode updateOne() permet de mettre à jour notre modèle
  // On utilise deux-points : en face du segment dynamique de la route pour la rendre accessible en tant que paramètre
  Thing.updateOne({_id: req.params.id}, { ...sauceObject, _id: req.params.id }).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllThings = (req, res, next) => {
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

