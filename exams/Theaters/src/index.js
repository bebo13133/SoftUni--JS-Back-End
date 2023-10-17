const app = require('express')()
const { log } = require('console')
const connectDB = require('./config/mongooseDB')
// const router = require('./config/routes')
const PORT = 3000

connectDB()
.then(()=> log('Welcome to Mongodb'))
.catch(err =>log('database error: ', err))

//! Експортваме от config папката 
require('./config/express')(app);
require('./config/routes')(app)


app.listen(PORT, () =>log(`Server running on port ${PORT}`));