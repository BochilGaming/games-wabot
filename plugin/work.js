let work = `${Math.floor(Math.random() * 300)}`.trim()
let handler = async (m, { conn }) => {
    if (new Date - global.DATABASE._data.users[m.sender].moneylastclaim > 300000) {
        conn.reply(m.chat, `Kamu telah bekerja dan mendapatkan ${work} money`, m)
        global.DATABASE._data.users[m.sender].money += work * 1
        global.DATABASE._data.users[m.sender].moneylastclaim = new Date * 1
    } else conn.reply(m.chat, 'Anda sudah Bekerja. tunggu nanti', m)
}
handler.help = ['work']
handler.tags = ['money']
handler.command = /^(work)$/i
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