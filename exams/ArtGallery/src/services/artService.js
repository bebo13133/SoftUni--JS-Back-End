    const { search } = require('../controllers/homeController')
const Art = require('../models/Art')





//? Create a new Crypto
exports.create = async (tripData) => {
    const newTrip = await Art.create(tripData)
    return newTrip
}

//? Catalog render 
exports.getAll = () => Art.find().populate('owner')  //? Сложихме populate за да вземeм owner.username в catalog.hbs

//? Delete photo
exports.delete = (tripId) => Art.findByIdAndDelete(tripId)


//? Edit photo
exports.edit = (tripId, tripData) => Art.findByIdAndUpdate(tripId, tripData,{new:true, runValidators:true}).populate('owner')


//? Details render
exports.getOne = (tripId) => Art.findById(tripId).populate('owner') //? Сложихме populate за да вземem owner.username в catalog.hbs



// //? OneUser -за гласувалите users
// exports.getOneUser= (postId) => Post.findById(postId).populate('votes')


//? VReading book
exports.share = (artId, userId) => Art.findByIdAndUpdate(artId, { $push: { shared: userId } }).populate('owner')




//? profile
exports.getOwnerTrips = (userId) => Art.find({owner: userId})

