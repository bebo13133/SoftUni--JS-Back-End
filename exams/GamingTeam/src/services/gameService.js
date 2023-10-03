const Game = require('../models/Game')


//? Create a new Photo
exports.create = async (gameData) => {
    const newGame = await Game.create(gameData)
    return newGame
}

//? Catalog render 
exports.getAll = () => Game.find().populate('owner')  //? Сложихме populate за да вземem owner.username в catalog.hbs

//? Delete photo
exports.delete = (gameId) => Game.findByIdAndDelete(gameId)


//? Edit photo
exports.edit = (gameId, gameData) => Game.findByIdAndUpdate({_id: gameId}, {$set:gameData}, {runValidators:true}).populate('owner')


//? Details render
exports.getOne = (gameId) => Game.findById(gameId).populate('owner') //? Сложихме populate за да вземem owner.username в catalog.hbs


//? Buy game
exports.buy = (gameId, userId) => Game.findByIdAndUpdate(gameId, { $push: { boughtBy: userId } })



//? Search games
exports.searchGames = (search, platform) => Game.find({ name: { $regex: search, $options: 'i' }, platform: { $regex: platform } })