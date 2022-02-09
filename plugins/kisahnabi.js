let fetch = require('node-fetch')
let handler = async(m, { conn, text }) => {
  if (!text) throw `Masukkan nama Nabi!\n\nContoh : #kisahnabi adam`
  let res = await fetch(global.API('LeysCoder', '/api/nabi', { q: text }, 'apikey'))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if(!json.result) throw json
  let { nabi, lahir, umur, tempat, image, kisah } = json.result
let kisahnabi = `
*Nama :* ${nabi}
*Lahir :* ${lahir} SM
*Umur :* ${umur} Tahun
*Tempat :* ${tempat}
*Kisah :* ${kisah}`

  await conn.sendFile(m.chat, image, '', kisahnabi, m)
}
handler.help = ['kisahnabi <nama>']
handler.tags = ['internet']
handler.command = /^(kisahnabi)$/i
module.exports = handler
