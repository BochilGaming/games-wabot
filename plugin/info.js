let { performance } = require('perf_hooks')
let handler  = async (m, { conn, usedPrefix }) => {
  let _uptime = process.uptime() * 1000
  let uptime = clockString(_uptime) 
  let totalreg = Object.keys(global.DATABASE._data.users).length
  let old = Math.round(performance.now())
  let neww = Math.round(performance.now())
  conn.reply(m.chat, `
╠═〘 METRO BOT 〙 ═
╠➥ *Versi:* Beta 0.8.7
╠➥ *Prefix:* ' ${usedPrefix} '
╠➥ *Menu:* ${usedPrefix}menu
╠➥ *Ping:* ${neww - old} *ms*
╠➥ *Total user:* ${totalreg} *user*
╠➥ *Uptime:* ${uptime}
╠➥ *Status page*: 
║   ➥ metrobot.ddns.net
║
╠═〘 DONASI 〙 ═
╠➥ Gopay: 085713964963
╠➥ Indosat: 085713964963
║
╠═ Request? Wa.me/6281390658325
╠═ officiall Group Metro Bot :
║  ➥https://chat.whatsapp.com/Lb4Emjih98rBiCZiZoS2eM
║
╠═〘 PIRACY METRO BOT 〙 ═
╠➥ *KAMI TIDAK BERTANGGUNG*
║   *JAWAB ATAS PENYALAH*
║   *GUNAAN BOT*
╠➥ *KAMI TIDAK BERTANGGUNG*
║   *JAWAB ATAS KEBOCORAN DATA*
║   *PRIBADI ANDA*
╠➥ *KAMI AKAN MENYIMPAN DATA*
║   *SEPERTI NOMER TELEPON*
║   *ANDA DI DATABASE KAMI*
║ 
║ 
╠═ ©2020-2021 Metro Bot
╠═ Scrip original by Norutomo
╠═〘 METRO BOT 〙 ═
`.trim(), m)
}
handler.help = ['info']
handler.tags = ['about']
handler.command = /^(info|bot|hallo|halo|hi)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}

