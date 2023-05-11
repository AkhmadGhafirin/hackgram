'use strict'

const { User, Profile, Post, Tag } = require('../models')
const { Op } = require('sequelize')
const formatPostedDate = require('../helpers/formatPostedDate')
const bcrypt = require('bcryptjs')
const sendMail = require('../helpers/sendMail')

class Controller {
    static showLanding(req, res) {
        const { error } = req.query
        res.render('login', { error })
    }
    
    static login(req, res) {
        const { email, password } = req.body
        User.findOne({
            where: { email },
            include: Profile
        })
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.role = user.role
                req.session.userId = user.id
                sendMail({
                    receiverEmail: email,
                    receiverName: user.Profile.fullName(),
                    subject: 'New login to your account',
                    intro: `We noticed a login to your Hackgram account: ${email}`
                })
                res.redirect('/posts')
            } else {
                res.redirect(`/?error=Invalid Email or Password!`)
            }
        })
        .catch(err => {
            console.log(err, 'ini error disininininini');
            res.send(err)
        })
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
        .then(profile => {
            sendMail({
                receiverEmail: email,
                receiverName: profile.fullName(),
                subject: 'Welcome to Hackgram',
                intro: 'Welcome to Hackgram! We\'re very excited to have you on board.'
            })
            res.redirect('/')
        })
        .catch(err => res.send(err))
    }

    static posts(req, res) {
        const { search, filterByTag } = req.query
        const user = {
            role: req.session.role,
            id: req.session.userId
        }
        let tags = null
        let profile = null
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
        if (filterByTag) {
            options.where = {
                TagId: filterByTag
            }
        }
        Profile.findOne({ where: { UserId: user.id }, include: User })
        .then(result => {
            profile = result
            return Tag.findAll({ include: Post })
        })
        .then(result => {
            tags = result
            return Post.findAll(options)
        })
        .then(posts => {
            res.render('posts', { posts, formatPostedDate, user, tags, profile })
        })
        .catch(err => {
            console.log(err, 'ini posts error');
            res.send(err)
        })
    }

    static showPostForm(req, res) {
        const { id } = req.params
        const { errors } = req.query
        const parsedError = errors ? JSON.parse(errors) : null
        let tags = null
        if (!id) {
            Tag.findAll({})
            .then(result => res.render('postForm', { tags: result, post: null, errors: parsedError }))
            .catch(err => res.send(err))   
        } else {
            Tag.findAll({})
            .then(result => {
                tags = result
                return Post.findOne({ where: { id } })
            })
            .then(post => res.render('postForm', { tags, post, errors: parsedError }))
            .catch(err => res.send(err))
        }
    }

    static createPost(req, res) {
        const UserId = req.session.userId
        const { title, content, TagId, imgUrl } = req.body
        Post.create({ title, content, TagId, imgUrl, UserId })
        .then(post => res.redirect('/posts'))
        .catch(err => {
            if (err?.name === 'SequelizeValidationError') {
                const errors = {}
                err.errors.forEach(el => {
                    const key = el.message.split(' ')[0]
                    errors[key] = el.message
                })
                res.redirect(`/posts/add?errors=${JSON.stringify(errors)}`)
            } else res.send(err)
        })
    }

    static editPost(req, res) {
        const { id } = req.params
        const { title, content, TagId, imgUrl } = req.body
        Post.update(
            { title, content, TagId, imgUrl },
            { where: { id }}
        )
        .then(post => res.redirect('/posts'))
        .catch(err => {
            if (err?.name === 'SequelizeValidationError') {
                const errors = {}
                err.errors.forEach(el => {
                    const key = el.message.split(' ')[0]
                    errors[key] = el.message
                })
                res.redirect(`/posts/add?errors=${JSON.stringify(errors)}`)
            } else res.send(err)
        })
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

    static showTagForm(req, res) {
        res.render('tagForm')
    }

    static addTag(req, res) {
        const { tag } = req.body
        Tag.create({ name: tag })
        .then(tag => res.redirect('/posts'))
        .catch(err => res.send(err))
    }

    static showProfileForm(req, res) {
        const { userId } = req.params
        Profile.findOne({where: { UserId: userId } })
        .then(profile => res.render('profileForm', { profile, userId }))
        .catch(err => res.send(err))
    }

    static editProfile(req, res) {
        const { userId } = req.params
        const { firstName, lastName, gender, age, profilePicture } = req.body
        Profile.update(
            { firstName, lastName, gender, age, profilePicture },
            { where: { UserId: userId } }
        )
        .then(profile => res.redirect('/posts'))
        .catch(err => res.send(err))
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/')
    }
}

module.exports = Controller