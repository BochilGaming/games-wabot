let util = require('util')
let path = require('path')
let { spawn } = require('child_process')

// Font By MFarelS:V
let handler  = async (m, { conn, args }) => {
    conn.sendMessage(m.chat, 'Fitur ini dinonaktifkan', m)
}
handler.help = ['n'].map(v => v + 'ulis <teks>')
handler.tags = ['tools']
handler.command = /^nulis$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

// BY MFARELS NJEENK
// https://GitHub.com/MFarelS/
