const router = require('express').Router()
const cubeService = require('../services/cubeService')
const { log } = require('console')
const { isAuth } = require('../middlewares/authMiddleware')
const { extractErrorMessage } = require('../utils/errorHelpers')

const accessoryService = require('../services/accessoryService')
router.get('/:cubeId/details', async (req, res) => {

    const cube = await cubeService.getOne(req.params.cubeId).lean()

    const isOwner = cube.owner?.toString() === req.user?._id

    const hasAccessory = cube.accessories.length > 0
    return !cube ? res.redirect('/404') : res.render('cube/details', { cube, isOwner })
});

router.use(isAuth) //! Important


router.get('/create', (req, res) => {
    // if(cube.owner.toString() !== req.user._id) return res.redirect('/404')


    res.render('cube/create',);

})

router.post('/create', async (req, res) => {
    const { name,
        description,
        imageUrl,
        difficultyLevel,
    } = req.body

    try{
        await cubeService.create({
            name,
            description,
            imageUrl,
            difficultyLevel: Number(difficultyLevel),
            owner: req.user._id,
        })
        res.redirect('/')
    }catch(err){
        const errorMessages = extractErrorMessage(err)

        res.status(400).render('cube/create', { errorMessages })
    }

})



router.get('/:cubeId/attach-accessory', async (req, res) => {

    
    const cube = await cubeService.getOne(req.params.cubeId).lean()
    const accessory = await accessoryService.getAccessories(cube.accessories).lean()
    const hasAccessory = accessory.length > 0  // ако имаме аксесоари - подаваме като параметър за да го плзваме като if проверка в attach.hbs и details.hbs

    // const accessory = await 
    res.render("accessory/attach", { cube, accessory, hasAccessory })
})

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const { accessory } = req.body // получаваме accessory id-to
    const cubeId = req.params.cubeId

    await cubeService.attachAcc(cubeId, accessory)

    res.redirect(`/cubes/${cubeId}/details`)
})

router.get('/:cubeId/delete', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean()
    if (cube.owner.toString() != req.user?._id) return res.redirect('/404')


    res.render("cube/delete", { cube })
})
router.post('/:cubeId/delete', async (req, res) => {



    await cubeService.delete(req.params.cubeId)
    res.redirect('/')

})


router.get('/:cubeId/edit', async (req, res) => {

    const cube = await cubeService.getOne(req.params.cubeId).lean()
    if (cube.owner.toString() !== req.user?._id) return res.redirect('/404')

    res.render("cube/edit", { cube })
});

router.post('/:cubeId/edit', async (req, res) => {

    const cubeData = req.body
    const cube = await cubeService.getOne(req.params.cubeId)
    await cubeService.edit(req.params.cubeId, cubeData)


    res.redirect(`/cubes/${req.params.cubeId}/details`)
})
module.exports = router