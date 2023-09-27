const Photo = require('../models/Photo')


//? Create a new Photo
exports.create = async (photoData) => {
    const newPhoto = await Photo.create(photoData)
    return newPhoto
}

//? Catalog render 
exports.getAll = () => Photo.find().populate('owner')  //? Сложихме populate за да вземem owner.username в catalog.hbs

//? Delete photo
exports.delete = (photoId) => Photo.findByIdAndDelete(photoId)


//? Edit photo
exports.edit = (photoId, photoData) => Photo.findByIdAndUpdate(photoId, photoData).populate('owner')


//? Details render
exports.getOne = (photoId) => Photo.findById(photoId).populate('owner') //? Сложихме populate за да вземem owner.username в catalog.hbs

//? Add comment

exports.addComment = async (photoId, commentData) =>{
    const photo = await Photo.findById(photoId)
  
    photo.commentList.push(commentData)
    return photo.save()

}

//? Get owner photos - за профилната страница

exports.getOwnerPhotos = (userId) => Photo.find({owner: userId})
