const mongoose = require('mongoose')


//TODO: CHANGE DB NAME mongodb://127.0.0.1:27017/name - заместваме според задачата
const uriPhotos = 'mongodb://127.0.0.1:27017/wildlife '

async function connectDB (){

await mongoose.connect(uriPhotos)

}
module.exports = connectDB