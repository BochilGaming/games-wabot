let handler = m => m

let linkRegex = /(a(su|nj(([ie])ng|([ie])r)?)|me?me?k|ko?nto?l|ba?bi|fu?ck|ta(e|i)k|bangsat|g([iueo])bl([iueo])(k|g)|g ([iueo]) b l ([iueo]) (k|g)|a (n j (i n g|i r)?)s u|col(i|ay)|an?jg|b([ia])ngs([ia])?t|t([iuo])l([iuo])l)/i
handler.before = function (m, { user }) {
  if (m.isBaileys && m.fromMe) return true
  if (/login|continue|flood|(per)?length/g.exec(m.text)) return true
  let chat = global.DATABASE.data.chats[m.chat]
  let isGroupToxic = linkRegex.exec(m.text)

  if (chat.antiToxic && isGroupToxic) {
    m.reply('Do not Toxic yes!!\n' + readMore + '\nwant to Turn off? Type */disable antitoxic*')
    if (global.opts['restrict']) {
      // if (!user.isAdmin) return true
      // this.groupRemove(m.chat, [m.sender])
    }
  }
  return true
}

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
