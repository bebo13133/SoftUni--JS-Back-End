const jwt = require('../lib/jwt')
 const {SECRET_KEY} = require('../config/configSecretKey')
// const SECRET_KEY = 
exports.createToken = async(user)=>{

const payload = {

    _id: user._id,
    email: user._email
}

const token = await jwt.sign(payload, SECRET_KEY, {expiresIn: "2d"})
return token 
}