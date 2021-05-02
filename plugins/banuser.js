let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args, DevMode }) => {
    try {
        if (args.length > 0) {
            let mention = args[0].replace(/[@.+-]/g, '').replace(' ', '')
            let txt = (args.length > 1 ? args.slice(1).join(' ') : '')
            let ban = (mention + '@s.whatsapp.net')
            global.DATABASE._data.users[ban].Banneduser = true
            global.DATABASE._data.users[ban].BannedReason = txt
            conn.reply(m.chat, `berhasil banned`, m)
        } else conn.reply(m.chat, 'Siapa yang mau di banned om?', m)
    } catch (e) {
        console.log(e)
        m.reply('Error!!')
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, 'Banuser.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    }
}
handler.help = ['ban']
handler.tags = ['owner']
handler.command = /^ban$/i
handler.mods = true

module.exports = handler
