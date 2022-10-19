const sauces = require('../models/sauces');
const Thing = require('../models/sauces');

exports.likeThing = (req, res, next) => {

sauces
.findOne({_id : req.params.id})
.then((objet) => {
// like = 1 (likes  = +1)
if(objet.usersLiked.includes(req.body.userId) && req.body.like === 1){
} 

// Mise à jour de la base de données
sauces.updateOne(
    {_id :req.params.id},
    {
        $inc: {likes: 1},
        $push: {usersLiked: req.body.userId}
    }
)
.then(() => res.status(201).json({ message: "sauces like +1"}))
.catch((error) => res.status(404).json({error}));

// like = 0 (likes = 0, pas de like)

if(objet.usersLiked.includes(req.body.userId) && req.body.like === 0){

sauces.updateOne(
    {_id :req.params.id},
    {
        $inc: {likes: -1},
        $pull: {usersLiked: req.body.userId},
    }
)
.then(() => res.status(201).json({ message: "sauces like 0"}))
.catch((error) => res.status(404).json({error}));
};

// like = -1 (dislikes = +1)

if(objet.usersDisliked.includes(req.body.userId) && req.body.like === -1){

    sauces.updateOne(
        {_id :req.params.id},
        {
            $inc: {dislikes: -1},
            $push: {usersDisliked: req.body.userId}
        }
    )
    .then(() => res.status(201).json({ message: "sauces dislike 0"}))
    .catch((error) => res.status(404).json({error}));
    }

})



.catch((error) => res.status(404).json({error}));



// like = -1 (dislikes = +1)

// like = 0 (dislikes = 0)

};
