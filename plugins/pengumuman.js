import { generateWAMessageFromContent } from '@adiwajshing/baileys'
let handler = async (m, { conn, participants }) => {
  let users = participants.map(u => conn.decodeJid(u.jid))
  let q = m.quoted ? m.quoted : m
  let c = m.quoted ? m.quoted : m.msg
  const msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, {
    [c.toJSON ? q.mtype : 'extendedTextMessage']: c.toJSON ? c.toJSON() : {
      text: c || '',
      contextInfo: {
        mentionedJid: [users]
      }
    },
  }, { quoted: m, userJid: conn.user.id }))
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}
handler.help = ['pengumuman', 'announce', 'hidetag'].map(v => v + ' [teks]')
handler.tags = ['group']
handler.command = /^(pengumuman|announce|hiddentag|hidetag)$/i

handler.group = true
handler.admin = true

export default handler

