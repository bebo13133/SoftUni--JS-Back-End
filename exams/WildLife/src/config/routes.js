const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')
const animalController = require('../controllers/postController')

module.exports = (app) => {
    //    const PORT = 5000
    app.use(homeController)
    app.use('/users',userController)
    app.use('/posts',animalController)
    
    app.get('*', (req, res) => {
        res.redirect('/404')
    })
}


