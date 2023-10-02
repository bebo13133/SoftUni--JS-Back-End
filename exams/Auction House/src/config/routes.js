const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')
const houseController = require('../controllers/houseController')

module.exports = (app) => {
    //    const PORT = 5000
    app.use(homeController)
    app.use('/users',userController)
    app.use('/houses',houseController)
    
    app.get('*', (req, res) => {
        res.redirect('/404')
    })
}


