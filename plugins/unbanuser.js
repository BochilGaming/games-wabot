let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args, DevMode }) => {
    try {
        if (args.length > 0) {
            let mention = args[0].replace(/[@.+-]/g, '').replace(' ', '')
            let ban = (mention + '@s.whatsapp.net')
            global.DATABASE._data.users[ban].Banneduser = false
            global.DATABASE._data.users[ban].BannedReason = ''
            conn.reply(m.chat, 'Berhasil Unbanned User', m)
        } else conn.reply(m.chat, 'Siapa yang mau di unbanned om?', m)
    } catch (e) {
        console.log(e)
        m.reply('Error!!')
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, 'Use.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    }
}
handler.help = ['unban']
handler.tags = ['owner']
handler.command = /^unban$/i
handler.mods = true

module.exports = handler
