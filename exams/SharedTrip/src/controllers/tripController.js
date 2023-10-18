const router = require('express').Router()
const { extractErrorMessage } = require('../utils/errorHelpers')
const tripService = require('../services/tripService')
const { isAuth } = require('../middlewares/authMiddleware')
// const levels = require('../utils/platformHelpers')




//? rendering
router.get('/create', isAuth, (req, res) => {
    res.render('trips/create')
})


//? Create
router.post('/create', isAuth, async (req, res) => {


    const { startPoint,
        endPoint,
        date,
        time,
        image,
        carBrand,
        seats,
        price,
        description,
    } = req.body

    try {
        await tripService.create({
            startPoint,
            endPoint,
            date,
            time,
            image,
            carBrand,
            seats,
            price,
            description,
            owner: req.user._id,
        })
        res.redirect('/trips/catalog')   //! да се насочи към каталог

    } catch (err) {

        res.render('trips/create', { error: extractErrorMessage(err) })
    }
});


//? Catalog page
router.get('/catalog', async (req, res) => {

    try {
        const trips= await tripService.getAll().lean()

        res.render('trips/catalog', { trips })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)


        res.render('trips/catalog', { error: errorMessage })

    }
})

//? Details

router.get('/:tripId/details', isAuth, async (req, res) => {

    try {
        const tripId = req.params.tripId

        const trip = await tripService.getOne(tripId).populate(["owner"]).lean() 
        
        const notAvailable = trip.seats === 0;

        const isOwner = req.user?._id == trip.owner._id

        if (JSON.parse(JSON.stringify(trip.buddies)).includes(req.user?._id)) {
            trip.already = true;                                      //? Проверявам да usera съществува вече в boughtBy от модела
        }
        const tripBuddies = trip.contactsPassengers.join(', ');
        res.render('trips/details', { trip, isOwner, notAvailable,tripBuddies })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render('trips/details', { error: errorMessage })
    }

})



//? Edit book

router.get('/:tripId/edit', isAuth, async (req, res) => {


    try {
        const trip = await tripService.getOne(req.params.tripId).lean()

       
        if (trip.owner._id.toString() != req.user._id) {
    
            return res.redirect("/");
        }

        res.render('trips/edit', { trip })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)

        res.render(`trips/edit`, { error: errorMessage })
    }
});

router.post('/:tripId/edit', isAuth, async (req, res) => {
    const tripData = req.body


    try {
        await tripService.edit(req.params.tripId, tripData)

        res.redirect(`/trips/${req.params.tripId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`/trips/${req.params.tripId}/edit`, { error: errorMessage, ...tripData })
    }


})

//? joined

router.get('/:tripId/join', isAuth, async (req, res) => {
    const tripId = req.params.tripId
    const userId = req.user?._id

    try {
    await tripService.joined(tripId, userId)
    const joinedTrip = await tripService.getOne(tripId)
      
     joinedTrip.seats-=1                                //? махам едно място когато има нов човек 
     

       joinedTrip.contactsPassengers.push(req.user.email) //? добавям имайл за join-титте хора
       await joinedTrip.save()                             //? запаметявам промените за да се отразят
        res.redirect(`/trips/${tripId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`trip/details`, { error: errorMessage })
    }

})




//? Delete photo

router.get('/:tripId/delete', isAuth, async (req, res) => {

    try {
        await tripService.delete(req.params.tripId)

        res.redirect('/trips/catalog')

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render(`trips/details`, { error: errorMessage })
    }
});











module.exports = router