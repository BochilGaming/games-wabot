let handler = async (m, { conn, args }) => {
    if (!args || !args[0]) throw 'Yang mau di Unban siapa?'
    let mention = m.mentionedJid[0] || conn.parseMention(args[0]) || (args[0].replace(/[@.+-]/g, '').replace(' ', '') + '@s.whatsapp.net') || ''
    if (!mention) throw 'Tag salah satu lah'
    if (!(mention in global.DATABASE._data.users)) throw 'User tidak terdaftar dalam DATABASE!!'
    let user = global.DATABASE._data.users[mention]
    if (!user.Banneduser) throw 'User tidak Terbanned!!'
    user.Banneduser = false
    user.BannedReason = ''
    user.warn = 0
    await m.reply('Berhasil unbanned!!')
    m.reply('Kamu telah di Unbanned!!', mention)
}
handler.help = ['unban']
handler.tags = ['owner']
handler.command = /^unban(user)?$/i
handler.mods = true

module.exports = handler
