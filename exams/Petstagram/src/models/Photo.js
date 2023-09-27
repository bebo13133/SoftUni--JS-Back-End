const {mongoose} = require('mongoose');
const VALIDATE_IMAGE = /^https?:\/\/.+$/;


const photoSchema = new mongoose.Schema({

name: {
    type: String,
    required: [true, 'Name is required'],
    minLength:[3, 'characters required minimum with 3 length'],
    maxLength:[40, 'characters required maximum with 40 length'],
   
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
age:{
    type: Number,
    required: true,
},
description:{
    type: String,
    required: [true, 'Description is required'],
    minLength:[3, 'characters required minimum with 3 length'],
    maxLength:[200, 'characters required maximum with 200 length'],
},
location:{
    type: String,
    required: [true, 'Location is required'],
},
commentList:[
    {
        user: {
            type: mongoose.Types.ObjectId,
            required: [true,'user required'],
            ref:'User',
        },
        comment:{
            type: String,
            required: [true, 'Comment is required'],
        }
    }
],
owner:{
    type: mongoose.Types.ObjectId,
    ref: 'User',
},

});

const Photo = mongoose.model('Photo',photoSchema)
module.exports = Photo;
