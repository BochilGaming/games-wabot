let { performance } = require('perf_hooks')
let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn }) => {
    try {
        let old = performance.now()
        await m.reply('_Testing speed..._')
        let neww = performance.now()
        m.reply(neww - old + 'ms')
    } catch (e) {
        console.log(e)
        m.reply('Error!!')
        conn.sendMessage('6281390658325@s.whatsapp.net', 'Use error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
    }
}
handler.help = ['ping', 'speed']
handler.tags = ['info', 'tools']

handler.command = /^(ping|speed)$/i
module.exports = handler
