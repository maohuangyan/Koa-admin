const mongoose  = require('mongoose')

const schema = new mongoose.Schema({
  title: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user'}
});

module.exports = mongoose.model('blog', schema)