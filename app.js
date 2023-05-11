'use strict'

const express = require('express')
const router = require('./routes')
const path = require('path')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use("/css", express.static(path.join(__dirname, "bootstrap/css")))
app.use("/js", express.static(path.join(__dirname, "bootstrap/js")))
app.use(router)

app.listen(port, () => {
    console.log('listening port', port)
})

// FK UserId di Profile