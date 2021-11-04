let handler = async (m, { conn, text }) => {
  let user = global.DATABASE.data.users[m.sender]
  user.afk = + new Date
  user.afkReason = text
  await conn.sendButton(m.chat, `${conn.getName(m.sender)} is now AFK ${text ? ': ' + text : 'without reason'}`, 'Games-Wabot', 'DAH SIAP AFK:V', '.', m)
}
handler.help = ['afk [alasan]']
handler.tags = ['main']
handler.command = /^afk$/i

module.exports = handler
