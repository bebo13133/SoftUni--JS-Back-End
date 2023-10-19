const cookieParser = require('cookie-parser');
const express = require('express');
const handlebars = require('express-handlebars');
const {auth} = require('../middlewares/authMiddleware')
// const cookieParser = require('cookie-parser');



module.exports =(app) =>{
    //TODO: ADD HANDLEBARS

    app.engine('hbs', handlebars.engine({
        extname: 'hbs',
    }))
    app.set('view engine', 'hbs');
    app.set('views','src/views');
    
    //TODO: 1. ADD BODY PARSER
    app.use(express.urlencoded({ extended: false }))
    //TODO: 2. STATIC

    app.use(express.static('src/static'))
    //TODO: 3. CookieParser
    app.use(cookieParser());

    //todo: 4. add authentication
    app.use(auth)
}

