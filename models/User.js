const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    require: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    //validator place holder
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

userSchema.virtual('friendCount').get(
  function() {
    return this.friends.reduce((total, friends) => total + friends.length + 1, 0);
  }
)

const User = model('User', userSchema);
module.exports = User;