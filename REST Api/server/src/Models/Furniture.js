const {mongoose} = require('mongoose');
const VALIDATE_IMAGE = /^https?:\/\/.+$/;


const furnitureSchema = new mongoose.Schema({

make: {
    type: String,
    required: [true, 'Name is required'],
    minLength:[4, 'characters required minimum with 3 length'],
    maxLength:[40, 'characters required maximum with 40 length'],
   
},
model: {
    type: String,
    required: [true, 'Name is required'],
    minLength:[4, 'characters required minimum with 3 length'],
    maxLength:[40, 'characters required maximum with 40 length'],
   
},
year: {
    type: String,
    required: [true, 'Name is required'],
    minLength:[4, 'characters required minimum with 3 length'],
    maxLength:[40, 'characters required maximum with 40 length'],
   
},

description:{
    type: String,
    required: [true, 'Description is required'],
    minLength:[10, 'characters required minimum with 3 length'],
    maxLength:[200, 'characters required maximum with 200 length'],
},
price: {
    type: Number,
    required: [true, 'price is required'],
    minLength:[1, 'characters required minimum with 1 length'],
    maxLength:[40, 'characters required maximum with 40 length'],
   
},
img:{
    type: String,
    required: [true,'Image is required'],
    validate: {
        validator(value) {
            return VALIDATE_IMAGE.test(value);
        },
        message: 'The photo image should start with http:// or https://'
    }
},
material:{
    type: String,
    required: [true, 'Description is required'],
    minLength:[10, 'characters required minimum with 3 length'],
    maxLength:[200, 'characters required maximum with 200 length'],
},

// enrolled: {
//     type: [mongoose.Types.ObjectId],
//     ref: 'User'
// },
owner:{
    type: mongoose.Types.ObjectId,
    ref: 'User',
},

});

const Furniture = mongoose.model('Furniture',furnitureSchema)
module.exports = Furniture;