const router = require('express').Router()
const { extractErrorMessage } = require('../utils/errorHelpers')
const houseService = require('../services/houseService')
const { isAuth } = require('../middlewares/authMiddleware')
const levels = require('../utils/platformHelpers')




//? rendering
router.get('/create', (req, res) => {
    res.render('houses/create')
})


//? Create
router.post('/create', async (req, res) => {

    const { title, description, category, image, price } = req.body

    try {
        await cryptoService.create({
            title, description, category, image, price,
            owner: req.user._id,
        })
        res.redirect('/houses/catalog')

    } catch (err) {

        res.render('houses/create', { error: extractErrorMessage(err) })
    }
});


//? Catalog page
router.get('/catalog', async (req, res) => {

    try {
        const houses = await houseService.getAll().lean()

        res.render('houses/browse', { houses })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        console.log(errorMessage)

        res.render('houses/browse', { error: errorMessage })

    }

})

//? Details

router.get('/:houseId/details', async (req, res) => {

    try {
        const houseId = req.params.houseId

        const house = await houseService.getOne(houseId).populate('bidder').lean()

        const isOwner = req.user?._id == house.owner._id

        if (req.user?._id === house.bidder._id.toString()) {
            house.alreadyBid = true
        };                          
        
        //?______________________________________
        const categoryName = {
            estate: 'Real Estate',
            vehicles: 'Vehicles',
            furniture: 'Furniture',
            electronics: 'Electronics',
            other: 'Other'
        }
        house.categoryValue = categoryName[house.category];    //? Взимам категорията от самата обява
        //?______________________________________________________________
        if(house.bidder){
            house.hasBidder = true;
            if (req.user?._id === house.bidder._id.toString()) {
                house.isBidder = true;
            };
            house.bidderFullName = `${house.bidder.firstName} ${house.bidder.lastName}`;
        }
        







        house.ownerFullName = `${house.owner.firstName} ${house.owner.lastName}`;  //? цялото име на автора  на обявата 


        res.render('houses/details', { house, isOwner })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render('houses/details', { error: errorMessage })
    }

})



//? Edit 

router.get('/:houseId/edit', isAuth, async (req, res) => {
    try {
        const house = await houseService.getOne(req.params.houseId).lean()


        house.bidder ? house.alreadyBid = true : null  //? проверявам имал изапочнало наддаване . Ако има го сетвам на disable във edit.hbs


        house.dropDown = levels(house.category); //? използвам го за зареждане на падащото меню 




        res.render('houses/edit', { house })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)

        res.render(`houses/edit`, { error: errorMessage })
    }
});

router.post('/:houseId/edit', isAuth, async (req, res) => {
    const houseData = req.body
    try {

        await houseService.edit(req.params.houseId, houseData)

        res.redirect(`/houses/${req.params.houseId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`/houses/${req.params.houseId}/edit`, { error: errorMessage, ...houseData })
    }


})

//? bidder

router.post('/:houseId/bidder', isAuth, async (req, res) => {
    const houseId = req.params.houseId
    const userId = req.user._id

    try {

        const bid = Number(req.body.bid)

        const { price } = await houseService.getCurrentPrice(houseId)

        if(price >= bid){
            return new Error('The bid can\'t be lower or equal to the current price')
        }

         await houseService.placeBid(houseId, userId, bid) //? update на цената ако тя е по висока от текущата 

        res.redirect(`/houses/${houseId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`houses/details`, { error: errorMessage })
    }

})

//? Close
router.get('/:houseId/close', async (req, res) => {
    const houseId = req.params.houseId;
    const userId = req.user._id;

    try {
        
        const house = await houseService.getOne(houseId).lean();

        // if (userId !== house.owner.toString()) {
        //     return res.redirect('/404');
        // }
        await houseService.closeAuction(houseId);
        res.redirect('/houses/closed')
    } catch (error) {
        
    }
});


//? Closed
router.get('/closed', async (req, res) => {
    const userId = req.user._id;
    try {
        const allClosed = await houseService.getAllClosed(userId).lean();
        res.render('houses/closed', {allClosed })
    } catch (error) {
        res.redirect('/404');
    }
});

//? Delete photo

router.get('/:houseId/delete', isAuth, async (req, res) => {

    try {
        await houseService.delete(req.params.houseId)

        res.redirect('/houses/catalog')

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render(`houses/details`, { error: errorMessage })
    }
});









module.exports = router