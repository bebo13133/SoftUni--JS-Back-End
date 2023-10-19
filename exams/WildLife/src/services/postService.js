const { search } = require('../controllers/homeController')
const Post = require('../models/Post')





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
exports.edit = (postId, postData) => Post.findByIdAndUpdate({_id:postId}, {$set:postData},{runValidators:true}).populate('owner')


//? Details render
exports.getOne = (postId) => Post.findById(postId).populate('owner') //? Сложихме populate за да вземem owner.username в catalog.hbs



//? OneUser -за гласувалите users
exports.getOneUser= (postId) => Post.findById(postId).populate('votes')


//? Vote game
exports.voted = (postId, userId) => Post.findByIdAndUpdate(postId, { $push: { votes: userId } }).populate('owner')

//? profile
exports.getOwnerPosts = (userId) => Post.find({owner: userId})

