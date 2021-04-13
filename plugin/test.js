let handler = async (m, { conn, args, usedPrefix }) => {
    let tt = [m.sender]
    conn.sendMessage(m.chat, tt, m)
}
handler.help = ['']
handler.tags = ['rpg']
handler.command = /^(test)$/i
handler.owner = false
handler.mods = true
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.money = 0

module.exports = handler
