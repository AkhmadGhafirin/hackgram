const { EMAIL, PASSWORD } = require('../env')
const Mailgen = require('mailgen')
const nodemailer = require('nodemailer')

const config = {
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
}

const transporter = nodemailer.createTransport(config)

const MailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Mailgen',
        link: 'https://mailgen.js/'
    }
})

function sendMail(params) {
    const { receiverEmail, receiverName, subject, intro } = params
    const response = {
        body: {
            name: receiverName,
            intro: intro,
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }

    const mail = MailGenerator.generate(response)
    const message = {
        from: EMAIL,
        to: receiverEmail,
        subject: subject,
        html: mail
    }

    transporter.sendMail(message)
        .then(_ => console.log(`Success send email to ${receiverEmail}`))
        .catch(err => console.log(err))
}

module.exports = sendMail