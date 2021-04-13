let handler = async (m, { conn, args}) => {
    if (args.length > 0) {
        let mention = args[0].replace(/[@]/g, '')
        let ban = (mention + '@s.whatsapp.net')
        global.DATABASE._data.users[ban].Banneduser = false
    conn.reply(m.chat, 'Berhasil Unbanned User', m)
    } else conn.reply(m.chat, 'Siapa yang mau di unbanned om?', m)
}
handler.help = ['unban']
handler.tags = ['owner']
handler.command = /^unban$/i
handler.mods = true

module.exports = handler
