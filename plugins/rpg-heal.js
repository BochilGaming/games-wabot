import db from '../lib/database.js'

let handler = async (m, { args, usedPrefix }) => {
    let user = db.data.users[m.sender]
    if (user.health >= 100) return m.reply(`
Your ❤️health is full!
`.trim())
    const heal = 40 + (user.cat * 4)
    let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0]) || Math.round((100 - user.health) / heal)))) * 1
    if (user.potion < count) return m.reply(`
Your 🥤Potion is not enough, you only have *${user.potion}* 🥤Potion
type *${usedPrefix}buy potion ${count - user.potion}* to buy 🥤Potion
`.trim())
    user.potion -= count * 1
    user.health += heal * count
    m.reply(`
Successful use of *${count}* 🥤Potion(s)
`.trim())
}

handler.help = ['heal']
handler.tags = ['rpg']
handler.command = /^(heal)$/i

export default handler

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}