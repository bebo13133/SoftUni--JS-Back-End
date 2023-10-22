const { search } = require('../controllers/homeController')
const Electronics = require('../models/Electronics')





//? Create a new Crypto
exports.create = async (partData) => {
    const newPart = await Electronics.create(partData)
    return newPart
}

//? Catalog render 
exports.getAll = () => Electronics.find().populate('owner')  //? Сложихме populate за да вземeм owner.username в catalog.hbs

//? Delete photo
exports.delete = (partId) => Electronics.findByIdAndDelete(partId)


//? Edit photo
exports.edit = (partId, photoData) => Electronics.findByIdAndUpdate({_id:partId}, {$set:photoData},{runValidators:true}).populate('owner')


//? Details render
exports.getOne = (partId) => Electronics.findById(partId).populate('owner') //? Сложихме populate за да вземem owner.username в catalog.hbs



//? OneUser -за гласувалите users
exports.getOneUser= (partId) => Electronics.findById(partId).populate('votes')


//? Vote game
exports.voted = (partId, userId) => Electronics.findByIdAndUpdate(partId, { $push: { buyingList: userId } }).populate('owner')

//? Search parts
exports.searchParts = (search, type) => Electronics.find({ name: { $regex: search, $options: 'i' }, type: { $regex: type } })

