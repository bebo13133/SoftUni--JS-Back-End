const {mongoose} = require('mongoose');
const VALIDATE_IMAGE = /^https?:\/\/.+$/;


const bookSchema = new mongoose.Schema({

title: {
    type: String,
    required: [true, 'Name is required'],
    minLength:[4, 'characters required minimum with 3 length'],
    maxLength:[50, 'characters required maximum with 40 length'],
   
},
author: {
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

review:{
    type: String,
    required: [true, 'Color is required'],
    minLength:[4, 'characters required minimum with 3 length'],
    maxLength:[500, 'characters required maximum with 40 length'],

},
genre:{
    type: String,
    required: [true, 'Color is required'],
    minLength:[3, 'characters required minimum with 3 length'],
    maxLength:[20, 'characters required maximum with 40 length'],

},
stars:{
    type: Number,
    required: [true, 'Stars is required'],
    minLength:[1, 'characters required minimum with 3 length'],
    maxLength:[5, 'characters required maximum with 40 length'],

},
wishingList: {
    type: [mongoose.Types.ObjectId],
    ref: 'User'
},
owner:{
    type: mongoose.Types.ObjectId,
    ref: 'User',
},

});

const Book = mongoose.model('Book',bookSchema)
module.exports = Book;
