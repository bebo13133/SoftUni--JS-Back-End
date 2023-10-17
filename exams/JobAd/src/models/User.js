const { mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({

    // username: {
    //     type: String,
    //     required: [true, 'Please enter a username'],
    //     minLength: [4, 'characters required minimum with 3 length'],
    //     maxLength: 50,
    //     // match: [/^[A-Za-z0-9]+$/, 'Username must be english'],   //? да се види имали го като условие 
    //     unique: { value: true, message: 'this name is already in use' },
    // },
    email: {
        type: String,
        required: [true, 'Please enter a valid email address'],
        minLength: [8, 'characters required minimum with 3 length']
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minLength: 4,                                           //? да се гледа условието за минимална и максимална дължина 
        maxLength: 50,
        validate: {
            validator: function (value) {
                return /^[A-Za-z0-9]+$/.test(value)
            },
            message: 'Password must be only english characters'  //? да се види условието 
        }
    },
    description:{
        type:String,
        require:true,
        maxLength:[40,'The description of skills should be a maximum of 40 characters long']

    }


})


//todo: Валидация repeatPassword - 


userSchema.virtual('repeatPassword').set(function (value) {
    if (value !== this.password) throw new Error('The password is not correct.')
})

//?Хеширане на паролата
userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 9)
    this.password = hash
})

const User = mongoose.model('User', userSchema)

module.exports = User