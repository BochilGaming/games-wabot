let fetch = require('node-fetch')

let timeout = 120000
let poin = 4999
let handler  = async (m, { conn, usedPrefix }) => {
    conn.caklontong = conn.caklontong ? conn.caklontong : {}
    let id = m.chat
    if (id in conn.caklontong) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.caklontong[id][0])
        throw false
    }
    let res = await fetch(global.API('bg',  '/caklontong'))
    let json = await res.json()
    if (json.status !== true) return m.reply(json)
    conn.caklontong[id] = [
      await conn.reply(m.chat, `Soal: *${json.result.soal}*\nTimeout: *${(timeout / 1000).toFixed(2)} detik*\nKetik *${usedPrefix}hint caklontong* untuk hint\nBonus: ${poin} XP`, m),
      json, poin,
      setTimeout(() => {
        if (conn.caklontong[id]) conn.reply(m.chat, `Waktu habis!\n*${json.result.jawaban}${json.result.deskripsi ? ' (' + json.result.deskripsi + ')' : ''}*`, conn.caklontong[id][0])
        delete conn.caklontong[id]
      }, timeout)
    ]
  }
  handler.help = ['caklontong']
  handler.tags = ['game']
  handler.command = /^caklontong/i
  
  module.exports = handler
