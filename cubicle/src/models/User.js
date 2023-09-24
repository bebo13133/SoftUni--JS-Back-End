const { mongoose } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Username is required. Изтрезней и опитай пак !!!! '],
        unique: { value: true, message: 'this name is already in use' },

        minLength: [3, 'Characters must be between 3 and 40'],
        maxLength: [40, 'Characters must be between 3 and 40'],
        match: [/^[A-Za-z0-9]+$/, 'Username must be english'],
    },
 
    password: {
        type: String,
        minLength: [3, 'Characters must be between 3 and 40'],
        maxLength: [40, 'Characters must be between 40 and'],
        required: [true, 'Password is required . Изтрезней и опитай пак !!!! '],
        validate: {
            validator: function (value) {
                return /^[A-Za-z0-9]+$/.test(value)
            },
            messages: 'Изтрезней и опитай пак !!!!  '
        }
    },

});

userSchema.virtual('repeatPassword').set(function (value) {
    if (value !== this.password) throw new Error('The password is not correct. Изтрезней и опитай пак !!!! ')
})


userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 9)
    this.password = hash;
})

const User = mongoose.model('User', userSchema)
module.exports = User;