const { User } = require('../models');

const userController = {
  getAllUsers(req,res) {
    User.find({})
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbUserData => res.json
    (dbUserData))
    .catch(err => {
    res.sendStatus(400);
    });
  },

  getUserById({ params }, res) {
    user.findOne({ _id: params.id })
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => {
    if (!dbUserData) {
      res.sendStatus(404).json({ message: 'No user found with this id!'});
      return;
    }
    res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },

  createUser({ body }, res) {
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      {_id: params.id},
      body,
      { new: true, runValidators: true })

      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!'});
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndUpdate({ _id: params.id })
      .then(dbUserData => {
      if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id!'}); 
      return;
      }
      res.json(dbUserData);
    })
      .catch(err => res.json(err));
  }
};

module.exports = userController;