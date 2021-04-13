let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { command, text }) => {
    try {
        let ter = command[1].toLowerCase()
        let txt = m.quoted ? m.quoted.text ? m.quoted.text : text ? text : m.text : text ? text : m.text
        await m.reply(txt.replace(/[aiueo]/g, ter).replace(/[AIUEO]/g, ter.toUpperCase()))
    } catch (e) {
        console.log(e)
        m.reply('Error!!')
        conn.sendMessage('6281390658325@s.whatsapp.net', 'Use error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
    }
}

handler.help = [...'aiueo'].map(v => `h${v}l${v}h <teks>`)
handler.tags = ['tools']
handler.command = /^h([aiueo])l\1h/i

module.exports = handler
