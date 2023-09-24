const mongoose = require('mongoose')


const accessorySchema = new mongoose.Schema({
    name: {
        
        type: String,
        required: true,
        minLength: 3,
        maxLength: 25,

    },
    description: String,
    imageUrl: String,

})

const Accessory = mongoose.model('Accessory', accessorySchema)
module.exports = Accessory