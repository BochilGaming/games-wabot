let handler = async (m, { conn, args, usedPrefix }) => {
    if (args.length < 3) {
          conn.reply(m.chat, `${usedPrefix}transfer <type> <jumlah> <@tag>\ncontoh penggunaan *${usedPrefix}transfer money 100 @tag*`.trim(), m)
      } else {
          let count = args[1]
          let [ s, b ] = args[2].split`@`
          if (!s) s = ''
          if (!b) b = ''
          let tagg = (b + '@s.whatsapp.net')
          if (args[0] === 'money') {
              global.DATABASE._data.users[tagg].money += count * 1
              conn.reply(m.chat, `Berhasil mentransfer money sebesar ${count}`.trim(), m)
          }
      }
}
    
handler.help = ['give <Args>']
handler.tags = ['rpg']
handler.command = /^(give)$/i
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
