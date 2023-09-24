const Accessory = require('../models/Accessory')


exports.createAccessory = async (dataAccessory) => {
    const newAccessory = await Accessory.create(dataAccessory)
    return newAccessory

}
exports.getAll = () => Accessory.find()
exports.getAccessories=(accessoriesId)=> Accessory.find({_id:{$nin: accessoriesId}})