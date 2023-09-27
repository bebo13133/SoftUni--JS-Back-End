const router = require('express').Router()
const { extractErrorMessage } = require('../utils/errorHelpers')
const animalService = require('../services/postService')
const { isAuth } = require('../middlewares/authMiddleware')
const levels = require('../utils/platformHelpers')




//? rendering
router.get('/create', (req, res) => {
    res.render('animals/create')
})


//? Create
router.post('/create', async (req, res) => {

    const { name, years, kind, image, need, location, description } = req.body

    try {
        await animalService.create({
            name,
            years,
            kind,
            image,
            need,
            location,
            description,
            owner: req.user._id,
        }) 
        res.redirect('/animals/catalog')   //! да се насочи към каталог
 
    } catch (err) {

        res.render('animals/create', { error: extractErrorMessage(err) })
    }
});


//? Catalog page
router.get('/catalog', async (req, res) => {

    try {
        const animals = await animalService.getAll().lean()

        res.render('animals/catalog', { animals })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        console.log(errorMessage)

        res.render('animals/catalog', { error: errorMessage })

    }

})

//? Details

router.get('/:animalId/details', async (req, res) => {

    try {
        const animalId = req.params.animalId

        const animal = await animalService.getOne(animalId).lean()

        const isOwner = req.user?._id == animal.owner._id

        if (JSON.parse(JSON.stringify(animal.donations)).includes(req.user?._id)) {
            animal.alreadyDonate = true;                                      //? Проверявам да usera съществува вече в boughtBy от модела
        }
        res.render('animals/details', { animal, isOwner })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render('animals/details', { error: errorMessage })
    }

})



//? Edit animal

router.get('/:animalId/edit', isAuth, async (req, res) => {
    try {
        const animal = await animalService.getOne(req.params.animalId).lean()

        // crypto.dropDown = levels(crypto.payment); //? използвам го за зареждане на падащото меню 

        res.render('animals/edit', { animal })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)

        res.render(`animals/edit`, { error: errorMessage })
    }
});

router.post('/:animalId/edit', isAuth, async (req, res) => {
    const animalData = req.body
    try {
        await animalService.edit(req.params.animalId, animalData)

        res.redirect(`/animals/${req.params.animalId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`/animals/${req.params.animalId}/edit`, { error: errorMessage, ...animalData })
    }


})

//? buy animals - donate for animals

router.get('/:animalId/donate', isAuth, async (req, res) => {
    const animalId = req.params.animalId
    const userId = req.user?._id

    try {
        await animalService.buy(animalId, userId)

        res.redirect(`/animals/${animalId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`animals/edit`, { error: errorMessage })
    }

})


//? Search animals - 

router.get('/search', isAuth, async (req, res) => {
    const result = { ...req.query }

    let animals;

    try {

        if (!!result.search ) {
            animals = await animalService.searchGames(result.search).lean()
                console.log(animals)
        } else {
            animals = await animalService.getAll().lean()
            // console.log(animals)

        }
        res.render('animals/search', { animals })

    } catch (err) {
        res.redirect('/404')
    }
})







//? Delete photo

router.get('/:animalId/delete', isAuth, async (req, res) => {

    try {
        await animalService.delete(req.params.animalId)

        res.redirect('/animals/catalog')

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render(`animals/details`, { error: errorMessage })
    }
});









module.exports = router