const mongoose  = require('mongoose')
const bcrypt = require('bcrypt');
const env = require('../env')

const schema = new mongoose.Schema({
  username: String,
  password: { type: String, required: true },
  body: { type: String, required: true}
});

schema.pre('save', function(next){
  const salt = bcrypt.genSaltSync(env.saltRounds);
  const hash = bcrypt.hashSync(this.password, salt)
  this.password = hash
  next()
})

module.exports = mongoose.model('user', schema)