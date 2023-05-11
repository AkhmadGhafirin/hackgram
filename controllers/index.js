'use strict'

const { User, Profile, Post, Tag } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class Controller {
    static showLanding(req, res) {
        res.render('login')
    }
    
    static login(req, res) {
        // User.create({})
        // .then(result => {})
        // .catch(err => res.send(err))
    }

    static showSignUp(req, res) {
        res.render('signUp')
    }

    static signUp(req, res) {
        const { firstName, lastName, gender, age, profilePicture, username, email, role, password } = req.body
        User.create({ username, email, role, password })
        .then(user => {
            return Profile.create({ firstName, lastName, gender, age, profilePicture, UserId: user.id })
        })
        .then(result => res.redirect('/'))
        .catch(err => res.send(err))
    }

    static posts(req, res) {
        const { search } = req.query
        const options = {
            include: {
                all: true,
                nested: true
            },
            order: [['updatedAt', 'DESC']]
        }
        if (search) {
            options.where = {
                title: {
                    [Op.iLike]: `%${search}%`
                }
            }
        }
        Post.findAll(options)
        .then(posts => {
            res.render('posts', { posts, moment })
        })
        .catch(err => res.send(err))
    }

    static showPostForm(req, res) {
        const { id } = req.params
        let tags = null
        if (!id) {
            Tag.findAll({})
            .then(result => res.render('postForm', { tags: result, post: null }))
            .catch(err => res.send(err))   
        } else {
            Tag.findAll({})
            .then(result => {
                tags = result
                return Post.findOne({ where: { id } })
            })
            .then(post => res.render('postForm', { tags, post }))
            .catch(err => res.send(err))
        }
    }

    static createPost(req, res) {
        const UserId = 6
        const { title, content, TagId, imgUrl } = req.body
        Post.create({ title, content, TagId, imgUrl, UserId })
        .then(post => res.redirect('/posts'))
        .catch(err => res.send(err))
    }

    static editPost(req, res) {
        const { id } = req.params
        const { title, content, TagId, imgUrl } = req.body
        Post.update(
            { title, content, TagId, imgUrl },
            { where: { id }}
        )
        .then(post => {})
        .catch(err => res.send(err))
    }

    static likePost(req, res) {
        const { id } = req.params
        Post.increment(
            { like: 1 },
            { where: { id }}
        )
        .then(post => res.redirect('/posts'))
        .catch(err => res.send(err))  
    }

    static deletePost(req, res) {
        const { id } = req.params
        Post.destroy({ where: { id } })
        .then(post => res.redirect('/posts'))
        .catch(err => res.send(err))
    }

    static profile(req, res) {
        Profile.findOne({})
        .then(profile => {})
        .catch(err => res.send(err))
    }

    static editProfile(req, res) {
        Profile.update({})
        .then(profile => {})
        .catch(err => res.send(err))
    }

    static logout(req, res) {

    }
}

module.exports = Controller