const Course = require('../models/Course')


//? Create a new Crypto
exports.create = async (courseData) => {
    const newCourse = await Course.create(courseData)
    return newCourse
}

//? Catalog render 
exports.getAll = () => Course.find().populate('owner')  //? Сложихме populate за да вземem owner.username в catalog.hbs

//? Delete photo
exports.delete = (courseId) => Course.findByIdAndDelete(courseId)


//? Edit photo
exports.edit = (courseId, courseData) => Course.findByIdAndUpdate(courseId, courseData).populate('owner')


//? Details render
exports.getOne = (courseId) => Course.findById(courseId).populate('owner') //? Сложихме populate за да вземem owner.username в catalog.hbs


//? Buy game
exports.enrolled = (courseId, userId) => Course.findByIdAndUpdate(courseId, { $push: { enrolled: userId } })



//? Search games
exports.searchGames = (search) => Course.find({ title: { $regex: search, $options: 'i' }})