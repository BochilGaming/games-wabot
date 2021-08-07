let handler = (m, { usedPrefix, command }) => {

 m.reply(`
Perintah *${m.text}*
tidak ditemukan di ${usedPrefix}menu
`.trim())
}
handler.command = new RegExp

module.exports = handler
