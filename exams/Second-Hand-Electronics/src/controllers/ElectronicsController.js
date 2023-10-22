const router = require('express').Router()
const { extractErrorMessage } = require('../utils/errorHelpers')
const ElectronicsService = require('../services/ElectronicsService')
const { isAuth } = require('../middlewares/authMiddleware')
// const levels = require('../utils/platformHelpers')




//? rendering
router.get('/create', isAuth, (req, res) => {
    res.render('parts/create')
})


//? Create
router.post('/create', isAuth, async (req, res) => {

    const { name,
        type,
        production,
        exploitation,
        damages,
        image,
        price,
        description, } = req.body

    try {
        await ElectronicsService.create({
            name,
            type,
            production,
            exploitation,
            damages,
            image,
            price,
            description,
            owner: req.user._id,
        })
        res.redirect('/parts/catalog')   //! да се насочи към каталог

    } catch (err) {

        res.render('parts/create', { error: extractErrorMessage(err) })
    }
});


//? Catalog page
router.get('/catalog', async (req, res) => {

    try {
        const parts = await ElectronicsService.getAll().lean()

        res.render('parts/catalog', { parts })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        console.log(errorMessage)

        res.render('parts/catalog', { error: errorMessage })

    }

})

//? Details

router.get('/:partId/details', async (req, res) => {

    try {
        const partId = req.params.partId

        const part = await ElectronicsService.getOne(partId).lean()
        // const partVotes = await ElectronicsService.getOneUser(partId)

        const isOwner = req.user?._id == part.owner._id




        // //?--------------------------------------------------------------//    
        if (JSON.parse(JSON.stringify(part.buyingList)).includes(req.user?._id)) {
            part.alreadybuyingList = true;                                      //? Проверявам да usera съществува вече в boughtBy от модела
        }


        res.render('parts/details', { part, isOwner})

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render('parts/details', { error: errorMessage })
    }

})



//? Edit post

router.get('/:partId/edit', isAuth, async (req, res) => {
    try {
        const part = await ElectronicsService.getOne(req.params.partId).lean()


        if (part.owner._id.toString() != req.user._id) {

            return res.redirect("/");
        }

        res.render('parts/edit', { part })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)

        res.render(`parts/edit`, { error: errorMessage })
    }
});

router.post('/:partId/edit', isAuth, async (req, res) => {
    const part = req.body
    const partId = req.params.partId
    try {
        await ElectronicsService.edit(req.params.partId, part)

        res.redirect(`/parts/${req.params.partId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`parts/edit`, { error: errorMessage , part })
    }


})

//?Buy

router.get('/:partId/buying', isAuth, async (req, res) => {
    const partId = req.params.partId
    const userId = req.user?._id

    try {
        await ElectronicsService.voted(partId, userId)

     

      
        res.redirect(`/parts/${partId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`parts/${partId}/details`, { error: errorMessage })
    }

})

//? Search 

router.get('/search', isAuth, async (req, res) => {
    const result = { ...req.query }
   console.log(result)
let parts;
    try {

        if (!!result.search || !!result.searchType) {
            parts = await ElectronicsService.searchParts(result.search, result.searchType).lean()

        } else {
            parts = await ElectronicsService.getAll().lean()
        }
console.log(parts)
    //    parts = (!!result.search || !!result.type) 
    //     ? await ElectronicsService.searchParts(result.search, result.type).lean() 
    //     : await ElectronicsService.getAll().lean();

        res.render('parts/search', { parts })

    } catch (err) {
        res.redirect('/404')
    }
})






//? Delete part

router.get('/:partId/delete', isAuth, async (req, res) => {

    try {
        await ElectronicsService.delete(req.params.partId)

        res.redirect('/parts/catalog')

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render(`parts/details`, { error: errorMessage })
    }
});


module.exports = router