const router = require('express').Router()
const { extractErrorMessage } = require('../utils/errorHelpers')
const photoService = require('../services/photoService')
const { isAuth } = require('../middlewares/authMiddleware')
// const levels = require('../utils/platformHelpers')




//? rendering
router.get('/create', isAuth, (req, res) => {
    res.render('photos/create')
})


//? Create
router.post('/create', isAuth, async (req, res) => {

    const { title,
        keyWord,
        location,
        date,
        image,
        description, } = req.body

    try {
        await photoService.create({
            title,
            keyWord,
            location,
            date,
            image,
            description,
            owner: req.user._id,
        })
        res.redirect('/photos/catalog')   //! да се насочи към каталог

    } catch (err) {

        res.render('photos/create', { error: extractErrorMessage(err) })
    }
});


//? Catalog page
router.get('/catalog', async (req, res) => {

    try {
        const photos = await photoService.getAll().lean()

        res.render('photos/catalog', { photos })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        console.log(errorMessage)

        res.render('photos/catalog', { error: errorMessage })

    }

})

//? Details

router.get('/:photoId/details', async (req, res) => {

    try {
        const photoId = req.params.photoId

        const photo = await photoService.getOne(photoId).lean()
        const photoVotes = await photoService.getOneUser(photoId)

        const isOwner = req.user?._id == photo.owner._id

        //! Събирам на всички гласували потребители email адресите

        let voteUsers = photoVotes.toObject();

        let emails = []
        voteUsers.votes.forEach(x => emails.push(x.email))
        const resultEmail = emails.join(', ')
        console.log(resultEmail.length)

        //?--------------------------------------------------------------//    
        if (JSON.parse(JSON.stringify(photo.votes)).includes(req.user?._id)) {
            photo.alreadyVoted = true;                                      //? Проверявам да usera съществува вече в boughtBy от модела
        }


        res.render('photos/details', { photo, isOwner, resultEmail, emails })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render('photos/details', { error: errorMessage })
    }

})



//? Edit post

router.get('/:photoId/edit', isAuth, async (req, res) => {
    try {
        const photo = await photoService.getOne(req.params.photoId).lean()

        
        if (photo.owner._id.toString() != req.user._id) {
    
            return res.redirect("/");
        }

        res.render('photos/edit', { photo })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)

        res.render(`photos/edit`, { error: errorMessage })
    }
});

router.post('/:photoId/edit', isAuth, async (req, res) => {
    const photoData = req.body
    try {
        await photoService.edit(req.params.photoId, photoData)

        res.redirect(`/photos/${req.params.photoId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`/photos/${req.params.photoId}/edit`, { error: errorMessage, ...photoData })
    }


})

//?Voted 

router.get('/:photoId/voteUp', isAuth, async (req, res) => {
    const photoId = req.params.photoId
    const userId = req.user?._id

    try {
        await photoService.voted(photoId, userId)

        const votePeople = await photoService.getOne(photoId)

        votePeople.rating += 1                                //? махам едно място когато има нов човек 

        await votePeople.save()


        res.redirect(`/photos/${photoId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`photos/${photoId}/details`, { error: errorMessage })
    }

})

router.get('/:photoId/voteDown', isAuth, async (req, res) => {
    const photoId = req.params.photoId
    const userId = req.user?._id

    try {
        await photoService.voted(photoId, userId)

        const votePeople = await photoService.getOne(photoId)
     
        votePeople.rating -= 1                                //? махам едно място когато има нов човек 

        await votePeople.save()


        res.redirect(`/photos/${photoId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`photos/${photoId}/details`, { error: errorMessage })
    }

})






//? Delete photo

router.get('/:photoId/delete', isAuth, async (req, res) => {

    try {
        await photoService.delete(req.params.photoId)

        res.redirect('/photos/catalog')

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render(`photos/details`, { error: errorMessage })
    }
});


module.exports = router