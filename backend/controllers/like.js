const Thing = require('../models/sauces');


exports.likeThing = (req, res, next) => {
    console.log(req.body.like)
    if (req.body.like == 1) {
      Thing.updateOne(
      {_id: req.params.id},
      { 
        $inc: {likes: 1},
        $push: {usersLiked: req.body.userId},
      }).then(() => res.status(201).json({ message: "Sauces like +1"}))
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
                $pull: {usersLiked: req.body.userId},
              }).then(() => res.status(201).json({ message: "Sauces dislike -1"}))
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
            }).then(() => res.status(201).json({ message: "Sauces dislike -1"}))
            .catch((error) => res.status(500).json({error}));
        }
  
      }) .catch((error) => res.status(401).json({error}));
    } else if (req.body.like == -1){
        Thing.updateOne(
          {_id: req.params.id},
          { 
            $inc: {dislikes: 1},
            $push: {usersDisliked: req.body.userId},
          }).then(() => res.status(201).json({ message: "Sauces like 0"}))
          .catch((error) => res.status(500).json({error}));
      }
  };