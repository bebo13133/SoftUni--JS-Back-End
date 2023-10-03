const router = require('express').Router()
const { extractErrorMessage } = require('../utils/errorHelpers')
const courseService = require('../services/courseService')
const { isAuth } = require('../middlewares/authMiddleware')
const levels = require('../utils/platformHelpers')




//? rendering
router.get('/create', (req, res) => {
    res.render('courses/create')
})


//? Create
router.post('/create', async (req, res) => {

    const { title, description, image, duration, } = req.body
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    try {
        await courseService.create({
            title,
            description,
            image,
            duration,
            createdAt: date,
            owner: req.user._id,
        })
        res.redirect('/courses/catalog')

    } catch (err) {

        res.render('courses/create', { error: extractErrorMessage(err) })
    }
});


//? Catalog page
router.get('/catalog', async (req, res) => {

    try {
        const unSortedCourses = await courseService.getAll().lean()

       const  courses = unSortedCourses.sort((a, b) => a.enrolled.length - b.enrolled.length);
       



        res.render('courses/catalog', { courses })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        console.log(errorMessage)

        res.render('courses/catalog', { error: errorMessage })

    }

})

//? Details

router.get('/:courseId/details', async (req, res) => {

    try {
        const courseId = req.params.courseId

        const course = await courseService.getOne(courseId).lean()

        const isOwner = req.user?._id == course.owner._id

        if (JSON.parse(JSON.stringify(course.enrolled)).includes(req.user?._id)) {
            course.alreadyEnrolled = true;                                      //? Проверявам да usera съществува вече в boughtBy от модела
        }
        res.render('courses/details', { course, isOwner })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render('courses/details', { error: errorMessage })
    }

})



//? Edit crypto

router.get('/:courseId/edit', isAuth, async (req, res) => {
    try {
        const course = await courseService.getOne(req.params.courseId).lean()

        // crypto.dropDown = levels(crypto.payment); //? използвам го за зареждане на падащото меню 

        res.render('courses/edit', { course })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)

        res.render(`courses/edit`, { error: errorMessage })
    }
});

router.post('/:courseId/edit', isAuth, async (req, res) => {
    const courseData = req.body
    try {

        await courseService.edit(req.params.courseId, courseData)

        res.redirect(`/courses/${req.params.courseId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`/course/${req.params.courseId}/edit`, { error: errorMessage, ...courseData })
    }


})

//? enrolled

router.get('/:courseId/enrolled', isAuth, async (req, res) => {
    const courseId = req.params.courseId
    const userId = req.user?._id

    try {
        await courseService.enrolled(courseId, userId)

        res.redirect(`/courses/${courseId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`courses/edit`, { error: errorMessage })
    }

})


//? Search crypto

router.get('/search', isAuth, async (req, res) => {
    const result = { ...req.query }
    let courses;

    try {

        if (!!result.search) {
            courses = await courseService.searchGames(result.search).lean()
         
        } else {
            courses = await courseService.getAll().lean()
        }
        res.render('courses/catalog', { courses })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)

        res.render(`courses/edit`, { error: errorMessage })
    }
})







//? Delete photo

router.get('/:cryptoId/delete', isAuth, async (req, res) => {

    try {
        await cryptoService.delete(req.params.cryptoId)

        res.redirect('/cryptos/catalog')

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render(`cryptos/details`, { error: errorMessage })
    }
});









module.exports = router