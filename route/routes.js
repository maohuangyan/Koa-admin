const usercontroller = require('../controllers/usercontroller')
const blogcontroller = require('../controllers/blogcontroller')
const sitecontroller = require('../controllers/sitecontroller')

const jwt = require('../middleware/jwt')

module.exports = (router) => {
  router.post('login', usercontroller.login)
  router.get('users', jwt, usercontroller.index);
  router.put('users/:id', jwt, usercontroller.update)

  router.get('blogs', jwt, blogcontroller.index)
  router.get('ejs', sitecontroller.login)
  router.get('index', sitecontroller.index)
}