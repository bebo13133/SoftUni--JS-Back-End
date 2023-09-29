const router = require('express').Router();
const { log } = require('console')
const courseService = require('../services/courseService')
const {isAuth} = require('../middlewares/authMiddleware');
//! да не забравя да го експортна router


router.get('/', async(req, res) => {
  
    const sortedCourse = await courseService.getAll().lean();
    sortedCourse.sort((a, b) => b.enrolled.length - a.enrolled.length);
    const allCourse = sortedCourse.slice(0, 3);


    res.render('home',{allCourse})
});

router.get('/404', (req, res) => {
    res.render('404')
})
module.exports = router
