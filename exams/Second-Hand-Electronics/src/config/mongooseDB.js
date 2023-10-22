const mongoose = require('mongoose')


//TODO: CHANGE DB NAME mongodb://127.0.0.1:27017/name - заместваме според задачата
const uriParts = 'mongodb://127.0.0.1:27017/parts'

async function connectDB (){

await mongoose.connect(uriParts)

}
module.exports = connectDB