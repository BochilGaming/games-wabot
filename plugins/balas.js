let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args, text }) => {
    if (!args) return conn.reply(m.chat, 'Lmfao?', m)
    let tex = args.slice(1).join(' ')
    let txt = m.quoted ? m.quoted.text ? m.quoted.text : text ? text : m.text : text ? text : m.text
    let lmfao = args[0]
    let bruh = (lmfao + '@s.whatsapp.net')
    let name = m.fromMe ? conn.user : conn.contacts[m.sender]
    let _text = ('Request: *' + txt + '*\nBalasan: *' + tex + '*\n' + readMore + '\n*Dari Moderator*\nModerator: *' + (name.vnmae || name.notify || name.name) + '*')
    conn.reply(m.chat, 'Pesan Anda sudah terkirim', m)
    conn.sendMessage(bruh, _text, MessageType.text)
}
handler.help = ['balas <teks>?']
handler.tags = ['owner']
handler.command = /^(balas|reply)/i
handler.owner = false
handler.mods = true
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)