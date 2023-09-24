const router = require('express').Router();
const userService = require('../services/userService')
const User = require('../models/User')
const { extractErrorMessage } = require('../utils/errorHelpers')

router.get('/register', (req, res) => {
    res.render('./users/register');
});

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body

    try {
        await userService.register({ username, password, repeatPassword })

        res.redirect('/users/login')       // ? да се промени на login страницата - done!
    } catch (err) {
        const errorMessages = extractErrorMessage(err)

        res.status(400).render('./users/register', { errorMessages })
    }


});

router.get('/login', (req, res) => {
    res.render('./users/login')
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        const token = await userService.login(username, password)

        res.cookie('auth', token, { httpOnly: true })
    
        res.redirect("/")
    }catch (err) {
        const errorMessages = extractErrorMessage(err)

        res.status(400).render('./users/login', { errorMessages })
    }
  
})

router.get('/logout', (req, res) => {
    res.clearCookie('auth')
    res.redirect("/")

})



module.exports = router;