let handler = async (m, { conn, args}) => {
    if (args.length > 0) {
        let mention = args[0].replace(/[@]/g, '')
        let ban = (mention + '@s.whatsapp.net')
        global.DATABASE._data.users[ban].Banneduser = true
    conn.reply(m.chat, `berhasil banned`, m)
    } else conn.reply(m.chat, 'Siapa yang mau di banned om?', m)
}
handler.help = ['ban']
handler.tags = ['owner']
handler.command = /^ban$/i
handler.mods = true

module.exports = handler
