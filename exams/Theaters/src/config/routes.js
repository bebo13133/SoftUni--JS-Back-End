const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')
const theaterService = require('../controllers/theaterController')

module.exports = (app) => {
    //    const PORT = 5000
    app.use(homeController)
    app.use('/users',userController)
    app.use('/theaters',theaterService)
    
    app.get('*', (req, res) => {
        res.redirect('/404')
    })
}


