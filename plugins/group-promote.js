import { areJidsSameUser } from '@adiwajshing/baileys'
let handler = async (m, { conn, participants, text }) => {
    if (!text) throw `Tag Member nya\nContoh: *#promote @frieren*`
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await conn.groupParticipantsUpdate(m.chat, [users], 'promote')
        await m.reply(`Success Promote`)
}
handler.help = ['promote @user']
handler.tags = ['group']
handler.command = /^promote$/i
handler.group = true

handler.admin = true
handler.botAdmin = true

export default handler
