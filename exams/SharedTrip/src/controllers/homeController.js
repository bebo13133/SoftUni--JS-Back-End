const router = require('express').Router();
const { log } = require('console')
const tripService = require('../services/tripService')
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


router.get('/profile',isAuth, async(req, res) => {

  const ownerTrips = await tripService.getOwnerTrips(req.user._id).lean()
  console.log(req.user)
 
let genderImage;
if(req.user.gender === 'male'){
  genderImage ="/images/male.png"
}else{
  genderImage = "/images/female.png"
}                                         //? добавих gender към tokenHelpers, за да мога тука да го имам като параметър ,за да мога да сменя снимката

  res.render('profile',{ownerTrips, genderImage})
})






router.get('/404', (req, res) => {
    res.render('404')
})
module.exports = router
