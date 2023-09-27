const router = require('express').Router()
const { extractErrorMessage } = require('../utils/errorHelpers')
const photoService = require('../services/photoService')
const { isAuth } = require('../middlewares/authMiddleware')
//? rendering
router.get('/create', (req, res) => {
    res.render('photos/create')
})
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

//? Deetails

router.get('/:photoId/details', async (req, res) => {

    try {
        const photoId = req.params.photoId

        const photo = await photoService.getOne(photoId).populate('commentList.user').lean()

        const isOwner = req.user?._id == photo.owner._id

        res.render('photos/details', { photo, isOwner })

    } catch (err) {

        const errorMessage = extractErrorMessage(err)
        console.log(errorMessage)

        res.render('photos/details', { error: errorMessage })
    }

})
//? Edit photo

router.get('/:photoId/edit', isAuth, async (req, res) => {
    try {
        const photo = await photoService.getOne(req.params.photoId).lean()

        res.render('photos/edit', { photo })
    } catch (err) {
        const errorMessage = extractErrorMessage(err)

        res.render(`photos/edit`, { error: errorMessage })
    }
});
router.post('/:photoId/edit',isAuth, async (req, res) => {
    const photoData = req.body
try{
   
    await photoService.edit(req.params.photoId, photoData)

    res.redirect(`/photos/${req.params.photoId}/details`)
}catch(err){

    const errorMessage = extractErrorMessage(err)

    res.render(`/photos/${req.params.photoId}/edit`, { error: errorMessage, ...photoData })
}


})

//? Comments

router.post('/:photoId/comments',isAuth,async (req, res) => {

const photoId = req.params.photoId
const { comment } = req.body
const user = req.user._id

await photoService.addComment(photoId, {user, comment})
res.redirect(`/photos/${photoId}/details`)


})







//? Delete photo

router.get('/:photoId/delete',isAuth, async (req, res) => {

    try {
        await photoService.delete(req.params.photoId)

        res.redirect('/photos/catalog')

    } catch (err) {
        const errorMessage = extractErrorMessage(err)


        res.render(`photos/details`, { error: errorMessage })

    }
});






//? Create
router.post('/create', async (req, res) => {

    const { name, age, description, location, image } = req.body

    try {
        await photoService.create({
            name,
            age,
            description,
            location,
            image,
            owner: req.user._id,
        })
        res.redirect('/photos/catalog')

    } catch (err) {



        res.render('photos/create', { error: extractErrorMessage(err) })
    }
});


module.exports = router