let levelling = require('../lib/levelling')
let fetch = require('node-fetch')
let handler = async (m, { conn, usedPrefix }) => {
	
	let { lastadventure, lastclaim, lastweekly, lastmonthly } = global.DATABASE._data.users[m.sender]
	
    let healt = global.DATABASE._data.users[m.sender].healt
    let armor = global.DATABASE._data.users[m.sender].armor 
    let warn = global.DATABASE._data.users[m.sender].warn

    let pet = global.DATABASE._data.users[m.sender].pet
    let kucing = global.DATABASE._data.users[m.sender].kucing
    let _kucing = global.DATABASE._data.users[m.sender].anakkucing
    let rubah = global.DATABASE._data.users[m.sender].rubah
    let _rubah = global.DATABASE._data.users[m.sender].anakrubah
    let kuda = global.DATABASE._data.users[m.sender].kuda
    let _kuda = global.DATABASE._data.users[m.sender].anakkuda
    let diamond = global.DATABASE._data.users[m.sender].diamond
    let potion = global.DATABASE._data.users[m.sender].potion
    let common = global.DATABASE._data.users[m.sender].common
    let makananpet = global.DATABASE._data.users[m.sender].makananpet
    let uncommon = global.DATABASE._data.users[m.sender].uncommon
    let mythic = global.DATABASE._data.users[m.sender].mythic
    let legendary = global.DATABASE._data.users[m.sender].legendary
    let level = global.DATABASE._data.users[m.sender].level
    let money = global.DATABASE._data.users[m.sender].money
    let exp = global.DATABASE._data.users[m.sender].exp
    let limit = global.DATABASE._data.users[m.sender].limit
    let sampah = global.DATABASE._data.users[m.sender].sampah
    let { max } = levelling.xpRange(level, exp, global.multiplier)
    let name = m.fromMe ? conn.user : conn.contacts[m.sender]
    let sortedmoney = Object.entries(global.DATABASE._data.users).sort((a, b) => b[1].money - a[1].money)
    let sortedlevel = Object.entries(global.DATABASE._data.users).sort((a, b) => b[1].level - a[1].level)
    let sorteddiamond = Object.entries(global.DATABASE._data.users).sort((a, b) => b[1].diamond - a[1].diamond)
    let sortedpotion = Object.entries(global.DATABASE._data.users).sort((a, b) => b[1].potion - a[1].potion)
    let sortedsampah = Object.entries(global.DATABASE._data.users).sort((a, b) => b[1].sampah - a[1].sampah)
    let sortedcommon = Object.entries(global.DATABASE._data.users).sort((a, b) => b[1].common - a[1].common)
    let sorteduncommon = Object.entries(global.DATABASE._data.users).sort((a, b) => b[1].uncommon - a[1].uncommon)
    let sortedmythic = Object.entries(global.DATABASE._data.users).sort((a, b) => b[1].mythic - a[1].mythic)
    let sortedlegendary = Object.entries(global.DATABASE._data.users).sort((a, b) => b[1].legendary - a[1].legendary)
    let usersmoney = sortedmoney.map(v => v[0])
    let usersdiamond = sorteddiamond.map(v => v[0])
    let userspotion = sortedpotion.map(v => v[0])
    let userssampah = sortedsampah.map(v => v[0])
    let userslevel = sortedlevel.map(v => v[0])
    let userscommon = sortedcommon.map(v => v[0])
    let usersuncommon = sorteduncommon.map(v => v[0])
    let usersmythic = sortedmythic.map(v => v[0])
    let userslegendary = sortedlegendary.map(v => v[0])
    let pp = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=Inventory'
    let str = `
*—「 🕖 Cooldown 」—*
*Last Adventure :* ${lastadventure > 0 ? '❌' : '✅'}
*Last Claim :* ${lastclaim > 0 ? '❌' : '✅'}
*Last Weekly :* ${lastweekly > 0 ? '❌' : '✅'}
*Last Monthly :* ${lastmonthly > 0 ? '❌' : '✅'}
\n${readMore}
⚠️ *Warn:* ${warn}
⛔ *Banned:* No
`.trim()
    conn.send2Button(m.chat, str, `Inventory`, `.inv`, `Profile`, `.profile`, m)
    conn.reply(str)
}
handler.help = ['cd','cooldown']
handler.tags = ['rpg']
handler.command = /^(cd|cooldown)$/i
module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4201)
