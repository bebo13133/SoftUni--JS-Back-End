const {mongoose} = require('mongoose');
const VALIDATE_IMAGE = /^https?:\/\/.+$/;


const animalSchema = new mongoose.Schema({

name: {
    type: String,
    required: [true, 'Name is required'],
    minLength:[4, 'characters required minimum with 3 length'],
    maxLength:[50, 'characters required maximum with 40 length'],
   
},
years:{
    type: Number,
    required: true,
    min: [0, 'The price should be a positive number.']
},
kind:{
    type: String,
    required: [true, 'Name is required'],
    minLength:[4, 'characters required minimum with 3 length'],
    maxLength:[50, 'characters required maximum with 40 length'],

},
image:{
    type: String,
    required: [true,'Image is required'],
    validate: {
        validator(value) {
            return VALIDATE_IMAGE.test(value);
        },
        message: 'The photo image should start with http:// or https://'
    }
},
need:{
    type: String,
    required: [true, 'Name is required'],
    minLength:[2, 'characters required minimum with 3 length'],
    maxLength:[50, 'characters required maximum with 40 length'],

},
location:{
    type: String,
    required: [true, 'Name is required'],
    minLength:[4, 'characters required minimum with 3 length'],
    maxLength:[100, 'characters required maximum with 40 length'],

},


description:{
    type: String,
    required: [true, 'Description is required'],
    minLength:[10, 'characters required minimum with 3 length'],
    maxLength:[1000, 'characters required maximum with 200 length'],
},
donations: {
    type: [mongoose.Types.ObjectId],
    ref: 'User'
},
owner:{
    type: mongoose.Types.ObjectId,
    ref: 'User',
},

});

const Animal = mongoose.model('Animal',animalSchema)
module.exports = Animal;
