let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
   response = args.join(' ')
  m.reply('Sedang Diproses...')
  let res = await fetch(`https://recoders-area.caliph.repl.co/api/husbu?apikey=FreeApi`)
  let json = await res.json()
  conn.sendFile(m.chat, json.url, 'husbu.jpg', json.name, m, false)
}
handler.help = ['husbu'].map(v => v + ' ')
handler.tags = ['internet']

handler.command = /^(husbu)$/i

module.exports = handler
