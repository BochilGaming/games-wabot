import { areJidsSameUser } from '@adiwajshing/baileys'
let handler = async (m, { conn, participants, text, usedPrefix, command }) => {
    if (!text) throw `Tag Member nya\nContoh: *#promote @frieren*`
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
    if (/promote/i.test(command)) {
	    await conn.groupParticipantsUpdate(m.chat, [users], 'promote')
	    await m.reply(`Success Promote`)
    } else if (/demote/i.test(command)) {
	    await conn.groupParticipantsUpdate(m.chat, [users], 'demote')
	    await m.reply(`Success Demote`)
    }
}
handler.help = ['promote @user', 'demote @user']
handler.tags = ['group']
handler.command = /^promote|demote$/i
handler.group = true

handler.admin = true
handler.botAdmin = true

export default handler
