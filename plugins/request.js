let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text }) => {
    conn.req = conn.req ? conn.req : {}
    if (!text) return conn.reply(m.chat, 'Mau request apa an?', m) 
    let name = conn.getName(m.sender)
    let _text = ('*dari:* ' + name + '\n*No:* ' + m.sender.split`@`[0] + '\nRequest:')
    conn.reply(m.chat, 'Pesan Anda sudah terkirim', m)
    conn.req[m.sender] = {
        name,
        text,
        date: new Date * 1
    }
    for (let jid of Object.entries(global.Owner).filter(v => v[1].isReport).map(v => v[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
       m.reply(_text, jid)
       m.reply(text, jid)
    }
}
handler.help = ['request', 'report'].map(v => v + '[teks]')
handler.tags = ['main']
handler.command = /^(re(quest|port)|req|bug)$/i

handler.fail = null

module.exports = handler
