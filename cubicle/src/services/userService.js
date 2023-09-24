const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('../lib/jwt')
const {SECRET_KEY} = require('../config/config')


exports.register = (userData) => User.create(userData);

exports.login = async (username, password) => {
    const user = await User.findOne({ username })

    if (!user) throw new Error("Cannot find user or password!!")

    const validPassword = await bcrypt.compare(password, user.password)



    if (!validPassword) throw new Error("Това е паролата на Ники , пробвай пак ")

    const payload = {
        _id: user._id,
        username: user.username,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2d' })  

    return token;

}

