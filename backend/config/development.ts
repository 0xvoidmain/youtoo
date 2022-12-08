import _ from 'lodash'
import path from 'path'


export default {
    __ROOTDIR: __dirname.includes('dist') ? path.join(__dirname, '../../..') : path.join(__dirname, '../..'),
    
    MONGODB: {
        URI: process.env.MONGODB_URI || 'mongodb+srv://admin:dev-4dm1n-m0ll3cto@dev.kkrga.mongodb.net/youtoo?retryWrites=true&w=majority'
    }
}