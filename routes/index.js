'use strict'

const Controller = require('../controllers')

const router = require('express').Router()

router.get('/', Controller.showLanding)
router.post('/', Controller.login)

router.get('/signUp', Controller.showSignUp)
router.post('/signUp', Controller.signUp)

router.use(function (req, res, next) {
    if (req.session.userId) {
        next()
    } else {
        res.redirect('/?error=Please login first!')
    }
})

router.get('/logout', Controller.logout)

router.get('/tags/add', Controller.showTagForm)
router.post('/tags/add', Controller.addTag)

router.get('/posts', Controller.posts)
router.get('/posts/add', Controller.showPostForm)
router.post('/posts/add', Controller.createPost)
router.get('/posts/:id/edit', Controller.showPostForm)
router.post('/posts/:id/edit', Controller.editPost)
router.get('/posts/:id/like', Controller.likePost)
router.get('/posts/:id/delete', Controller.deletePost)

router.get('/profile/:userId/edit', Controller.showProfileForm)
router.post('/profile/:userId/edit', Controller.editProfile)

module.exports = router