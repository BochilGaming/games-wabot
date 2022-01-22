let handler = async (m, { conn, text, participants, usedPrefix }) => {
    if (!text) throw `Example:\n${usedPrefix}paling cantik`
    let member = participants.map(u => u.jid)
    let tagged = member[Math.floor(Math.random() * member.length)]
    let jawab = `Yang paling ${text} disini adalah @${tagged.replace(/@.+/, '')}`.trim()
    let mentionedJid = [tagged]
    conn.reply(m.chat, jawab, m, { contextInfo: { mentionedJid } })
}
handler.help = ['paling <teks>']
handler.tags = ['']
handler.command = /^(paling)$/i

handler.limit = true

module.exports = handler
