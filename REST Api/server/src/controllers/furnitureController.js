const router = require('express').Router()
const furnitureService = require('../services/furnitureService')
//? Create 
router.post('/catalog', async (req, res) => {
    try {
        const result = await furnitureService.create({
            ...req.body,
            _ownerId: req.user._id
        })
        res.status(204).end()
    } catch (err) {
        //todo: Error handling
        res.status(400).json({ message: err.message })

    }
})

//? Catalog 

router.get('/catalog', async (req, res) => {
    try {
        const furnitures = await furnitureService.getAll(req.query)

        res.json(furnitures)
    } catch (err) {
        //todo: Error handling
        res.status(400).json({ message: err.message })
    }
})

//? Details 

router.get('/catalog/:furnitureID', async (req, res) => {

    try {
        const furniture = await furnitureService.getOne(req.params.furnitureID)
        res.json(furniture).end()
    } catch (err) {
        //todo: Error handling
        res.status(400).json({ message: err.message })
    }


})

//? Edit 

router.put('/catalog/:furnitureId', async (req, res) => {


    try {
        const furniture = await furnitureService.update(req.params.furnitureId, req.body)
        res.status(204).end()
    } catch (err) {
   //todo: Error handling
   res.status(400).json({ message: err.message })
    }

})

//? Delete

router.delete('/catalog/:furnitureId', async (req, res) => {


    try {
        const furniture = await furnitureService.delete(req.params.furnitureId)
        res.status(204).end()
    } catch (err) {
   //todo: Error handling
   res.status(400).json({ message: err.message })
    }

})




module.exports = router