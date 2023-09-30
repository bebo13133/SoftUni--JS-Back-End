const express = require('express');
const cors = require('cors');
const {auth} = require('../middlewares/authMiddleware')

module.exports = (app) =>{


    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    
    app.use(cors())

    app.get('/', (req,res) =>{
    
    res.send('Welcome word')
    
    })
    app.use(auth)


}