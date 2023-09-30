const User = require('../Models/User')
const bcrypt = require('bcrypt')
const { createToken } = require('../utils/tokenHelpers')



//? Register
exports.register = async (userData) => {


    const user = await User.findOne({ email: userData.email })
    if (user) throw new Error(`This ${user} is already registered`)

    const createdUser = User.create(userData)
    const token = await createToken(createdUser)

    const result = {
        email: createdUser.email,
        accessToken: token,
        _id: createdUser._id
    }

    return result
}
 


//? Login
exports.login = async (email, password) => {

    const user = await User.findOne({ email })
    if (!user) throw new Error('Cannot find user or password')
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) throw new Error('Password do not mach')

    const token = await createToken(user)



    const result = {                 //? Взимаме необходимите данни за res.json в  userController-a
        email: user.email,
        accessToken: token,
        _id: user._id
    }

    return result

}