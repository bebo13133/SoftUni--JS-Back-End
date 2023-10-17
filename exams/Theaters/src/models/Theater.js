const {mongoose} = require('mongoose');
const VALIDATE_IMAGE = /^https?:\/\/.+$/;


const theatersSchema = new mongoose.Schema({

title: {
    type: String,
    required: [true, 'Name is required'],
    minLength:[2, 'characters required minimum with 3 length'],
    maxLength:[40, 'characters required maximum with 40 length'],
   
},

description:{
    type: String,
    required: [true, 'Description is required'],
    minLength:[4, 'characters required minimum with 3 length'],
    maxLength:[200, 'characters required maximum with 200 length'],
},
imageUrl:{
    type: String,
    required: [true,'Image is required'],
    validate: {
        validator(value) {
            return VALIDATE_IMAGE.test(value);
        },
        message: 'The photo image should start with http:// or https://'
    }
},

isPublic: {
     type: Boolean,
      default: true 
    },
createdOn: { 
    type: String, 
    require:true
},

likes: {
    type: [mongoose.Types.ObjectId],
    ref: 'User'
},
owner:{
    type: mongoose.Types.ObjectId,
    ref: 'User',
},

});

const Theater = mongoose.model('Theater',theatersSchema)
module.exports = Theater;
