const router = require('express').Router()
const userService = require('../services/userService')
const { extractErrorMessage } = require('../utils/errorHelpers')



//TODO: lOGIN
router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', async (req, res) => {
    const { username, password, } = req.body

    try {
        const token = await userService.login(username, password);

        res.cookie('auth', token, { httpOnly: true })
        res.redirect('/');

    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.status(400).render('users/login', { error: errorMessage })
    }

});



//TODO: Register
router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', async (req, res) => {

    try {
        const { username, email, password, repeatPassword } = req.body

        const token = await userService.register({ username, email, password, repeatPassword })
        res.cookie('auth', token, { httpOnly: true })
        res.redirect('/')

    } catch (errors) {

        const errorMessage = extractErrorMessage(errors)
        res.status(400).render('users/register', { error: errorMessage })
    }
});


//TODO: Logout
router.get('/logout', (req, res) => {
    res.clearCookie('auth')
    res.redirect("/")

})

module.exports = router