const {mongoose} = require('mongoose');
const VALIDATE_IMAGE = /^https?:\/\/.+$/;


const ElectronicsSchema = new mongoose.Schema({

name: {
    type: String,
    required: [true, 'Name is required'],
    minLength:[10, 'characters required minimum with 10 length'],
    maxLength:[50, 'characters required maximum with 40 length'],
   
},
type:{
    type: String,
    required: true,
    min: [2, 'type is required'],
},
damages:{
    type: String,
    required: [true, 'damages is required'],
    minLength:[10, 'characters required minimum with 3 length'],
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
description:{
    type: String,
    required: [true, 'Description is required'],
    minLength:[10, 'characters required minimum with 3 length'],
    maxLength:[200, 'characters required maximum with 200 length'],
},
production:{
    type: Number,
    required: [true, 'production is required'],
    minLength:[1900, 'characters required minimum with 3 length'],
    maxLength:[2023, 'characters required maximum with 40 length'],

},
exploitation:{
    type: Number,
    required: [true, 'exploitation is required'],
    minLength:[0, 'characters required minimum with 3 length'],
    maxLength:[50, 'characters required maximum with 40 length'],

},
price:{
    type: Number,
    required: true,
    default: [0, 'price must be positive number'],
    min: 0

},
buyingList: {
    type: [mongoose.Types.ObjectId],
    ref: 'User'
},
owner:{
    type: mongoose.Types.ObjectId,
    ref: 'User',
},

});

const Electronics = mongoose.model('Electronics',ElectronicsSchema)
module.exports = Electronics;
// •	name – string (required)
// •	type – string (required)
// •	damages – string (required)
// •	image - string (required)
// •	description – string (required)
// •	production – number (required)
// •	exploitation - number (required)
// •	price - number (required)
// •	buyingList – an array of objects containing the users' ID
// •	owner – object ID (a reference to the User model)
// Note:  When a user buy electronic, their ID is added to that collection (buyingList)
// Implement the entities with the correct data types.
