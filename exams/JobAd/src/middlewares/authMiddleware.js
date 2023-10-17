const jwt = require('../lib/jwt')
const { SECRET_KEY } = require('../config/config')

//todo: Verify token 
exports.auth = async (req, res, next) => {

    const token = req.cookies['auth']

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET_KEY)

            req.user = decodedToken
             res.locals.user = decodedToken      //? Навигация
             res.locals.isAuthenticated = true   //? Навигация
            next()
        } catch (err) {
            res.clearCookie('auth')
            res.redirect('./users/login')
        }


    } else {
        next()
    }
}


//todo: Authorization - слага се, където искам да ауторизираме да ли даден user има достъп
exports.isAuth = (req, res, next) => {

    if (!req.user) return res.redirect('/users/login')
    next();
}