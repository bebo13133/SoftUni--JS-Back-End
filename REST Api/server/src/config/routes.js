
const userController = require('../controllers/usersController')
const furnitureController = require('../controllers/furnitureController');
const homeController = require('../controllers/homeController');
module.exports = (app)=>{
    app.use(homeController)
    app.use('/users', userController)
    // app.use('/data', furnitureController)

}




