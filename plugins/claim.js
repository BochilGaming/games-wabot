let handler = async (m, { conn }) => {
    let __timers = (new Date - global.DATABASE._data.users[m.sender].lastclaim)
    let _timers = (43200000 - __timers)
    let timers = clockString(_timers) 
    if (new Date - global.DATABASE._data.users[m.sender].lastclaim > 43200000) {
        conn.reply(m.chat, `Anda sudah mengklaim dan mendapatkan 1000 money dan 1 potion`, m)
        global.DATABASE._data.users[m.sender].money += 1000
        global.DATABASE._data.users[m.sender].potion += 1
        global.DATABASE._data.users[m.sender].lastclaim = new Date * 1
    } else conn.reply(m.chat, `silahkan tunggu *${timers}* lagi untuk bisa mengclaim lagi`, m)
}
handler.help = ['claim']
handler.tags = ['rpg']
handler.command = /^(claim)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.money = 0

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}