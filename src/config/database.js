const mongoose = require('mongoose')

class Mongoose {
    async connectDatabase() {
        mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }
}

module.exports = new Mongoose()