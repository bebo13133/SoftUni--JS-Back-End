const { search } = require('../controllers/homeController')
const Job = require('../models/Job')


//?Last three posts -home page
exports.lastThree = () => Job.find().sort({ _id: [ 1 ]}).limit(3)


//? Create a new Crypto
exports.create = async (jobData) => {
    const newJob = await Job.create(jobData)
    return newJob
}

//? Catalog render 
exports.getAll = () => Job.find().populate('owner')  //? Сложихме populate за да вземem owner.username в catalog.hbs

//? Delete photo
exports.delete = (jobId) => Job.findByIdAndDelete(jobId)


//? Edit photo
exports.edit = (jobId, jobData) => Job.updateOne({ _id: jobId }, { $set: jobData }, { runValidators: true }).populate('owner')


//? Details render
exports.getOne = (jobId) => Job.findById(jobId).populate('owner') //? Сложихме populate за да вземem owner.username в catalog.hbs


//? Apply job
exports.applied = (jobId, userId) => Job.findByIdAndUpdate(jobId, { $push: { applied: userId } })



//? Search games


exports.searchGames = async(search) =>  {
    const allData = await Job.find().populate('owner').lean();
    const result = allData.filter(x => x.owner.email.toLowerCase().includes(search.toLowerCase()))

    return result;
}