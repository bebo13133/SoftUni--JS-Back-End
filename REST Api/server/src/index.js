const app = require('express')()
const {log} = require('console')
const connectDb = require('./config/mongooseDB')

const PORT = 3030

connectDb()
.then(()=> log('Welcome to Mongodb'))
.catch(err =>log('database error: ', err))

require('./config/express')(app);
require('./config/routes')(app)



app.listen(PORT,()=> log("Server is running"))