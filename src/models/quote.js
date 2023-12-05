const mongoose = require('mongoose')

const QuoteSchema = mongoose.Schema({
    text: String,
    theme: String,
    keys: [String]
})
const Quote = mongoose.model('quote', QuoteSchema)
module.exports = Quote