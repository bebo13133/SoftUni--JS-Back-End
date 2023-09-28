const router = require('express').Router();
const { log } = require('console')
const hotelService = require('../services/hotelService')
const {isAuth} = require('../middlewares/authMiddleware');
const { extractErrorMessage } = require('../utils/errorHelpers')
const userService = require('../services/userService')


//! да не забравя да го експортна router


router.get('/', async (req, res) => {
  try{
    const hotels = await hotelService.getAll().lean()


    res.render('home', { hotels })
    
  }catch(err) {

    const errorMessage = extractErrorMessage(err)
        console.log(errorMessage)

        res.render('hotels/catalog', { error: errorMessage })
  }

})

router.get('/profile',isAuth, async (req, res) => {
userId = req.user._id
const userBooking = (await hotelService.getBooked(userId)).map(b=>b.name)
const owner = await userService.findOwner(userId).lean()

owner.bookedNames = userBooking

// let fullName = `${owner.username}`
// let email = `${owner.email}`
// hotels.forEach(p => p.author = fullName );
// hotels.forEach(p => p.emailsUser = email)

  res.render('profile',{owner})
})





router.get('/404', (req, res) => {
    res.render('404')
})
module.exports = router
