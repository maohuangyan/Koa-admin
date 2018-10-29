const Blog = require('../models/blog')

module.exports = {
  
  async index(ctx){
    const blogs = await Blog.find().populate('user', '-password')
    ctx.body = {
      // user: ctx.user,
      blogs: blogs
    }
  }
  

}