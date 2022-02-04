let handler = m => m.reply('waalaikumussalam')

handler.customPrefix = /assalamualaikum|Assalamualaikum/i
handler.command = new RegExp

module.exports = handler
