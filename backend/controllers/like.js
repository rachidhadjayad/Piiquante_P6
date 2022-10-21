const Thing = require('../models/sauces');

exports.likeThing = (req, res, next) => {
    console.log(req.body.like)
    if (req.body.like == 1) {
      Thing.updateOne(
      {_id: req.params.id},
      { 
// L'opérateur $inc incrémente un champ d'une valeur spécifiée
        $inc: {likes: 1},
// L'opérateur $push ajoute une valeur spécifiée à un tableau
        $push: {usersLiked: req.body.userId},
      }).then(() => res.status(201).json({ message: "Sauce like +1"}))
      .catch((error) => res.status(500).json({error}));
    } else if (req.body.like == 0) {
      Thing.findOne({_id: req.params.id})
      .then((thing) => {
        let thingDislike = true;
  
        for (let userId of thing.usersLiked){
          console.log(userId,req.body.userId);
        if (req.body.userId == userId){
            Thing.updateOne(
              {_id: req.params.id},
              { 
                $inc: {likes: -1},
// L'opérateur $pull supprime d'un tableau existant 
// de toutes les instances d'une valeur ou de valeurs qui correspondent à une condition spécifiée
                $pull: {usersLiked: req.body.userId},
              }).then(() => res.status(201).json({ message: "Sauce dislike -1"}))
              .catch((error) => res.status(500).json({error}));
              thingDislike = false;
          }
        }
        if (thingDislike === true){
          Thing.updateOne(
            {_id: req.params.id},
            { 
              $inc: {dislikes: -1},
              $pull: {usersDisliked: req.body.userId},
            }).then(() => res.status(201).json({ message: "Sauce dislike -1"}))
            .catch((error) => res.status(500).json({error}));
        }
  
      }) .catch((error) => res.status(401).json({error}));
    } else if (req.body.like == -1){
        Thing.updateOne(
          {_id: req.params.id},
          { 
            $inc: {dislikes: 1},
            $push: {usersDisliked: req.body.userId},
          }).then(() => res.status(201).json({ message: "Sauce like 0"}))
          .catch((error) => res.status(500).json({error}));
      }
  };