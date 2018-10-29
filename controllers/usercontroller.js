const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../env')

module.exports = {
  async login(ctx) {
    const { username, password } = ctx.request.body
    const user = await User.findOne({ username: username })
    ctx.assert(user, 422, '用户名不存在')
    const isSame = bcrypt.compareSync(password, user.password)
    ctx.assert(isSame, 422, '密码错误')
    const token = jwt.sign({ id: user._id }, env.secret);
    ctx.body = {
      token
    }
  },
  async index(ctx) {
    // const data = await User.find()
    ctx.body = ctx.user
  },
  async update(ctx) {
    const { content } = ctx.request.body
    const user = await User.findById(ctx.params.id)
    user.body = content
    await user.save()
    ctx.body = {
      message: '保存成功',
      status: true
    }
  }
}