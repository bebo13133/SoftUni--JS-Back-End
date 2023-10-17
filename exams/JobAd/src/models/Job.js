const {mongoose} = require('mongoose');
const VALIDATE_IMAGE = /^https?:\/\/.+$/;


const jobSchema = new mongoose.Schema({

    headline:{
        type: String,
        required: [true, 'Description is required'],
        minLength:[2, 'characters required minimum with 2 length'],
        maxLength:[200, 'characters required maximum with 200 length'],
    },
    
location:{
    type: String,
    required: [true, 'Location is required'],
    minLength:[3, 'characters required minimum with 3 length'],
    maxLength:[100, 'characters required maximum with 40 length'],

},
companyName: {
    type: String,
    required: [true, 'Name is required'],
    minLength:[3, 'characters required minimum with 3 length'],
    maxLength:[50, 'characters required maximum with 40 length'],
   
},

companyDescription:{
    type: String,
    required: [true, 'Description is required'],
    minLength:[3, 'characters required minimum with 3 length'],
    maxLength:[500, 'characters required maximum with 40 length'],

},
owner :{
    type: mongoose.Types.ObjectId,
    ref: 'User',
},
applied : {
    type: [mongoose.Types.ObjectId],
    ref: 'User'
},


});

const Job = mongoose.model('Job',jobSchema)
module.exports = Job;
