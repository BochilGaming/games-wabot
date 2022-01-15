let handler = async (m) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    m.reply(`Tersisa ${global.DATABASE._data.users[who].limit} Limit Lagi`)
}
handler.help = ['ceklimit']
handler.tags = ['xp']
handler.command = /^(ceklimit)$/i
module.exports = handler
