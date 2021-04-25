let fetch = require('node-fetch')
let handler = async (m, { args }) => {
  if (!args) return m.reply('Mau cari apa?')
  let res = await fetch(`https://zahirr-web.herokuapp.com/api/wikipedia?search=${args[0]}&apikey=zahirgans`)
  let json = await res.json()
  if (json.result.status_code) m.reply(json.result.message + '!!')
  else m.reply('Menurut wikipedia *' + json.result.result + '*')
}
handler.help = ['wikipedia']
handler.tags = ['internet']
handler.command = /^(wiki(pedia)?)$/i

module.exports = handler
