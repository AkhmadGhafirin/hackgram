const moment = require('moment')

function formatPostedDate(date) {
    return moment(date.toLocaleString(), 'MM/DD/YYYY, hh:mm:ss' ).fromNow()
}

module.exports = formatPostedDate