const Furniture = require('../Models/Furniture')
const { log } = require('console')

exports.create = async (furnitureData) => {
    const newFurniture = await Furniture.create(furnitureData)
    return newFurniture
}

exports.getAll = async (qs) => {     // ? qs = query string

    let query = Furniture.find()    //? build query string

    if (qs.where) {
        let [fieldName, ownerId] = qs.where.split('=')
        ownerId = ownerId.replaceAll('"', '')           //? .map(s => s.replace(/"/g, '')); алтернативно replace - премахваме кавичките от query -то
        query = query.find({_ownerId: ownerId})
    }

    const result = await query
    return result


}

exports.getOne = (furnitureId) => Furniture.findById(furnitureId)

exports.update = (furnitureId, furnitureData) => Furniture.findByIdAndUpdate(furnitureId, furnitureData)

exports.delete = (furnitureId) => Furniture.findByIdAndDelete(furnitureId)
