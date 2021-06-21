let fetch = require('node-fetch')
let handler = async (m, { conn, text, isPrems }) => {
  if (!text) return m.reply('Mau cari gambar apa?')
  let [query,  jumlah] = text.split`|`
  if (isNaN(jumlah)) jumlah = 1
  if ((jumlah * 1) > 30) jumlah = 30
  let res = await fetch(global.API('bg',  '/image', { q: query }))
  let json = await res.json()
  if (json.status !== true) throw json
  if ((jumlah * 1) > 1 && !isPrems) { 
      jumlah = 1
      m.reply('Untuk Jumlah yang lebih banyak anda harus menjadi member *Premium*')
  }
  for (let i = 0; i < jumlah; i++) { 
      try {
          let url = json.result[Math.round(Math.random() * json.result.length)] 
          conn.sendFile(m.chat, url, 'MetroBot-image.jpg', `*Url:* ${url}`.trim(), m)
      } catch (e) {
          console.log(e)
          m.reply('Error in sending image')
      }
  }
}
handler.help = ['image'].map(v => v + ' [gambar] | [jumlah]')
handler.tags = ['internet', 'downloader']
handler.command = /^((g(oogle)?)?im(g|age)2)$/i

module.exports = handler
