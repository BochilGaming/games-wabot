let levelling = require('../lib/levelling')

let handler = m => {
  let user = global.DATABASE.data.users[m.sender]
  if (!levelling.canLevelUp(user.level, user.exp, global.multiplier)) {
    let { min, max } = levelling.xpRange(user.level, user.exp, global.multiplier)
    return m.reply(`
Level *${user.level} (${user.exp}/${max})*
Kurang *${min} XP* lagi!
`.trim())
  }
  user.level++
  m.reply(`
Selamat, anda telah naik level!
*${user.level - 1}* -> *${user.level}*
  `.trim())
}

handler.help = ['levelup']
handler.tags = ['rpg']

handler.command = /^levelup$/i

module.exports = handler