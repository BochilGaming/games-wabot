let handler = async (m, { conn, participants }) => {
  // if (participants.map(v=>v.jid).includes(global.conn.user.jid)) {
    if (!(m.chat in global.DATABASE._data.chats)) return m.reply('Chat ini tidak terdaftar dalam DATABASE!')
    let chat = global.DATABASE._data.chats[m.chat]
    if (chat.isBanned) return m.reply('Chat ini sudah Terbanned!')
    chat.isBanned = true
    conn.sendButton(m.chat, 'Done!', 'games-wabot', 'UNBANCHAT', '.unbanchat')
  // } else m.reply('Ada nomor host disini...')
}
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^banchat$/i
handler.owner = true

module.exports = handler
