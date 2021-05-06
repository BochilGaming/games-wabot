let handler = m => m

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
handler.before = function (m, { user, bot, groupMetadata }) {
  if (m.isBaileys && m.fromMe) return true
  let chat = global.DATABASE.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antiLink && isGroupLink) {
    m.reply('*Byee, kamu akan di kick!!*')
    if (user.isAdmin || user.isSuperAdmin) return m.reply('*Eh maap kamu admin, kamu gk bakal dikick*')
    let participants = m.isGroup ? groupMetadata.participants : []
    let bot = m.isGroup ? participants.find(u => u.jid == this.user.jid) : {}
    if (bot.isAdmin || bot.isSuperAdmin) {
        let linkGC = this.groupInviteCode(m.chat)
        let isLinkThisGc = new RegExp(linkGC, 'g')
        let isgclink = isLinkThisGc.exec(m.text)
        if (isgclink) { 
             m.reply('*Lol ngirim link group sendiri :v*')
        } else {
             this.groupRemove(m.chat, [m.sender])
        }
    } else m.reply('*Bot bukan admin, mana bisa kick orang _-*')
  }
  return true
}

module.exports = handler
