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
exports.delete = (bookId) => Book.findByIdAndDelete(bookId)


//? Edit photo
exports.edit = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData,{new:true, runValidators:true}).populate('owner')


//? Details render
exports.getOne = (bookId) => Book.findById(bookId).populate('owner') //? Сложихме populate за да вземem owner.username в catalog.hbs



// //? OneUser -за гласувалите users
// exports.getOneUser= (postId) => Post.findById(postId).populate('votes')


//? VReading book
exports.reading = (bookId, userId) => Book.findByIdAndUpdate(bookId, { $push: { wishingList: userId } }).populate('owner')

//? profile
exports.getOwnerPosts = (userId) => Book.find({owner: userId})

