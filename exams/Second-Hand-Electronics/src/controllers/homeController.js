const router = require('express').Router();
const { log } = require('console')
const partService = require('../services/ElectronicsService')
const {isAuth} = require('../middlewares/authMiddleware');
const { extractErrorMessage } = require('../utils/errorHelpers')
const userService = require('../services/userService')


//! да не забравя да го експортна router


router.get('/', async (req, res) => {
  try{
    
    res.render('home')
    
  }catch(err) {

    const errorMessage = extractErrorMessage(err)
        console.log(errorMessage)

        res.render('/', { error: errorMessage })
  }

});








router.get('/404', (req, res) => {
    res.render('404')
})
module.exports = router
