const router = require('express').Router();
const {log} =require('console')
const accessoryService = require('../services/accessoryService')

router.get('/create', function(req, res) {
    res.render('accessory/create')
})

router.post('/create', async function(req, res) {
const {name,
    description,
    imageUrl
} = req.body;



await accessoryService.createAccessory({
    name,
    description,
    imageUrl,
})
res.redirect('/')

})






module.exports = router;

