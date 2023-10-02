const {mongoose} = require('mongoose');
const VALIDATE_IMAGE = /^https?:\/\/.+$/;


const houseSchema = new mongoose.Schema({

title: {
    type: String,
    required: [true, 'Name is required'],
    minLength:[4, 'characters required minimum with 3 length'],
    maxLength:[40, 'characters required maximum with 40 length'],
   
},
description:{
    type: String,
    // required: [true, 'Description is required'],
    minLength:[10, 'characters required minimum with 3 length'],
    maxLength:[200, 'characters required maximum with 200 length'],
},
category: {
    type: String,
    required: [true, 'Category field is required'],
    enum: ['vehicles', 'estate', 'electronics', 'furniture', 'other',],
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
price:{
    type: Number,
    required: true,
    min: [0, 'The price should be a positive number.']
},

owner:{
    type: mongoose.Types.ObjectId,
    ref: 'User',
},

bidder: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
},
closed: {
    type: Boolean,
    default: false,
},
listed : {
    type: Boolean,
    default: true,
}

});

const House = mongoose.model('House',houseSchema)
module.exports = House;
