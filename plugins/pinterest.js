let fetch = require('node-fetch')
let handler = async (m, { conn, command, text, usedPrefix, isPrems }) => {
  if (!text) throw `Gunakan format *${usedPrefix}${command} [gambar|jumlah]*
Contoh *${usedPrefix}${command} Minecraft|1*`
  let [query,  jumlah] = text.split`|`
  if (isNaN(jumlah) || (jumlah * 1) < 1) jumlah = 1
  if ((jumlah * 1) > 30) jumlah = 30
  if ((jumlah * 1) > 1 && !isPrems) {
      jumlah = 1
      m.reply('Untuk jumlah yang lebih banyak,  anda harus menjadi member *premium!!*')
  } 
  let res = await fetch(global.API('bg', '/pins', { q: query }))
  let json = await res.json()
  if (json.status !== true) throw json
  for (let i = 0; i < jumlah; i++) {
      try {
         let url = json.result[Math.round(Math.random() * json.result.length)]
         conn.sendFile(m.chat, url,  'MetroBot-pinterest.jpg', `*Url:* ${url}`, m)
      } catch (e) {
          console.log(e)
          m.reply('Error in sending image')
      }
  }
}
handler.help = ['pinterest'].map(v => v + ' [teks]')
handler.tags = ['internet', 'downloader']
handler.command = /^(pinterest)$/i

module.exports = handler

