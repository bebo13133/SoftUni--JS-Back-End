const router = require('express').Router();
const { log } = require('console')
const photoService = require('../services/photoService')
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


router.get('/profile',isAuth, async (req, res) => {
userId = req.user._id
const photos = await photoService.getOwnerPosts(userId).lean()
const owner = await userService.findOwner(userId).lean()
let fullName = `${owner.firstName} ${owner.lastName}`
  photos.forEach(p => p.author = fullName );


// posts.author = fullName
// log(posts)

  res.render('profile',{photos})
})





router.get('/404', (req, res) => {
    res.render('404')
})
module.exports = router
