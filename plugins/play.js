let limit = 30
let { MessageType } = require('@adiwajshing/baileys')
let yts = require('yt-search')
const { servers, yta, ytv } = require('../lib/y2mate')
let handler = async (m, { conn, command, text, isPrems, isOwner, DevMode }) => {
  conn.play = conn.play ? conn.play : {}
  if (m.chat in conn.play) throw 'Masih ada yang sedang mencari di youtube\ndi chat ini... tunggu sampai selesai'
  else conn.play[m.chat] = true
  try {
      try {
          if (!text) throw 'Cari apa?'
          let results = await yts(text)
          let vid = results.all.find(video => video.seconds < 3600)
          if (!vid) throw 'Video/Audio Tidak ditemukan'
          let { dl_link, thumb, title, filesize, filesizeF} = await (/2$/.test(command) ? ytv : yta)(vid.url, 'id4')
          let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < filesize
          conn.sendFile(m.chat, thumb, 'thumbnail.jpg', `
*Title:* ${title}
*Filesize:* ${filesizeF}
*Source:* ${vid.url}
*${isLimit ? 'Pakai ': ''}Link:* ${dl_link}
`.trim(), m)
          if (!isLimit) conn.sendFile(m.chat, dl_link, title + '.mp' + (3 + /2$/.test(command)), `
*Title:* ${title}
*Filesize:* ${filesizeF}
*Source:* ${vid.url}
`.trim(), m)
      } catch (e) {
          console.log(e)
          m.reply('error')
          if (DevMode) {
              for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                  conn.sendMessage(jid, 'Play.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
              }
          }
      }
  } finally {
    delete conn.play[m.chat]
  }
}
handler.help = ['play', 'play2'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^play2?$/i

handler.exp = 0
handler.limit = false

module.exports = handler

