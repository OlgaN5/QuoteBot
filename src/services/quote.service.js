const mongoose = require('mongoose')
const QuoteModel = require('../models/quote')
const accessToDatabase = require('../utils/accessToDatabase')
class QuoteService {
    async addQuote(quote) {
        return await accessToDatabase.create(QuoteModel, quote)
    }


    async getQuote(theme) {
        return theme ? await accessToDatabase.getRandomByConditions(QuoteModel, {
            theme: theme
        }) : accessToDatabase.getRandom(QuoteModel)
    }
    async getQuoteByKeys(key) {
        return await accessToDatabase.getRandomByConditions(QuoteModel, {
            keys: {
                $in: [key]
            }
        })
    }
    async getAllQuotes(theme) {
        return await accessToDatabase.getAllByConditions(QuoteModel, {
            theme: theme
        })
    }


    async editQuote(id, data) {
        return await accessToDatabase.updateOne(QuoteModel, {
            _id: new mongoose.Types.ObjectId(id)
        }, data)
    }
    async deleteQuote(id) {
        return await accessToDatabase.deleteOne(QuoteModel, {
            _id: new mongoose.Types.ObjectId(id)
        })
    }
}
module.exports = new QuoteService()


