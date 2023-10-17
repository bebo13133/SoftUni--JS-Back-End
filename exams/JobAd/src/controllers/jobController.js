const router = require('express').Router()
const { extractErrorMessage } = require('../utils/errorHelpers')
const jobService = require('../services/jobService')
const { isAuth } = require('../middlewares/authMiddleware')
// const levels = require('../utils/platformHelpers')




//? rendering
router.get('/create', (req, res) => {
    res.render('jobs/create')
})


//? Create
router.post('/create', async (req, res) => {

    const {headline,
        location,
        companyName,
        companyDescription,} = req.body

    try {
        await jobService.create({
            headline,
            location,
            companyName,
            companyDescription,
            owner: req.user._id,
        }) 
        res.redirect('/jobs/catalog')   //! да се насочи към каталог
 
    } catch (err) {

        res.render('jobs/create', { error: extractErrorMessage(err) })
    }
});


//? Catalog page
router.get('/catalog', async (req, res) => {

    try {
        const jobs = await jobService.getAll().lean()

        res.render('jobs/catalog', { jobs })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        console.log(errorMessage)

        res.render('jobs/catalog', { error: errorMessage })

    }

})

//? Details

router.get('/:jobId/details', async (req, res) => {

    try {
        const jobId = req.params.jobId

        const job = await jobService.getOne(jobId).populate(["owner", "applied"]).lean() //? за да мога да имам достъп до информацията за user-a

        const isOwner = req.user?._id == job.owner._id

        if (JSON.parse(JSON.stringify(job.applied)).includes(req.user?._id)) {
            job.alreadyApplied = true;                                      //? Проверявам да usera съществува вече в boughtBy от модела
        }
        res.render('jobs/details', { job, isOwner })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render('jobs/details', { error: errorMessage })
    }

})



//? Edit job

router.get('/:jobId/edit', isAuth, async (req, res) => {
    try {
        const job = await jobService.getOne(req.params.jobId).lean()
        const userId = req.user._id;
        // crypto.dropDown = levels(crypto.payment); //? използвам го за зареждане на падащото меню 
        if (job.owner._id.toString() != userId) {
            // console.log(job.owner._id)
            // console.log(userId)

            return res.redirect("/");
          }

        res.render('jobs/edit', { job })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)

        res.render(`jobs/edit`, { error: errorMessage })
    }
});

router.post('/:jobId/edit', isAuth, async (req, res) => {
    const jobData = req.body
    try {
        await jobService.edit(req.params.jobId, jobData)

        res.redirect(`/jobs/${req.params.jobId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`/jobs/${req.params.jobId}/edit`, { error: errorMessage, ...jobData })
    }


})

//? Apply

router.get('/:jobId/applied', isAuth, async (req, res) => {
    const jobId = req.params.jobId
    const userId = req.user?._id

    try {
        await jobService.applied(jobId, userId)

        res.redirect(`/jobs/${jobId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`jobs/edit`, { error: errorMessage })
    }

})


//? Search animals - 

router.get('/search', isAuth, async (req, res) => {
    const result = { ...req.query }
    // console.log(result.search )
    let jobs;

    try {

        if (!!result.search ) {
            jobs = await jobService.searchGames(result.search)
                console.log(jobs)
        } 
        res.render('jobs/search', { jobs })

    } catch (err) {
        res.redirect('/404')
    }
})







//? Delete photo

router.get('/:jobId/delete', isAuth, async (req, res) => {

    try {
        await jobService.delete(req.params.jobId)

        res.redirect('/jobs/catalog')

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render(`jobs/details`, { error: errorMessage })
    }
});









module.exports = router