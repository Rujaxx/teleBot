const { Composer } = require('micro-bot')

const bot = new Composer()

const requestLocationKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [
            [{
                text: "My location",
                request_location: true,
                one_time_keyboard: true
            }],
            ["Cancel"]
        ]
    }

}



// bot.js
bot.start((ctx) => {
    let name = ctx.from.first_name
    ctx.reply(`Hi, ${name} Where do you live?`,requestLocationKeyboard)}
)

bot.command('restart', (ctx) => {
    let name = ctx.from.first_name
    ctx.reply(`Hi, ${name} Where do you live?`,requestLocationKeyboard)}
)


bot.on('location', (ctx) => {
    ctx.reply(`
   How many vaccines shots have been administered to you?`,{
    reply_markup: {
        inline_keyboard: [
            [
                { text: 'one', callback_data: 'one' },
            ],
            [
                { text: 'two', callback_data: 'two' },
            ]
        ]
    }
})
})

bot.on('text', (ctx) => {
    ctx.reply(`
   Choose an option properly`)
})


bot.action('one', ctx => {
    console.log(ctx.from)
    let response = `Do you have any symptons?`;
    ctx.deleteMessage();
    ctx.reply(response, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Yes", callback_data: 'yes' },
                ],
                [
                    { text: "No", callback_data: 'no' },
                ],
            ]
        }
    })
})


bot.action('yes', ctx => {
    console.log(ctx.from)
    let response = `Do you have any symptons?`;
    ctx.deleteMessage();
    ctx.reply(response, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "cough", callback_data: 'cough' },
                ],
                [
                    { text: "fever", callback_data: 'fever' },
                ],
            ]
        }
    })
})

bot.action('fever', ctx => {
    let response = `Take a cosfils if cough increases contact to doctor`;
    ctx.deleteMessage();
    ctx.reply(response)
})

bot.action('cough', ctx => {
    let response = `Take a cosfils if cough increases contact to doctor`;
    ctx.deleteMessage();
    ctx.reply(response)
})

bot.action('two', ctx => {
    let response = `Congrats you are full vaccinated! but fight is not over yet `;
    ctx.deleteMessage();
    ctx.reply(response)
})





// Start bot polling in order to not terminate Node.js application.
module.exports = bot