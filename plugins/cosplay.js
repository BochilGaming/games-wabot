// wahai para para weaboo🗿
let fetch = require('node-fetch')
let handler = async (m, { conn }) => {
  conn.sendFile(m.chat, global.API('adiisus', '/api/randomimage/cosplay'), 'cosplay.jpg', '_*Done*_', m)
}
handler.help = ['cosplay']
handler.tags = ['internet']

handler.command = /^(cosplay)$/i

module.exports = handler
