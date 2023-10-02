const House = require('../models/House')


//? Create a new Crypto
exports.create = async (houseData) => {
    const newHouse = await House.create(houseData)
    return newHouse
}

//? Catalog render 
exports.getAll = () => House.find().populate('owner')  //? Сложихме populate за да вземem owner.username в catalog.hbs

//? Delete photo
exports.delete = (houseId) => House.findByIdAndDelete(houseId)


//? Edit photo
exports.edit = (houseId, houseData) => House.findByIdAndUpdate(houseId, houseData).populate('owner')


//? Details render
exports.getOne = (houseId) => House.findById(houseId).populate('owner') //? Сложихме populate за да вземem owner.username в catalog.hbs


//? get Current price
exports.getCurrentPrice = (houseId) => House.findById(houseId).select('price')



// //? place bid
exports.placeBid = (houseId, userId, bid) => House.findByIdAndUpdate(houseId, { bidder: userId, price: bid })

exports.closeAuction = (id) => House.findByIdAndUpdate(id, { listed: false })
exports.getAllClosed = (id)=> House.find({ owner: id, listed: false }).populate('bidder')