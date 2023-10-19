const router = require('express').Router()
const { extractErrorMessage } = require('../utils/errorHelpers')
const cryptoService = require('../services/cryptoService')
const { isAuth } = require('../middlewares/authMiddleware')
const levels = require('../utils/platformHelpers')




//? rendering
router.get('/create', (req, res) => {
    res.render('cryptos/create')
})


//? Create
router.post('/create', async (req, res) => {

    const { name, image, price, description, payment } = req.body

    try {
        await cryptoService.create({
            name,
            image,
            price,
            description,
            payment,
            owner: req.user._id,
        })
        res.redirect('/cryptos/catalog')

    } catch (err) {

        res.render('cryptos/create', { error: extractErrorMessage(err) })
    }
});


//? Catalog page
router.get('/catalog', async (req, res) => {

    try {
        const cryptos = await cryptoService.getAll().lean()

        res.render('cryptos/catalog', { cryptos })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        console.log(errorMessage)

        res.render('cryptos/catalog', { error: errorMessage })

    }

})

//? Details

router.get('/:cryptoId/details', async (req, res) => {

    try {
        const cryptoId = req.params.cryptoId

        const crypto = await cryptoService.getOne(cryptoId).lean()

        const isOwner = req.user?._id == crypto.owner._id

        if (JSON.parse(JSON.stringify(crypto.buyCrypto)).includes(req.user?._id)) {
            crypto.alreadyBought = true;                                      //? Проверявам да usera съществува вече в boughtBy от модела
        }
        res.render('cryptos/details', { crypto, isOwner })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render('cryptos/details', { error: errorMessage })
    }

})



//? Edit crypto

router.get('/:cryptoId/edit', isAuth, async (req, res) => {
    try {
        const crypto = await cryptoService.getOne(req.params.cryptoId).lean()

         crypto.dropDown = levels(crypto.payment); //? използвам го за зареждане на падащото меню 

        res.render('cryptos/edit', { crypto })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)

        res.render(`cryptos/edit`, { error: errorMessage })
    }
});

router.post('/:cryptoId/edit', isAuth, async (req, res) => {
    const cryptoData = req.body
    try {

        await cryptoService.edit(req.params.cryptoId, cryptoData)

        res.redirect(`/cryptos/${req.params.cryptoId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`/cryptos/${req.params.cryptoId}/edit`, { error: errorMessage, ...cryptoData })
    }


})

//? buy crypto

router.get('/:cryptoId/buy', isAuth, async (req, res) => {
    const cryptoId = req.params.cryptoId
    const userId = req.user?._id

    try {
        await cryptoService.buy(cryptoId, userId)

        res.redirect(`/cryptos/${cryptoId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`cryptos/edit`, { error: errorMessage })
    }

})


//? Search crypto

router.get('/search', isAuth, async (req, res) => {
    const result = { ...req.query }
    let cryptos;

    try {

        // if (!!result.search || !!result.payment) {
        //     cryptos = await cryptoService.searchGames(result.search, result.payment).lean()

        // } else {
        //     cryptos = await cryptoService.getAll().lean()
        // }

        cryptos = (!!result.search || !!result.payment) 
        ? await cryptoService.searchGames(result.search, result.payment).lean() 
        : await cryptoService.getAll().lean();

        res.render('cryptos/search', { cryptos })

    } catch (err) {
        res.redirect('/404')
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