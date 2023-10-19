const { search } = require('../controllers/homeController')
const Photo = require('../models/Photo')





//? Create a new Crypto
exports.create = async (photoData) => {
    const newPost = await Photo.create(photoData)
    return newPost
}

//? Catalog render 
exports.getAll = () => Photo.find().populate('owner')  //? Сложихме populate за да вземeм owner.username в catalog.hbs

//? Delete photo
exports.delete = (photoId) => Photo.findByIdAndDelete(photoId)


//? Edit photo
exports.edit = (photoId, photoData) => Photo.findByIdAndUpdate({_id:photoId}, {$set:photoData},{runValidators:true}).populate('owner')


//? Details render
exports.getOne = (photoId) => Photo.findById(photoId).populate('owner') //? Сложихме populate за да вземem owner.username в catalog.hbs



//? OneUser -за гласувалите users
exports.getOneUser= (photoId) => Photo.findById(photoId).populate('votes')


//? Vote game
exports.voted = (photoId, userId) => Photo.findByIdAndUpdate(photoId, { $push: { votes: userId } }).populate('owner')

//? profile
exports.getOwnerPosts = (userId) => Photo.find({owner: userId})

