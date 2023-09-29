const Crypto = require('../models/Crypto')


//? Create a new Crypto
exports.create = async (cryptoData) => {
    const newCrypto = await Crypto.create(cryptoData)
    return newCrypto
}

//? Catalog render 
exports.getAll = () => Crypto.find().populate('owner')  //? Сложихме populate за да вземem owner.username в catalog.hbs

//? Delete photo
exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId)


//? Edit photo
exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData).populate('owner')


//? Details render
exports.getOne = (cryptId) => Crypto.findById(cryptId).populate('owner') //? Сложихме populate за да вземem owner.username в catalog.hbs


//? Buy game
exports.buy = (cryptoId, userId) => Crypto.findByIdAndUpdate(cryptoId, { $push: { buyCrypto: userId } })



//? Search games
exports.searchGames = (search, payment) => Crypto.find({ name: { $regex: search, $options: 'i' }, payment: { $regex: payment } })