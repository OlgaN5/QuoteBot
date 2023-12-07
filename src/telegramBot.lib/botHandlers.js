const quoteService = require('../services/quote.service')
const TelegramBot = require('node-telegram-bot-api')
const {
    themeFirstOptions,
    themeLastOptions,
    quoteParameters
} = require('./options')

class BotHandler {
    admins = [479761193]
    #quote = {}
    operation
    quoteParam = null
    editData = {}
    type = null
    editId
    constructor() {
        this.bot = new TelegramBot(process.env.TG_TOKEN, {
            polling: true
        })
    }
    editMetods = {
        'Текст': async (chatId) => {
            this.quoteParam = 'textEdit'
            await this.bot.sendMessage(chatId, 'Введите новый текст')
        },
        'Ключи': async (chatId) => {
            this.quoteParam = 'keysEdit'
            await this.bot.sendMessage(chatId, 'Введите новые ключи')
        },
        'Тема': async (chatId) => {
            this.quoteParam = 'themeEdit'
            await this.bot.sendMessage(chatId, 'Введите новую тему', themeFirstOptions)
        },
        'textEdit': async (messageText, chatId) => {
            this.#quote.text = messageText
            this.quoteParam = null
            await this.bot.sendMessage(chatId, 'Выберите действие', quoteParameters)
        },
        'themeEdit': async (messageText, chatId) => {
            this.#quote.theme = messageText
            this.quoteParam = null
            await this.bot.sendMessage(chatId, 'Выберите действие', quoteParameters)
        },
        'keysEdit': async (messageText, chatId) => {
            this.#quote.keys = messageText.split(' ')
            this.quoteParam = null
            await this.bot.sendMessage(chatId, 'Выберите действие', quoteParameters)
        },
        'Отправить': async (chatId) => {
            if (this.operation === 'adding' && (!this.#quote.text || !this.#quote.theme)) {
                await this.bot.sendMessage(chatId, 'Тема и текст должны быть обяательно добавлены')
            } else {
                await this.sendQuote(chatId)
                await this.bot.sendMessage(chatId, 'Изменена')
            }
        }
    }
    async addQuote(messageText, chatId) {
        try {
            if (this.quoteParam) {
                await this.editMetods[this.quoteParam](messageText, chatId)
            } else {
                console.log('messageText')
                console.log(messageText)
                await this.editMetods[messageText](chatId)
            }
        } catch (e) {
            console.log(e.message)
            console.log(messageText)
            await this.bot.sendMessage(chatId, 'Ошибка')
        }
    }

    async getQuote(messageText, chatId) {
        const quote = await quoteService.getQuote(messageText)
        console.log(quote)
        this.operation = null
        await this.bot.sendMessage(chatId, `${quote[0]?.text||'Цитата не найдена'}`)
    }
    async getQuoteByKeys(messageText, chatId) {
        const quote = await quoteService.getQuoteByKeys(messageText)
        console.log(quote)
        this.operation = null
        await this.bot.sendMessage(chatId, `${quote[0]?.text||'Цитата не найдена'}`)
    }
    async viewQuotes(theme, chatId) {
        const quote = await quoteService.getAllQuotes(theme)
        console.log(quote)
        for (let item of quote) {
            await this.bot.sendMessage(chatId, `${item.text} \n${item.id.toString()} \n${item.keys.join(',')}`)
        }
        this.operation = null
        await this.bot.sendMessage(chatId, `Цитаты получены`)
    }

    async editProcess(messageText, chatId) {
        try {
            const butttonMessages = ['Текст', 'Ключи', 'Тема', 'Отправить']
            if (this.quoteParam) {
                await this.editMetods[this.quoteParam](messageText, chatId)
            } else if (butttonMessages.includes(messageText)) {
                await this.editMetods[messageText](chatId)
            } else {
                this.editId = messageText
                await this.bot.sendMessage(chatId, 'Выберите действие', quoteParameters)
            }
        } catch (e) {
            console.log(e.message)
            console.log(messageText)
            await this.bot.sendMessage(chatId, 'Ошибка')
        }
    }
    async sendQuote(chatId) {
        if (this.operation === 'adding') {
            console.log('11111111')
            const quote = await quoteService.addQuote(this.#quote)
        }
        if (this.operation === 'editing') {
            console.log('2222222222')
            const quote = await quoteService.editQuote(this.editId, this.#quote)
        }
        this.operation = null
        this.quoteParam = null
        this.#quote = {}
        this.type = null
    }

    async deleteQuote(id, chatId) {
        const quote = await quoteService.deleteQuote(id)
        console.log(quote)
        this.operation = null
        await this.bot.sendMessage(chatId, `deleted`)
    }
    messageHandler = async (msg) => {

        const messageText = msg.text
        const chatId = msg.chat.id
        console.log(chatId)
        switch (messageText) {
            case '/start':
                await this.bot.sendMessage(chatId, 'Выберите действие', quoteParameters)
                break
            case '/add':
                if (this.admins.includes(msg.from.id)) {
                    this.operation = 'adding'
                    await this.bot.sendMessage(chatId, 'Выберите действие', quoteParameters)
                }
                break
            case '/get':
                this.operation = 'getting'
                await this.bot.sendMessage(chatId, 'Выберите тему', themeFirstOptions)
                break
            case '/getbykey':
                this.operation = 'gettingByKey'
                await this.bot.sendMessage(chatId, 'Введите ключ')
                break
            case '/edit':
                if (this.admins.includes(msg.from.id)) {
                    this.operation = 'editing'
                    await this.bot.sendMessage(chatId, 'Введите id')
                }
                break
            case '/view':
                if (this.admins.includes(msg.from.id)) {
                    this.operation = 'viewing'
                    await this.bot.sendMessage(chatId, 'Выберите тему', themeFirstOptions)
                }
                break
            case '/delete':
                if (this.admins.includes(msg.from.id)) {
                    this.operation = 'deleting'
                    await this.bot.sendMessage(chatId, 'Введите id')
                }
                break
            case 'Еще':
                await this.bot.sendMessage(chatId, 'text', themeLastOptions)
                break
            case 'Назад':
                await this.bot.sendMessage(chatId, 't', themeFirstOptions)
                break
            default:
                switch (this.operation) {
                    case 'deleting':
                        await this.deleteQuote(messageText, chatId)
                        break
                    case 'adding':
                        await this.addQuote(messageText, chatId)
                        break
                    case 'getting':
                        await this.getQuote(messageText, chatId)
                        break
                    case 'gettingByKey':
                        await this.getQuoteByKeys(messageText, chatId)
                        break
                    case 'editing':
                        await this.editProcess(messageText, chatId)
                        break
                    case 'viewing':
                        await this.viewQuotes(messageText, chatId)
                        break
                }
        }
    }
    callbackQueryHandler = async (msg) => {
        const chatId = msg.message.chat.id
        const msgData = msg.data
        console.log(msgData)
        switch (msgData) {
            case 'other':
                this.bot.sendMessage(chatId, 'text', startOptions2)
        }
    }
}



module.exports = new BotHandler()