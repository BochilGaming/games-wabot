let handler = async (m, { conn }) => {
  if (!(m.chat in global.DATABASE._data.chats)) return m.reply('Chat ini tidak terdaftar dalam DATABASE!')
  let chat = global.DATABASE._data.chats[m.chat]
  if (!chat.isBanned) return m.reply('Chat ini Tidak Terbanned!!')
  chat.isBanned = false
  m.reply('Done!')
}
handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = /^unbanchat$/i
handler.owner = true

module.exports = handler
