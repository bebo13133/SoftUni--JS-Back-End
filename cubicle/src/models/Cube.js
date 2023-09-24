const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
   
    name: {
        
        type: String,
        required: true,
        minLength: [3, 'Name characters must be between 3 and 40'],
        maxLength: [25,'Name characters must be between 3 and 40'],
    
    },
    description: {
        type: String,
        required: true,
        minLength: [3, 'Description characters must be minimum 3'],    
    
    },
    imageUrl: String,
    difficultyLevel: {
        type: Number,
        required: true, 
    },
    accessories:[{
        type: mongoose.Types.ObjectId,
        ref:"Accessory"
    }],
    owner:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
    }

})

const Cube = mongoose.model('Cube', cubeSchema);
module.exports = Cube;