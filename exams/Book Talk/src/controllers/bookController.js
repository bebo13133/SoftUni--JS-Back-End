const router = require('express').Router()
const { extractErrorMessage } = require('../utils/errorHelpers')
const bookService = require('../services/bookService')
const { isAuth } = require('../middlewares/authMiddleware')
const levels = require('../utils/platformHelpers')




//? rendering
router.get('/create', (req, res) => {
    res.render('books/create')
})


//? Create
router.post('/create', async (req, res) => {

    const { title,
        author,
        genre,
        stars,
        image,
        review } = req.body

    try {
        await bookService.create({
            title,
            author,
            genre,
            stars,
            image,
            review, 
            owner: req.user._id,
        })
        res.redirect('/books/catalog')   //! да се насочи към каталог

    } catch (err) {

        res.render('books/create', { error: extractErrorMessage(err) })
    }
});


//? Catalog page
router.get('/catalog', async (req, res) => {

    try {
        const books = await bookService.getAll().lean()

        res.render('books/catalog', { books })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        console.log(errorMessage)

        res.render('books/catalog', { error: errorMessage })

    }
})

//? Details

router.get('/:bookId/details', async (req, res) => {

    try {
        const bookId = req.params.bookId

        const book = await bookService.getOne(bookId).lean()
    

        const isOwner = req.user?._id == book.owner._id
    
        if (JSON.parse(JSON.stringify(book.wishingList)).includes(req.user?._id)) {
            book.alreadyRead = true;                                      //? Проверявам да usera съществува вече в boughtBy от модела
        }


        res.render('books/details', { book, isOwner})

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render('books/details', { error: errorMessage })
    }

})



//? Edit book

router.get('/:bookId/edit', isAuth, async (req, res) => {
    try {
        const book = await bookService.getOne(req.params.bookId).lean()

        // crypto.dropDown = levels(crypto.payment); //? използвам го за зареждане на падащото меню 

        res.render('books/edit', { book })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)

        res.render(`books/edit`, { error: errorMessage })
    }
});

router.post('/:bookId/edit', isAuth, async (req, res) => {
    const bookData = req.body
    try {
        await bookService.edit(req.params.bookId, bookData)

        res.redirect(`/books/${req.params.bookId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`/books/${req.params.bookId}/edit`, { error: errorMessage, ...bookData })
    }


})

//? isReading

router.get('/:bookId/wishingList', isAuth, async (req, res) => {
    const bookId = req.params.bookId
    const userId = req.user?._id

    try {
        await bookService.reading(bookId, userId)

        res.redirect(`/books/${bookId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`books/edit`, { error: errorMessage })
    }

})




//? Delete photo

router.get('/:postId/delete', isAuth, async (req, res) => {

    try {
        await postService.delete(req.params.postId)

        res.redirect('/posts/catalog')

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render(`posts/details`, { error: errorMessage })
    }
});











module.exports = router