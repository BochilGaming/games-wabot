const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')
let handler = async (m, { conn, text }) => {
  if (text.length > 7) throw 'Max. 7 huruf!'
  if (!text) text = await conn.getName(m.sender)
  let namaguwe = conn.getName(m.sender) || global.author
  let apiUrl = global.API('hardianto', '/api/bot/gura', {
    nama: text
  }, 'apikey')
try {
    let stiker = await sticker(null, apiUrl, 'Guraa', namaguwe)
    await conn.sendMessage(m.chat, stiker, MessageType.sticker, {
      quoted: m
    })
  } catch (e) {
    m.reply('Conversion to Sticker Failed, Sending as Image Instead')
    await conn.sendFile(m.chat, apiUrl, 'image.png', null, m)
  }
}
handler.help = ['sgura <teks>']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?gura$/i

handler.limit = true

module.exports = handler
