const {mongoose} = require('mongoose');
const VALIDATE_IMAGE = /^https?:\/\/.+$/;


const postSchema = new mongoose.Schema({

title: {
    type: String,
    required: [true, 'Name is required'],
    minLength:[4, 'characters required minimum with 3 length'],
    maxLength:[50, 'characters required maximum with 40 length'],
   
},
keyWord:{
    type: String,
    required: true,
    min: [0, 'Species is required'],
},
location:{
    type: String,
    required: [true, 'Color is required'],
    minLength:[4, 'characters required minimum with 3 length'],
    maxLength:[50, 'characters required maximum with 40 length'],

},
date:{
    type: String,
    required: [true, 'Color is required'],
    validate: {
        validator: function (value) {
            return value.length === 10;
        },
        message: 'Date must be exactly 10 characters long',
    }

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
    maxLength:[1000, 'characters required maximum with 200 length'],
},
votes: {
    type: [mongoose.Types.ObjectId],
    ref: 'User'
},
rating:{
    type: Number,
    default:0
}, 
owner:{
    type: mongoose.Types.ObjectId,
    ref: 'User',
},

});

const Post = mongoose.model('Post',postSchema)
module.exports = Post;
