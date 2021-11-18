const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const thoughtsSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    length: 1<280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  username: {
    type: String,
    required: true
  },
  reactions: []
});

thoughtsSchema.virtual('reactionCount').get(function(){
  return this.reactions.reduce((total, reaction) => total + reaction.replies.length + 1, 0);
});

const Thought = model('Thoughts', thoughtsSchema);
module.exports = Thought;
