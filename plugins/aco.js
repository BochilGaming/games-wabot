let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  if (!text) throw 'Textnya apa?'
  let id = m.sender.split('@')[0]
  let res = await fetch(global.API('td', '/ai/aco', { text: text, lang: 'id', id: id }))
  let json = await res.json()
  if (json.status !== true) throw json.message
  m.reply(json.response)
}
handler.help = ['aco'].map(v => v + ' [teks]')
handler.tags = ['fun']
handler.command = /^(aco)$/i

module.exports = handler
