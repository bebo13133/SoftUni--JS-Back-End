const router = require('express').Router();
const { log } = require('console')
const photoService = require('../services/photoService')
const {isAuth} = require('../middlewares/authMiddleware');
//! да не забравя да го експортна router


router.get('/', (req, res) => {
  
    res.render('home')
});

router.get('/profile', isAuth, async (req, res) => {  //? isAuth за routGuard за да сме сигурни че само логнати users могат да го достъпят                  

    const photos = await photoService.getOwnerPhotos(req.user._id).lean();
    console.log(photos)
    res.render('profile', { photos, photoCount: photos.length})
})



router.get('/404', (req, res) => {
    res.render('404')
})
module.exports = router
