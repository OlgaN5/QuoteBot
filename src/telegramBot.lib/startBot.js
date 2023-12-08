let cron = require('node-cron')

const botHandler = require('./botHandlers')
async function startBot() {
    cron.schedule('0 04 18 * * *', () => {
        const chatId = 479761193
        botHandler.getQuote(null, chatId)

    })
    cron.schedule('* */2 * * *', () => {
        const chatId = 479761193
        botHandler.getQuote(null, chatId)

    })
    const bot = botHandler.bot

    bot.setMyCommands([{
            command: '/start',
            description: 'Начать'
        },
        {
            command: '/add',
            description: 'Добавить цитату'
        },
        {
            command: '/get',
            description: 'Получить цитату'
        },
        {
            command: '/getbykey',
            description: 'Получить цитату'
        },
        {
            command: '/edit',
            description: 'Получить цитату'
        },
        {
            command: '/view',
            description: 'Получить цитату'
        },
        {
            command: '/delete',
            description: 'Получить цитату'
        }
    ])
    bot.on('message', botHandler.messageHandler)
    // bot.on('callback_query', botHandler.callbackQueryHandler)
}

module.exports = startBot