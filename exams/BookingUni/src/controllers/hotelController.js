const router = require('express').Router()
const { extractErrorMessage } = require('../utils/errorHelpers')
const hotelService = require('../services/hotelService')
const { isAuth } = require('../middlewares/authMiddleware')
const levels = require('../utils/platformHelpers')




//? rendering
router.get('/create', (req, res) => {
    res.render('hotels/create')
})


//? Create
router.post('/create', async (req, res) => {

    const { name,
        city,
        freeRooms,
        image,
    } = req.body

    try {
        await hotelService.create({
            name,
            city,
            freeRooms,
            image,
            owner: req.user._id,
        })
        res.redirect('/')   //! да се насочи към каталог

    } catch (err) {

        res.render('hotels/create', { error: extractErrorMessage(err) })
    }
});


// //? Catalog page
// router.get('/catalog', async (req, res) => {

//     try {
//         const hotels = await hotelService.getAll().lean()

//         res.render('hotels/catalog', { hotels })

//     } catch (err) {
//         const errorMessage = extractErrorMessage(err)
//         console.log(errorMessage)

//         res.render('hotels/catalog', { error: errorMessage })

//     }
// })

//? Details

router.get('/:hotelId/details', async (req, res) => {

    try {
        const hotelId = req.params.hotelId

        const hotel = await hotelService.getOne(hotelId).lean()


        const isOwner = req.user?._id == hotel.owner._id

        if (JSON.parse(JSON.stringify(hotel.booked)).includes(req.user?._id)) {
            hotel.alreadyBooking = true;                                      //? Проверявам да usera съществува вече в boughtBy от модела
        }


        res.render('hotels/details', { hotel, isOwner })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render('hotels/details', { error: errorMessage })
    }

})



//? Edit book

router.get('/:hotelId/edit', isAuth, async (req, res) => {
    try {
        const hotel = await hotelService.getOne(req.params.hotelId).lean()

        // crypto.dropDown = levels(crypto.payment); //? използвам го за зареждане на падащото меню 

        res.render('hotels/edit', { hotel })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)

        res.render(`hotels/edit`, { error: errorMessage })
    }
});

router.post('/:hotelId/edit', isAuth, async (req, res) => {
    const hotelData = req.body
    try {
        await hotelService.edit(req.params.hotelId, hotelData)

        res.redirect(`/hotels/${req.params.hotelId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`/hotels/${req.params.hotelId}/edit`, { error: errorMessage, ...bookData })
    }


})

//? isBooking

router.get('/:hotelId/booked', isAuth, async (req, res) => {
    const hotelId = req.params.hotelId
    const userId = req.user?._id

    try {
        await hotelService.reading(hotelId, userId)

        res.redirect(`/hotels/${hotelId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`hotels/edit`, { error: errorMessage })
    }

})




//? Delete photo

router.get('/:postId/delete', isAuth, async (req, res) => {

    try {
        await postService.delete(req.params.postId)

        res.redirect('/posts/catalog')

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render(`posts/details`, { error: errorMessage })
    }
});











module.exports = router