const themeFirstOptions = {
    reply_markup: JSON.stringify({
        keyboard: [
            [{
                text: '#Любовь',
                resize_keyboard: true,
                type: 'love'
            }, {
                text: '#Дружба',
                callback_data: 'friendship',
                resize_keyboard: true,
            }],
            [{
                text: '#Работа',
                resize_keyboard: true,
                callback_data: 'work'
            }, {
                text: 'Еще',
                callback_data: 'other',
                resize_keyboard: true,
            }],

        ],
        resize_keyboard: true,
    })
}
const themeLastOptions = {
    reply_markup: JSON.stringify({
        keyboard: [
            [{
                text: '#Отношения',
                resize_keyboard: true,
                callback_data: 'love'
            }, {
                text: '#Здоровье',
                callback_data: 'friendship',
                resize_keyboard: true,
            }],
            [{
                text: '#Семья',
                resize_keyboard: true,
                callback_data: 'work'
            }, {
                text: 'Назад',
                callback_data: 'other',
                resize_keyboard: true,
            }],

        ],
        resize_keyboard: true,
    })
}

const quoteParameters = {
    reply_markup: JSON.stringify({
        keyboard: [
            [{
                text: 'Текст',
                resize_keyboard: true,
            }, {
                text: 'Тема',
                resize_keyboard: true,
            }, {
                text: 'Ключи',
                resize_keyboard: true,
            }],
            [{
                text: 'Отправить',
                resize_keyboard: true,
            }]

        ],
        resize_keyboard: true,
    })
}

module.exports = {
    themeFirstOptions,
    themeLastOptions,
    quoteParameters
}