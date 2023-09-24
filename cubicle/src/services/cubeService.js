// const crypto = require('crypto');
// const uuid4 = crypto.randomUUID()
const Cube = require('../models/Cube')



exports.getAll = async (search, from, to) => {
    let result = await Cube.find().lean()

    if (search) result = result.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    if (from) result = result.filter(cube => cube.difficultyLevel >= Number(from))
    if (to) result = result.filter(cube => cube.difficultyLevel <= Number(to))

    return result
}
exports.getOne = (cubeId) => Cube.findById(cubeId).populate('accessories')

exports.create = async (dateCube) => {
 const newCube= await Cube.create(dateCube);

    return newCube
}
exports.delete = (cubeId) => Cube.findByIdAndDelete(cubeId).populate('accessories')
exports.edit = (cubeId,cubeData) => Cube.findByIdAndUpdate(cubeId,cubeData).populate('accessories')


exports.attachAcc= async (cubeId, accessory)=>{
    return Cube,Cube.findByIdAndUpdate(cubeId, {$push : {accessories: accessory}} )




}