const { search } = require('../controllers/homeController')
const Book = require('../models/Book')





//? Create a new Crypto
exports.create = async (bookData) => {
    const newBook = await Book.create(bookData)
    return newBook
}

//? Catalog render 
exports.getAll = () => Book.find().populate('owner')  //? Сложихме populate за да вземeм owner.username в catalog.hbs

//? Delete photo
exports.delete = (postId) => Post.findByIdAndDelete(postId)


//? Edit photo
exports.edit = (postId, postData) => Post.findByIdAndUpdate(postId, postData).populate('owner')


//? Details render
exports.getOne = (postId) => Post.findById(postId).populate('owner') //? Сложихме populate за да вземem owner.username в catalog.hbs



//? OneUser -за гласувалите users
exports.getOneUser= (postId) => Post.findById(postId).populate('votes')


//? Vote game
exports.voted = (postId, userId) => Post.findByIdAndUpdate(postId, { $push: { votes: userId } }).populate('owner')

//? profile
exports.getOwnerPosts = (userId) => Post.find({owner: userId})

