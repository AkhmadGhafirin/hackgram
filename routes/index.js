'use strict'

const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Halo halo ')
})

module.exports = router