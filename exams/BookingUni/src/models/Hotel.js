const {mongoose} = require('mongoose');
const VALIDATE_IMAGE = /^https?:\/\/.+$/;


const hotelSchema = new mongoose.Schema({

name: {
    type: String,
    required: [true, 'Name is required'],
    minLength:[4, 'characters required minimum with 3 length'],
    maxLength:[50, 'characters required maximum with 100 length'],
   
},
city: {
    type: String,
    required: [true, 'Name is required'],
    minLength:[3, 'characters required minimum with 3 length'],
    maxLength:[50, 'characters required maximum with 50 length'],
   
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
freeRooms:{
    type: Number,
    required: [true, 'Stars is required'],
    minLength:[1, 'characters required minimum with 3 length'],
    maxLength:[100, 'characters required maximum with 40 length'],

},
booked: {
    type: [mongoose.Types.ObjectId],
    ref: 'User'
},
owner:{
    type: mongoose.Types.ObjectId,
    ref: 'User',
},

});

const Hotel = mongoose.model('Hotel',hotelSchema)
module.exports = Hotel;
