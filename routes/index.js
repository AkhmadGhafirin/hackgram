'use strict'

const Controller = require('../controllers')

const router = require('express').Router()

router.get('/', Controller.showLanding)
router.post('/', Controller.login)

router.get('/signUp', Controller.showSignUp)
router.post('/signUp', Controller.signUp)

router.get('/posts', Controller.posts)
router.get('/posts/add', Controller.showPostForm)
router.post('/posts/add', Controller.createPost)
router.get('/posts/:id/edit', Controller.showPostForm)
router.post('/posts/:id/edit', Controller.editPost)
router.get('/posts/:id/like', Controller.likePost)
router.get('/posts/:id/delete', Controller.deletePost)

router.get('/profile:id', Controller.profile)
router.get('/profile:id/edit', Controller.editProfile)

router.get('/:id/logout', Controller.logout)

module.exports = router