const { spawn } = require('child_process')
const util = require('util')

let handler  = async (m, { conn }) => {
    conn.sendMessage(m.chat, 'Saat ini fitur di nonaktifkan', m)
}
handler.help = ['toimg (reply)']
handler.tags = ['sticker']
handler.command = /^toimg$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

