const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')
const photoController = require('../controllers/cryptoController')

module.exports = (app) => {
    //    const PORT = 5000
    app.use(homeController)
    app.use('/users',userController)
    app.use('/cryptos',photoController)
    
    app.get('*', (req, res) => {
        res.redirect('/404')
    })
}


