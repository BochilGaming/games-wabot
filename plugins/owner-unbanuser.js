import db from '../lib/database.js'

let handler = async (m, { conn, text }) => {
    if (!text) throw 'Siapa yang mau di unbanned?'
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Tag salah satu lah'
    let users = db.data.users
    users[who].banned = false
    conn.reply(m.chat, `berhasil unbanned`, m)
}
handler.help = ['unban @user']
handler.tags = ['owner']
handler.command = /^unban$/i
handler.rowner = true

export default handler
