    const { search } = require('../controllers/homeController')
const Trip = require('../models/Trip')





//? Create a new Crypto
exports.create = async (tripData) => {
    const newTrip = await Trip.create(tripData)
    return newTrip
}

//? Catalog render 
exports.getAll = () => Trip.find().populate('owner')  //? Сложихме populate за да вземeм owner.username в catalog.hbs

//? Delete photo
exports.delete = (tripId) => Trip.findByIdAndDelete(tripId)


//? Edit photo
exports.edit = (tripId, tripData) => Trip.findByIdAndUpdate(tripId, tripData,{new:true, runValidators:true}).populate('owner')


//? Details render
exports.getOne = (tripId) => Trip.findById(tripId).populate('owner') //? Сложихме populate за да вземem owner.username в catalog.hbs



// //? OneUser -за гласувалите users
// exports.getOneUser= (postId) => Post.findById(postId).populate('votes')


//? VReading book
exports.joined = (tripId, userId) => Trip.findByIdAndUpdate(tripId, { $push: { buddies: userId } }).populate('owner')

//? profile
exports.getOwnerTrips = (userId) => Trip.find({owner: userId})

