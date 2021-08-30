let { Presence, GroupSettingChange } = require('@adiwajshing/baileys')
let handler  = async (m, { conn, args, usedPrefix, command }) => {
	let isClose = { // Switch Case Like :v
		'open': false,
		'close': true,
	}[(args[0] || '')]
	await conn.updatePresence(m.chat, Presence.composing)
	if (isClose === undefined)
		throw `
*Format salah! Contoh :*

  *○ ${usedPrefix + command} close*
  *○ ${usedPrefix + command} open*
`.trim()
	await conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, isClose)
}
handler.help = ['group [open | close]']
handler.tags = ['group']
handler.command = /^(group)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

module.exports = handler
