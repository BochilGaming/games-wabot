const { sticker } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text }) => {
  await m.reply('Tunggu...')
  try {
    let stonk = global.API('https://hardianto.xyz', '/api/not-stonk', {
    image: await conn.getProfilePicture(m.sender).catch(_ => 'https://telegra.ph/file/7995e73e508ee011722b0.png'),
    apikey: 'hardianto'})
    let stiker = await sticker(null, stonk, 'Notstonk', global.author)
  conn.sendMessage(m.chat, stiker, MessageType.sticker, {
    quoted: m
  })
  } catch (e) {
  m.reply('Conversion Failed')
  }
}
handler.help = ['notstonk']
handler.tags = ['sticker']
handler.command = /^notstonk$/i

module.exports = handler
