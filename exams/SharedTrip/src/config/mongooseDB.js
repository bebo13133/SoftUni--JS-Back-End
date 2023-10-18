const mongoose = require('mongoose')


//TODO: CHANGE DB NAME mongodb://127.0.0.1:27017/name - заместваме според задачата
const uriTrips = 'mongodb://127.0.0.1:27017/trips'

async function connectDB (){

await mongoose.connect(uriTrips)

}
module.exports = connectDB