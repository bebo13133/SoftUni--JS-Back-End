const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const {auth} = require('../middlewares/authMiddleware');
const cookieParser = require('cookie-parser');
module.exports = (app) => {
    
  //TODO: Handlebars config
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs')
app.set('views', 'src/views');

    //TODO: Setup the body parser
app.use(express.urlencoded({ extended: false}));
//TODO: Express static configuration
app.use(express.static('src/static'));
app.use(cookieParser());

//TODO:Validate and authorization
app.use(auth)

};