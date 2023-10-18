const {mongoose} = require('mongoose');
const VALIDATE_IMAGE = /^https?:\/\/.+$/;


const artSchema = new mongoose.Schema({

title: {
    type: String,
    required: [true, 'Name is required'],
    minLength:[2, 'characters required minimum with 3 length'],
    maxLength:[50, 'characters required maximum with 40 length'],
   
},
painting: {
    type: String,
    required: [true, 'Name is required'],
    minLength:[2, 'characters required minimum with 2 length'],
    maxLength:[50, 'characters required maximum with 40 length'],
   
},
picture:{
    type: String,
    required: [true,'Image is required'],
    validate: {
        validator(value) {
            return VALIDATE_IMAGE.test(value);
        },
        message: 'The photo image should start with http:// or https://'
    }
},
certificate: {
    type: String,
    enum: ['Yes', 'No'], // освен че е стринг трябва да бъде една от тези две стйности;
    required: [true, 'Certificate is required'],
},


shared: {
    type: [mongoose.Types.ObjectId],
    ref: 'User'
},
owner:{
    type: mongoose.Types.ObjectId,
    ref: 'User',
},

});

const Art = mongoose.model('Art',artSchema)
module.exports = Art;
// •	Title - string (required),
// •	Painting technique - string (required),
// •	Art picture - string (required),
// •	Certificate of authenticity - string ("Yes", "No") required,
// •	Author - object Id (a reference to the User model),
// •	Users Shared - a collection of Users (a reference to the User model)
