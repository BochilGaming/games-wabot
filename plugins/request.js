let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, 'Mau request apa an?', m) 
    let name = m.fromMe ? conn.user : conn.contacts[m.sender]
    let _text = ('dari *' + (name.vnmae || name.notify || name.name) + '*\nNo: *' + m.sender.split`@`[0] + '*\nRequest:')
    let txt = (text)
    conn.reply(m.chat, 'Pesan Anda sudah terkirim', m)
    for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
       m.reply(_text, jid)
       m.reply(txt, jid)
    }
}
handler.help = ['request <teks>?']
handler.tags = ['main']
handler.command = /^(re(quest|port)|req)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}