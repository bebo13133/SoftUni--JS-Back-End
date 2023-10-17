const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')
const jobController = require('../controllers/jobController')

module.exports = (app) => {
    //    const PORT = 5000
    app.use(homeController)
    app.use('/users',userController)
    app.use('/jobs',jobController)
    
    app.get('*', (req, res) => {
        res.redirect('/404')
    })
}


