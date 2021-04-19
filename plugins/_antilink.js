let handler = m => m

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
handler.before = function (m, { user }) {
  if (m.isBaileys && m.fromMe) return true
  let chat = global.DATABASE.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antiLink && isGroupLink) {
    m.reply((user.isAdmin || user.isSuperAdmin) ? '*Kamu admin, kamu gk bakal dikick*'  : '*Byee, kamu akan di kick!!*')
    if ((user.isAdmin || user.isSuperAdmin)) return true
    conn.groupRemove(m.chat, [m.sender])
  }
  return true
}

module.exports = handler
