const { search } = require('../controllers/homeController')
const Animal = require('../models/Animal')


//?Last three posts -home page
exports.lastThree = () => Animal.find().sort({_id: - 1}).limit(3)


//? Create a new Crypto
exports.create = async (animalData) => {
    const newAnimal = await Animal.create(animalData)
    return newAnimal
}

//? Catalog render 
exports.getAll = () => Animal.find().populate('owner')  //? Сложихме populate за да вземem owner.username в catalog.hbs

//? Delete photo
exports.delete = (animalId) => Animal.findByIdAndDelete(animalId)


//? Edit photo
exports.edit = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData).populate('owner')


//? Details render
exports.getOne = (animalId) => Animal.findById(animalId).populate('owner') //? Сложихме populate за да вземem owner.username в catalog.hbs


//? Buy game
exports.buy = (animalId, userId) => Animal.findByIdAndUpdate(animalId, { $push: { donations: userId } })



//? Search games
exports.searchGames = (search) => Animal.find({ location: { $regex: search, $options: 'i' }})