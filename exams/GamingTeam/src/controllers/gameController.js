const router = require('express').Router()
const { extractErrorMessage } = require('../utils/errorHelpers')
const gameService = require('../services/gameService')
const { isAuth } = require('../middlewares/authMiddleware')
const levels = require('../utils/platformHelpers')




//? rendering
router.get('/create', (req, res) => {
    res.render('games/create')
})


//? Create
router.post('/create', async (req, res) => {

    const { platform,
        name,
        image,
        price,
        genre,
        description, } = req.body

    try {
        await gameService.create({
            name,
            image,
            price,
            genre,
            description,
            platform,
            owner: req.user._id,
        })
        res.redirect('/games/catalog')

    } catch (err) {



        res.render('games/create', { error: extractErrorMessage(err) })
    }
});


//? Catalog page
router.get('/catalog', async (req, res) => {

    try {
        const games = await gameService.getAll().lean()

        res.render('games/catalog', { games })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        console.log(errorMessage)

        res.render('games/catalog', { error: errorMessage })

    }

})

//? Details

router.get('/:gameId/details', async (req, res) => {

    try {
        const gameId = req.params.gameId

        const game = await gameService.getOne(gameId).lean()

        const isOwner = req.user?._id == game.owner._id

        if (JSON.parse(JSON.stringify(game.boughtBy)).includes(req.user?._id)) {
            game.alreadyBought = true;                                      //? Проверявам да usera съществува вече в boughtBy от модела
        }
        res.render('games/details', { game, isOwner })

    } catch (err) {

        const errorMessage = extractErrorMessage(err)


        res.render('games/details', { error: errorMessage })
    }

})



//? Edit photo

router.get('/:gameId/edit', isAuth, async (req, res) => {
    try {
        const game = await gameService.getOne(req.params.gameId).lean()

        game.dropDown = levels(game.platform); //? използвам го за зареждане на падащото меню 


        res.render('games/edit', { game })
    } catch (err) {
        const errorMessage = extractErrorMessage(err)

        res.render(`games/edit`, { error: errorMessage })
    }
});

router.post('/:gameId/edit', isAuth, async (req, res) => {
    const gameData = req.body
    try {

        await gameService.edit(req.params.gameId, gameData)

        res.redirect(`/games/${req.params.gameId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`/games/${req.params.gameId}/edit`, { error: errorMessage, ...gameData })
    }


})

//? buy game

router.get('/:gameId/buy', isAuth, async (req, res) => {
    const gameId = req.params.gameId
    const userId = req.user?._id

    try {

        await gameService.buy(gameId, userId)

        res.redirect(`/games/${gameId}/details`)


    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`games/edit`, { error: errorMessage })
    }

})


//? Search games

router.get('/search', isAuth, async (req, res) => {
    const result = { ...req.query }
    let games;

    try {

        if (!!result.search || !!result.platform) {
            games = await gameService.searchGames(result.search, result.platform).lean()

        } else {
            games = await gameService.getAll().lean()
        }
        res.render('games/search', { games })

    } catch (err) {

        res.redirect('/404')

    }
})







//? Delete photo

router.get('/:gameId/delete', isAuth, async (req, res) => {

    try {
        await gameService.delete(req.params.gameId)

        res.redirect('/games/catalog')

    } catch (err) {
        const errorMessage = extractErrorMessage(err)


        res.render(`games/details`, { error: errorMessage })

    }
});









module.exports = router