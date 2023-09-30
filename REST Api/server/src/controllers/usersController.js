const router = require('express').Router()
const userService = require('../services/userService')
const { log } = require('console')


//? Register
router.post('/register', async (req, res) => {

    try {
        const result = await userService.register(req.body)

        res.json(result)

    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: err.message
        })
    }

})

//? Login

router.post('/login', async (req, res) => {

    const { email, password } = req.body

    try {
        const result = await userService.login(email, password)

        res.json(result)

    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
})


//? Logout
router.get('/logout', (req, res) => {

    res.end()
})

module.exports = router