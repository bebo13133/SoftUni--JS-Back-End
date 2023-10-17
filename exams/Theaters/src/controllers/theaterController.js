const router = require('express').Router()
const { extractErrorMessage } = require('../utils/errorHelpers')
const theaterService = require('../services/theaterService')
const { isAuth } = require('../middlewares/authMiddleware')
const levels = require('../utils/platformHelpers')




//? rendering
router.get('/create',isAuth, (req, res) => {
    res.render('theaters/create')
})


//? Create
router.post('/create', isAuth, async (req, res) => {

    const theater = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        owner: req.user._id,
    };
    if (req.body.isPublic === 'on') {
        theater.isPublic = true;
    } else {
        theater.isPublic = false;

    }
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    theater.createdOn = date;

   try {
        await theaterService.create(theater)
        res.redirect('/')

    } catch (err) {

        res.render('theaters/create', { error: extractErrorMessage(err) })
    }
});


// //? Catalog page
// router.get('/catalog', async (req, res) => {

//     try {
//         const unSortedCourses = await courseService.getAll().lean()

//        const  courses = unSortedCourses.sort((a, b) => a.enrolled.length - b.enrolled.length);
       



//         res.render('courses/catalog', { courses })

//     } catch (err) {
//         const errorMessage = extractErrorMessage(err)
//         console.log(errorMessage)

//         res.render('courses/catalog', { error: errorMessage })

//     }

// })

//? Details

router.get('/:theaterId/details', async (req, res) => {

    try {
        const theaterId = req.params.theaterId

        const theater = await theaterService.getOne(theaterId).lean()

        const isOwner = req.user?._id == theater.owner._id

        if (JSON.parse(JSON.stringify(theater.likes)).includes(req.user?._id)) {
            theater.alreadyLiked = true;                                      //? Проверявам да usera съществува вече в boughtBy от модела
        }
        res.render('theaters/details', { theater, isOwner })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render('theaters/details', { error: errorMessage })
    }

})



//? Edit THEATER

router.get('/:theaterId/edit', isAuth, async (req, res) => {
    try {
        const theater = await theaterService.getOne(req.params.theaterId).lean()

       

        res.render('theaters/edit', { theater })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)

        res.render(`theaters/edit`, { error: errorMessage })
    }
});

router.post('/:theaterId/edit', isAuth, async (req, res) => {
    const theaterData = req.body
    if (req.body.isPublic === 'on') {
        theaterData.isPublic = true;
    } else {
        theaterData.isPublic = false;

    }
    try {

        await theaterService.edit(req.params.theaterId, theaterData)

        res.redirect(`/theaters/${req.params.theaterId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`/theaters/${req.params.theaterId}/edit`, { error: errorMessage, ...theaterData })
    }


})

//? likes

router.get('/:theaterId/likes', isAuth, async (req, res) => {
    const theaterId = req.params.theaterId
    const userId = req.user?._id

    try {
        await theaterService.liked(theaterId, userId)

        res.redirect(`/theaters/${theaterId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`theaters/edit`, { error: errorMessage })
    }

})










//? Delete photo

router.get('/:theatersId/delete', isAuth, async (req, res) => {

    try {
        await theaterService.delete(req.params.theatersId)

        res.redirect('/')

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render(`theaters/details`, { error: errorMessage })
    }
});









module.exports = router