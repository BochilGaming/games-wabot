let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { command, text, DevMode }) => {
    try {
        let ter = command[1].toLowerCase()
        let txt = m.quoted ? m.quoted.text ? m.quoted.text : text ? text : m.text : text ? text : m.text
        await m.reply(txt.replace(/[aiueo]/g, ter).replace(/[AIUEO]/g, ter.toUpperCase()))
    } catch (e) {
        console.log(e)
        m.reply('Error!!')
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, 'Hlh.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    }
}

handler.help = [...'aiueo'].map(v => `h${v}l${v}h <teks>`)
handler.tags = ['tools']
handler.command = /^h([aiueo])l\1h/i

module.exports = handler
