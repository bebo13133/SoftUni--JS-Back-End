const Theater = require('../models/Theater')


//? Create a new Crypto
exports.create = async (courseData) => {
    const newCourse = await Theater.create(courseData)
    return newCourse
}

//? Catalog render 
exports.getAll = () => Theater.find({ isPublic: true }).populate('owner')  //? Сложихме populate за да вземem owner.username в catalog.hbs
exports.getThreeTheaters = () => Theater.find().sort({ likes: [-1] }).limit(3)
exports.getAllTheatersSorted = () => Theater.find().sort({ createdOn: [-1] })
exports.getAllTheatersByLikes = () => Theater.find().sort({ likes: [-1] })
//? Delete photo
exports.delete = (theaterId) => Theater.findByIdAndDelete(theaterId)


//? Edit photo
exports.edit = (theaterId, theaterData) => Theater.findByIdAndUpdate({ _id: theaterId }, { $set: theaterData }, { runValidators: true }).populate('owner')


//? Details render
exports.getOne = (theaterId) => Theater.findById(theaterId).populate('owner') //? Сложихме populate за да вземem owner.username в catalog.hbs


//? liked
exports.liked = (theaterId, userId) => Theater.findByIdAndUpdate(theaterId, { $push: { likes: userId } })



//? Search games
exports.searchGames = (search) => Theater.find({ title: { $regex: search, $options: 'i' } })