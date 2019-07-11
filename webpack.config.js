const path = require('path')
const paths = require('./config/paths')

module.exports = {
    alias:{
        "$client":path.join(paths.appSrc,'client'),
        "$modules":path.join(paths.appSrc,'modules')
    }
}