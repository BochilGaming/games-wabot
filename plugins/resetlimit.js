let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args }) => {
	await conn.updatePresence(m.chat, Presence.composing) 
	let list = Object.entries(global.DATABASE.data.users)
	let lim = !args || !args[0] ? 100 : isNumber(args[0]) ? parseInt(args[0]) : 100
	lim = Math.max(1, lim)
	list.map(([user, data], i) => (Number(data.limit = lim)))
		conn.reply(m.chat, `*berhasil direset ${lim} / user*`, m)
}
handler.help = ['limit'].map(v => 'reset' + v)
handler.tags = ['owner', 'host']
handler.command = /^(resetlimit)$/i

handler.rowner = true

module.exports = handler

function isNumber(x = 0) {
  x = parseInt(x)
  return !isNaN(x) && typeof x == 'number'
}
