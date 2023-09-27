const { MongooseError, Error } = require('mongoose')


exports.extractErrorMessage = (error) => {

    if (error instanceof MongooseError || error instanceof Error) {
        return Object.values(error.errors).map(err => err.message)
    } else if (error) {
        return [error.message]
    }
}