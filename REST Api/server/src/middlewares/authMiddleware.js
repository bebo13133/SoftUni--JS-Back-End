const jwt = require('../lib/jwt')
const { SECRET_KEY } = require('../config/configSecretKey')

exports.auth = async (req, res, next) => {

    const token = req.header('X-Authorization')
    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET_KEY)

            req.user = decodedToken

            next()
        } catch (err) {
            //todo: Error handling
            res.status(401).json({ message: "You are not allowed to access this" })

        }


    } else {

        next()

    }

}