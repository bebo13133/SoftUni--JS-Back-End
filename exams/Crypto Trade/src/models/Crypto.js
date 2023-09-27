const {mongoose} = require('mongoose');
const VALIDATE_IMAGE = /^https?:\/\/.+$/;


const cryptoSchema = new mongoose.Schema({

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
price:{
    type: Number,
    required: true,
    min: [0, 'The price should be a positive number.']
},
description:{
    type: String,
    required: [true, 'Description is required'],
    minLength:[3, 'characters required minimum with 3 length'],
    maxLength:[200, 'characters required maximum with 200 length'],
},

payment: {
    type: String,
    required: true,
    enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
},

buyCrypto: {
    type: [mongoose.Types.ObjectId],
    ref: 'User'
},
owner:{
    type: mongoose.Types.ObjectId,
    ref: 'User',
},

});

const Crypto = mongoose.model('Crypto',cryptoSchema)
module.exports = Crypto;
