require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('./config/database')
const startBot = require('./telegramBot.lib/startBot')

async function start() {
    const port = process.env.PORT || 4000
    mongoose.connectDatabase()
    app.listen(port, () => {
        startBot()

        console.log(`server started on port ${port}`)
    })
    // app.use('/api', indexRouter)

}
start()