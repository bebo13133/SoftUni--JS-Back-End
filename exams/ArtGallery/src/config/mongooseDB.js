const mongoose = require('mongoose')


//TODO: CHANGE DB NAME mongodb://127.0.0.1:27017/name - заместваме според задачата
const uriArts = 'mongodb://127.0.0.1:27017/arts'

async function connectDB (){

await mongoose.connect(uriArts)

}
module.exports = connectDB