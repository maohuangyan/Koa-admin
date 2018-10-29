const User = require('../models/user')

module.exports = {
  async login(ctx) {
    await ctx.render('login')
  },
  async index(ctx) {
    const users = await User.find()
    await ctx.render('index', {
      users: users
    })
  }
}