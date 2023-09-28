const { search } = require('../controllers/homeController')
const Hotel = require('../models/Hotel')





//? Create a new Crypto
exports.create = async (hotelData) => {
    const newHotel = await Hotel.create(hotelData)
    return newHotel
}

//? Catalog render 
exports.getAll = () => Hotel.find().populate('owner')  //? Сложихме populate за да вземeм owner.username в catalog.hbs

//? Delete hotel
exports.delete = (hotelId) => Hotel.findByIdAndDelete(hotelId)


//? Edit hotel
exports.edit = (hotelId, hotelData) => Hotel.findByIdAndUpdate(hotelId, hotelData).populate('owner')


//? Details render
exports.getOne = (hotelId) => Hotel.findById(hotelId).populate('owner') //? Сложихме populate за да вземem owner.username в catalog.hbs



// //? OneUser -за гласувалите users
// exports.getOneUser= (postId) => Post.findById(postId).populate('votes')


//? VReading book
exports.reading = (hotelId, userId) => Hotel.findByIdAndUpdate(hotelId, { $push: { booked: userId } }).populate('owner')

//? profile
exports.getOwnerPosts = (userId) => Hotel.find({ owner: userId })
exports.getBooked = (userId) => Hotel.find({ booked: userId });


