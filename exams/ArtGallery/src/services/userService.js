const User = require('../models/User')
const bcrypt = require('bcrypt')
// const jwt = require('../lib/jwt')
// const {SECRET_KEY} = require('../config/config')
const {createToken} = require('../utils/tokenHelpers')
//TODO: LOGIN 
exports.login = async (username, password) => {

    const user = await User.findOne({ username});
    if (!user) throw new Error("Cannot find user or password!!")

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) throw new Error("Passwords do not match")


const token = await createToken(user)
return token;

};

//TODO: REGISTER
exports.register = async (userData) =>{
    const email = await User.findOne({username: userData.username});
    if(email){
        throw new Error('This name is already in use')    //? Проверяваме за съществуващ вече user
    }

   const createdUser = await User.create(userData);
  const token= await createToken(createdUser)
  return token;
} 


//? Find Owner
exports.findOwner=(userId) =>  User.findById(userId)  //? За да вземем името на потребителят


exports.added = (artId, userId) => User.findByIdAndUpdate(userId, { $push: { publications: artId } }).populate('publications')
  