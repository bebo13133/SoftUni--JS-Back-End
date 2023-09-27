const router = require('express').Router();
const { log } = require('console')
const animalService = require('../services/animalService')
const {isAuth} = require('../middlewares/authMiddleware');
const { extractErrorMessage } = require('../utils/errorHelpers')

//! да не забравя да го експортна router


router.get('/', async (req, res) => {
  try{
    const animals = await animalService.lastThree().lean();
    console.log(animals)
    res.render('home',{animals})
    
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
