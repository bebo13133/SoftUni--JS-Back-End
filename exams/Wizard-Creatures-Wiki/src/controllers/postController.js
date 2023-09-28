const router = require('express').Router()
const { extractErrorMessage } = require('../utils/errorHelpers')
const postService = require('../services/postService')
const { isAuth } = require('../middlewares/authMiddleware')
const levels = require('../utils/platformHelpers')




//? rendering
router.get('/create', (req, res) => {
    res.render('posts/create')
})


//? Create
router.post('/create', async (req, res) => {

    const { name,
        species,
        skinColor,
        eyeColor,
        image,
        description } = req.body

    try {
        await postService.create({
            name,
            species,
            skinColor,
            eyeColor,
            image,
            description,
            owner: req.user._id,
        })
        res.redirect('/posts/catalog')   //! да се насочи към каталог

    } catch (err) {

        res.render('posts/create', { error: extractErrorMessage(err) })
    }
});


//? Catalog page
router.get('/catalog', async (req, res) => {

    try {
        const posts = await postService.getAll().lean()

        res.render('posts/catalog', { posts })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        console.log(errorMessage)

        res.render('posts/catalog', { error: errorMessage })

    }

})

//? Details

router.get('/:postId/details', async (req, res) => {

    try {
        const postId = req.params.postId

        const post = await postService.getOne(postId).lean()
        const postVotes = await postService.getOneUser(postId)

        const isOwner = req.user?._id == post.owner._id

         //! Събирам на всички гласували потребители email адресите

         let voteUsers = postVotes.toObject();
        let emails = []
        voteUsers.votes.forEach(x => emails.push(x.email))
        emails.join(', ')
        console.log(emails)
    //?--------------------------------------------------------------//    
        if (JSON.parse(JSON.stringify(post.votes)).includes(req.user?._id)) {
            post.alreadyVoted = true;                                      //? Проверявам да usera съществува вече в boughtBy от модела
        }

      
        res.render('posts/details', { post, isOwner, emails})

    } catch (err) {
        const errorMessage = extractErrorMessage(err)
        res.render('posts/details', { error: errorMessage })
    }

})



//? Edit post

router.get('/:postId/edit', isAuth, async (req, res) => {
    try {
        const post = await postService.getOne(req.params.postId).lean()

        // crypto.dropDown = levels(crypto.payment); //? използвам го за зареждане на падащото меню 

        res.render('posts/edit', { post })

    } catch (err) {
        const errorMessage = extractErrorMessage(err)

        res.render(`posts/edit`, { error: errorMessage })
    }
});

router.post('/:postId/edit', isAuth, async (req, res) => {
    const postData = req.body
    try {
        await postService.edit(req.params.postId, postData)

        res.redirect(`/posts/${req.params.postId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`/posts/${req.params.postId}/edit`, { error: errorMessage, ...postData })
    }


})

//?Voted 

router.get('/:postId/votes', isAuth, async (req, res) => {
    const postId = req.params.postId
    const userId = req.user?._id

    try {
        await postService.voted(postId, userId)

        res.redirect(`/posts/${postId}/details`)
    } catch (err) {

        const errorMessage = extractErrorMessage(err)

        res.render(`posts/edit`, { error: errorMessage })
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