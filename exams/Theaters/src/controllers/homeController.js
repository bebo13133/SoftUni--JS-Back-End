const router = require('express').Router();
const { log } = require('console')
const theaterService = require('../services/theaterService')
const { isAuth } = require('../middlewares/authMiddleware');
const { extractErrorMessage } = require('../utils/errorHelpers');
//! да не забравя да го експортна router


router.get('/', async (req, res) => {
    let theaters;

    try {

        if (req.user) {
            theaters = await theaterService.getAll().lean();
        //   theaters.isAuth = true
            // theaters.alreadyHasUser = true
        } else {
            // theaters.alreadyHasUser = false
            theaters = await theaterService.getThreeTheaters().lean()
        }
        res.render('home', {theaters })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render(`home`, { error: errorMessage })

    }


});


router.get('/sorted-by-date', isAuth, async (req, res) => {
    try {
        const theaters = await theaterService.getAllTheatersSorted().lean();

        res.render('home', { theaters })

    } catch (err) {
       
    }

})

router.get('/sorted-by-likes', isAuth, async (req, res,)=>{
try{
    const theaters = await theaterService.getAllTheatersByLikes().lean()
    res.render('home', { theaters })
}catch (err) {
    const errorMessage = extractErrorMessage(err)
    res.render(`home`, { error: errorMessage })

}

})

router.get('/404', (req, res) => {
    res.render('404')
})
module.exports = router
