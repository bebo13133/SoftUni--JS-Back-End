const router = require('express').Router();
const { log } = require('console')
const houseService = require('../services/houseService')
const {isAuth} = require('../middlewares/authMiddleware');
//! да не забравя да го експортна router


router.get('/', (req, res) => {
  
    res.render('home')
});





router.get('/404', (req, res) => {
    res.render('404')
})
module.exports = router
