const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')
const animalController = require('../controllers/bookController')

module.exports = (app) => {
    //    const PORT = 5000
    app.use(homeController)
    app.use('/users',userController)
    app.use('/books',animalController)
    
    app.get('*', (req, res) => {
        res.redirect('/404')
    })
}


