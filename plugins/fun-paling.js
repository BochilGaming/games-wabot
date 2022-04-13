let handler = async (m, { conn, text, participants, usedPrefix }) => {
    if (!text) throw `Example:\n${usedPrefix}paling cantik`
    let member = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    let tagged = member[Math.floor(Math.random() * member.length)]
    let jawab = `Yang paling *${text}* disini adalah @${tagged.replace(/@.+/, '')}`.trim()
    let mentionedJid = [tagged]
    conn.reply(m.chat, jawab, m, { contextInfo: { mentionedJid } })
}
handler.help = ['paling <teks>']
handler.tags = ['fun']
handler.command = /^(paling)$/i
handler.group = true

export default handler
