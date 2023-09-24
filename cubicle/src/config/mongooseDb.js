const mongoose = require('mongoose')

const uriCubes = `mongodb://127.0.0.1:27017/cubes`
const uriAccessory =`mongodb://127.0.0.1:27017/accessories`
async function connectDb(){

await mongoose.connect(uriCubes)
}

// async function connectAccessory(){
//     await mongoose.connect(uriAccessory)
// }
module.exports = connectDb