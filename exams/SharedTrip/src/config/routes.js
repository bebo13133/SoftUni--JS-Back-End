const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')
const tripController = require('../controllers/tripController')

module.exports = (app) => {
    //    const PORT = 5000
    app.use(homeController)
    app.use('/users',userController)
    app.use('/trips',tripController)
    
    app.get('*', (req, res) => {
        res.redirect('/404')
    })
}


