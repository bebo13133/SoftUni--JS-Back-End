const {mongoose} = require('mongoose');
const VALIDATE_IMAGE = /^https?:\/\/.+$/;


const tripSchema = new mongoose.Schema({

startPoint: {
    type: String,
    required: [true, 'Name is required'],
    minLength:[4, 'characters required minimum with 3 length'],
    maxLength:[50, 'characters required maximum with 40 length'],
   
},
endPoint: {
    type: String,
    required: [true, 'Name is required'],
    minLength:[4, 'characters required minimum with 3 length'],
    maxLength:[50, 'characters required maximum with 40 length'],
   
},
date:{
    type: String,
    required: [true, 'Color is required'],
    minLength:[4, 'characters required minimum with 3 length'],
    maxLength:[500, 'characters required maximum with 40 length'],

},
time:{
    type: String,
    required: [true, 'Color is required'],
    minLength:[3, 'characters required minimum with 3 length'],
    maxLength:[20, 'characters required maximum with 40 length'],

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
carBrand:{
    type: String,
    required: [true, 'Color is required'],
    minLength:[4, 'characters required minimum with 3 length'],
    maxLength:[500, 'characters required maximum with 40 length'],

},


seats:{
    type: Number,
    required: [true, 'Stars is required'],
    minLength:[0, 'characters required minimum with 3 length'],
    maxLength:[7, 'characters required maximum with 40 length'],

},
price:{
    type: Number,
    required: [true, 'Stars is required'],
    minLength:[1, 'characters required minimum with 3 length'],
    maxLength:[50, 'characters required maximum with 40 length'],

},
description:{
    type: String,
    required: [true, 'Color is required'],
    minLength:[10, 'characters required minimum with 3 length'],
    maxLength:[500, 'characters required maximum with 40 length'],

},
buddies: {
    type: [mongoose.Types.ObjectId],
    ref: 'User'
},
owner:{
    type: mongoose.Types.ObjectId,
    ref: 'User',
},
contactsPassengers: [{
    type: String,
}],

});

const Trip = mongoose.model('Trip',tripSchema)
module.exports = Trip;
// •	Start Point - string (required), 
// •	End Point – string (required),
// •	Date – string (required),
// •	Time – string (required),
// •	Car Image – string (required),
// •	Car Brand – string (required),
// •	Seats – number (required),
// •	Price – number (required),
// •	Description – string (required),
// •	Creator – object Id (reference to the User model),
// •	Buddies – a collection of Users (reference to the User model)
