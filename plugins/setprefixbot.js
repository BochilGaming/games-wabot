let handler = async(m, { conn, text }) => {

  if (!text) throw `No Prefix detected...`

  global.prefix = new RegExp('^[' + (opts['prefix'] || `${text}`) + ']')
    await m.reply(`Prefix telah ditukar ke *${text}*`)
    // conn.fakeReply(m.chat, 'Prefix telah ditukar ke *${text}*', '0@s.whatsapp.net', 'Set Prefix Bot')
}
handler.help = ['setprefix'].map(v => v + ' [prefix]')
handler.tags = ['owner']
handler.command = /^(setprefix)$/i

handler.rowner = true

module.exports = handler
