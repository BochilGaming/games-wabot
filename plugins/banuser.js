let handler = async (m, { conn, args }) => { 
    if (!args || !args[0]) throw 'Siapa yang mau di banned om?'
    let mention = m.mentionedJid[0] || conn.parseMention(args[0]) || (args[0].replace(/[@.+-]/g, '').replace(' ', '') + '@s.whatsapp.net') || ''
    if (!mention) throw 'Tag salah satu lah'
    if (!(mention in global.DATABASE._data.users)) throw 'User tidak terdaftar dalam DATABASE!!'
    let user = global.DATABASE._data.users[mention]
    if (user.Banneduser) throw 'User telah terbanned!!'
    let txt = (args.length > 1 ? args.slice(1).join(' ') : '') || '' 
    user.Banneduser = true 
    user.BannedReason = txt 
    m.reply('Berhasil Banned USER!')
    m.reply('*Kamu dibanned oleh OWNER Atau MODERATOR!!*\n *HUBUNGI* \n' + global.owner.map((v, i) => '*Owner ' + (i + 1) + ':* wa.me/' + v).join('\n') + '\n\n' + global.mods.map((v, i) => '*Moderator ' + (i + 1) + ':* wa.me/' + v).join('\n'), mention)
}

handler.help = ['ban']
handler.tags = ['owner']
handler.command = /^ban(user)?$/i

handler.mods = true 

module.exports = handler