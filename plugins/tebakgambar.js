let fetch = require('node-fetch')

let timeout = 120000
let poin = 1000
let handler  = async (m, { conn, usedPrefix }) => {
    conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
    let id = m.chat
    if (id in conn.tebakgambar) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakgambar[id][0])
        throw false
    }
    let res = await fetch(global.API('bg', '/tebakgambar'))
    let json = await res.json()
    if (json.status !== true) throw json
    let caption = `
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hint untuk hint
Bonus: ${poin} XP
    `.trim()
    conn.tebakgambar[id] = [
      await conn.sendFile(m.chat, json.result.img, 'tebakgambar.jpg', caption, m),
      json, poin,
      setTimeout(() => {
        if (conn.tebakgambar[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.result.jawaban}*`, conn.tebakgambar[id][0])
        delete conn.tebakgambar[id]
      }, timeout)
    ]
  }
  handler.help = ['tebakgambar']
  handler.tags = ['game']
  handler.command = /^tebakgambar/i
  
  module.exports = handler