let fs = require ('fs')
let path = require('path')
let split = '|'
let handler  = async (m, { conn, text: txt, usedPrefix, command }) => {
let dude = 'emror?'
let [text, ...text2] = txt.replace(dude, '').trimStart().split(split)
  text2 = text2.join(split)
if (!text) throw `Reply foto dengan caption:${usedPrefix + command} Test|Proto`
let ppnya = await conn.getProfilePicture(m.sender)

conn.sendMessage(m.chat, 'Gk bisa ya?:v', 'extendedTextMessage', { thumbnail: ppnya, jpegThumbnail: ppnya, contextInfo : { mentionedJid: m.sender,
    externalAdReply: {
                    title: `${text}`,
                    body: `${text2}`,
                    mediaType: 2,
                    mediaUrl: 'https://youtu.be/5qap5aO4i9A',
                    thumbnailUrl: await conn.getProfilePicture(m.sender)
                }}})



}
handler.help = ['jadiyt teks|teks']
handler.tag = ['tools']
handler.command = ['jadiyt']

module.exports = handler
