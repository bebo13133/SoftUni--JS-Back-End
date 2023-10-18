const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')
const artController = require('../controllers/artController')

module.exports = (app) => {
    //    const PORT = 5000
    app.use(homeController)
    app.use('/users',userController)
    app.use('/arts',artController)
    
    app.get('*', (req, res) => {
        res.redirect('/404')
    })
}


