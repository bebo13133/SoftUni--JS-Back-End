const router = require('express').Router();
const { log } = require('console')
const jobService = require('../services/jobService')
const {isAuth} = require('../middlewares/authMiddleware');
const { extractErrorMessage } = require('../utils/errorHelpers')

//! да не забравя да го експортна router


router.get('/', async (req, res) => {
  try{
    const jobs = await jobService.lastThree().lean();
    
    res.render('home',{jobs})
    
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
