const User = require('../models/schemas/user');
const config = require('../models/config');
const jwt = require('jwt-simple')

/*
* C.R.U.D. routes
*/
exports.createUser = (req, res, next) => {

    const userData = {};
    // validate email
    // http://emailregex.com
    if (req.body.email) {
        if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email)))
            return res.status(400).send('Invalid email');
        else
            userData.email = req.body.email;
    }
    console.log(req.body.email)

    // check if password was provided
    if (req.body.password)
        userData.hash = req.body.password;
    if (req.body.hash)
        userData.hash = req.body.hash;
    if (req.body.name)
        userData.name = req.body.name;
    if (req.body.phoneProvider)
        userData.phoneProvider = req.body.phoneProvider;
    if (req.body.phoneNumber)
        userData.phoneNumber = req.body.phoneNumber;
    if (req.body.classYear)
        userData.classYear = req.body.classYear;

    // create new user
    const newUser = new User(userData);
    newUser.save()
    .then(user => {
        if (!user) return res.status(500).send('User failed to create')

        let payload = {
            id: user._id,
            email: user.email
        }
        let token = jwt.encode(payload, config.token_secret);
        user.token = token;
        user.save()
        .then(user => {
            if (!user) return res.status(500).send('User failed to create')
            return res.json({
                name: user.name,
                email: user.email,
                userId: user._id,
                token: user.token
            })
        })
    }).catch(err => {
        if (err) {
            if (err.code === 11000)
                return res.status(400).send('Email already registered');
            return res.status(400).send(err.message);
        }
    });
};

exports.getAllUsers = (req, res, next) => {
    User.find({}).then(users => res.json(users)).catch(next);
}

exports.getUserById = (req, res, next) => {
    User.findById(req.body.id).then(user => {
        if (!user) return res.status(404).send('Could not find user: invalid id');
        return res.json(user)
    }).catch(next);
};

exports.updateUser = (req, res, next) => {
    User.findOneAndUpdate({_id: req.body.id}, req.body).then(user => {
        if (!user) return res.status(404).send('No user with that ID');
        return res.sendStatus(200);
    }).catch(next);
};

exports.updateFriends = (req, res, next) => {
    console.log(req.body)
    User.findById(req.body.id).then(user =>{
      friends = user.ratings
      if (friends.includes(req.body.ratings)) {
        return res.sendStatus(404)
      }
      User.update(
          { _id: req.body.id},
          { $push: {ratings: req.body.ratings}}
      ).then(user => {
          console.log(user)
      }).catch(next)
      return res.sendStatus(200)
    })
}
    // User.findByIdAndUpdate(req.body.id, req.body).then(user => {
    //     if (!user) return res.status(404).send('No user with that ID');
    //     console.log(req.body)
    //     return res.sendStatus(200);
    // }).catch(next);
// };
// User.deleteMany({"classYear": { $gt 1} req.body.id)


exports.deleteUser = (req, res, next) => {
    User.findByIdAndRemove(req.body.id)
    .then(user => res.sendStatus(200))
    .catch(next);
}
