const router = require('express').Router()
const { extractErrorMessage } = require('../utils/errorHelpers')
const artService = require('../services/artService')
const { isAuth } = require('../middlewares/authMiddleware')
const userService = require('../services/userService')
// const levels = require('../utils/platformHelpers')




//? rendering
router.get('/create', isAuth, (req, res) => {
    res.render('arts/create')
})


//? Create
router.post('/create', isAuth, async (req, res) => {


    const { title,
        painting,
        picture,
        certificate,
    } = req.body
      
    try {
       const publication = await artService.create({
            title,
            painting,
            picture,
            certificate,
            owner: req.user._id,
        })

        await userService.added(publication._id, req.user._id)

        res.redirect('/arts/catalog')   //! да се насочи към каталог

    } catch (err) {

        res.render('arts/create', { error: extractErrorMessage(err) })
    }
});


//? Catalog page
router.get('/catalog', async (req, res) => {

    try {
        const arts = await artService.getAll().lean()

        res.render('arts/catalog', { arts })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)


        res.render('arts/catalog', { error: errorMessage })

    }
})

//? Details

router.get('/:artId/details', isAuth, async (req, res) => {

    try {
        const artId = req.params.artId

        const art = await artService.getOne(artId).populate(["owner"]).lean()

        // const notAvailable = trip.seats === 0;

        const isOwner = req.user?._id == art.owner._id

        if (JSON.parse(JSON.stringify(art.shared)).includes(req.user?._id)) {
            art.alreadyShared = true;                                      //? Проверявам да usera съществува вече в boughtBy от модела
        }
        // const tripBuddies = trip.contactsPassengers.join(', ');
        res.render('arts/details', { art, isOwner})

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render('arts/details', { error: errorMessage })
    }

})



//? Edit book

router.get('/:artId/edit', isAuth, async (req, res) => {


    try {
        const art = await artService.getOne(req.params.artId).lean()


        if (art.owner._id.toString() != req.user._id) {

            return res.redirect("/arts/details");
        }

        res.render('arts/edit', { art })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)

        res.render(`arts/edit`, { error: errorMessage })
    }
});

router.post('/:artId/edit', isAuth, async (req, res) => {
    const artData = req.body


    try {
        await artService.edit(req.params.artId, artData)

        res.redirect(`/arts/${req.params.artId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`/arts/${req.params.artId}/edit`, { error: errorMessage, ...artData })
    }


})

//? Share

router.get('/:artId/share', isAuth, async (req, res) => {
    const artId = req.params.artId
    const userId = req.user?._id

    try {
        await artService.share(artId, userId)
        await userService.addUser(artId,userId)              
        res.redirect(`/arts/${artId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`arts/details`, { error: errorMessage })
    }

})




//? Delete photo

router.get('/:artId/delete', isAuth, async (req, res) => {

    try {
        await artService.delete(req.params.artId)

        res.redirect('/trips/catalog')

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render(`trips/details`, { error: errorMessage })
    }
});











module.exports = router