const mongoose = require('mongoose')


//TODO: CHANGE DB NAME mongodb://127.0.0.1:27017/name - заместваме според задачата
const uriAbs = 'mongodb://127.0.0.1:27017/abs'

async function connectDB (){

await mongoose.connect(uriAbs)

}
module.exports = connectDB