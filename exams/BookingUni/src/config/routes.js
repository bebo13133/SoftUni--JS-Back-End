const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')
const animalController = require('../controllers/hotelController')

module.exports = (app) => {
    //    const PORT = 5000
    app.use(homeController)
    app.use('/users',userController)
    app.use('/hotels',animalController)
    
    app.get('*', (req, res) => {
        res.redirect('/404')
    })
}


