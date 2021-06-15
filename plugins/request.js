let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text }) => {
    conn.req = conn.req ? conn.req : {}
    if (!text) return conn.reply(m.chat, 'Mau request apa an?', m) 
    let _name = m.fromMe ? conn.user : conn.contacts[m.sender]
    let name = _name.vnmae || _name.notify || _name.name || ('+' + _name.jid.split`@`[0])
    let _text = ('dari *' + name + '*\nNo: *' + m.sender.split`@`[0] + '*\nRequest:')
    let txt = (text)
    conn.reply(m.chat, 'Pesan Anda sudah terkirim', m)
    conn.req[m.sender] = {
        name,
        text,
        date: new Date
    }
    for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
       m.reply(_text, jid)
       m.reply(txt, jid)
    }
}
handler.help = ['request', 'report'].map(v => v + '[teks]')
handler.tags = ['main']
handler.command = /^(re(quest|port)|req|bug)$/i

handler.fail = null

module.exports = handler