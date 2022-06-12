import db from '../lib/database.js'

let handler = async (m, { conn, text }) => {
    if (!text) throw 'Siapa yang mau di banned?'
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Tag salah satu lah'
    let users = db.data.users
    users[who].banned = true
    conn.reply(m.chat, `berhasil banned`, m)
}
handler.help = ['ban @user']
handler.tags = ['owner']
handler.command = /^ban$/i
handler.rowner = true

export default handler
