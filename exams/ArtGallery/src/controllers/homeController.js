const router = require('express').Router();
const { log } = require('console')
const artService = require('../services/artService')
const { isAuth } = require('../middlewares/authMiddleware');
const { extractErrorMessage } = require('../utils/errorHelpers')
const userService = require('../services/userService')



router.get('/', async (req, res) => {
  try {

    const arts = await artService.getAll().lean()
    console.log(arts)

    res.render('home', { arts })

  } catch (err) {

    const errorMessage = extractErrorMessage(err)
    console.log(errorMessage)

    res.render('/', { error: errorMessage })
  }

});


router.get('/profile', isAuth, async (req, res) => {

  const user = await userService.findOwner(req.user._id).populate('publications').populate('shares').lean()

  const publication = user.publications.map(x => x.title).join(", ")

  const sharesTitle = user.shares.map(x => x.title).join(", ")

  res.render('profile', { ...user, publication, sharesTitle })
})


router.get('/404', (req, res) => {
  res.render('404')
})
module.exports = router
