const User = require('../models/user')
const jwt = require('jsonwebtoken');
const env = require('../env')

module.exports = async (ctx, next) => {
  const token = String(ctx.get('authorization')).split(' ').pop()
  const { id } = jwt.verify(token, env.secret)
  const user = await User.findById(id).select('-password -body')
  ctx.user = user
  await next()
}