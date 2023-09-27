const { search } = require('../controllers/homeController')
const Post = require('../models/Post')


// //?Last three posts -home page
// exports.lastThree = () => Animal.find().sort({_id: - 1}).limit(3)


//? Create a new Crypto
exports.create = async (postData) => {
    const newPost = await Post.create(postData)
    return newPost
}

//? Catalog render 
exports.getAll = () => Post.find().populate('owner')  //? Сложихме populate за да вземeм owner.username в catalog.hbs

//? Delete photo
exports.delete = (postId) => Post.findByIdAndDelete(postId)


//? Edit photo
exports.edit = (postId, postData) => Post.findByIdAndUpdate(postId, postData).populate('owner')


//? Details render
exports.getOne = (animalId) => Animal.findById(animalId).populate('owner') //? Сложихме populate за да вземem owner.username в catalog.hbs


//? Buy game
exports.buy = (animalId, userId) => Animal.findByIdAndUpdate(animalId, { $push: { donations: userId } })



//? Search games
exports.searchGames = (search) => Animal.find({ location: { $regex: search, $options: 'i' }})