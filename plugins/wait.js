// https://github.com/Nobuyaki
// Jangan Hapus link githubnya bang :)
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw `Reply Foto/Kirim Foto Dengan Caption ${usedPrefix}wait`
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
  let img = await q.download()
  await m.reply('Searching Anime Titles...')
  //let image = `data:${mime};base64,${img.toString('base64')}`
  let response = await fetch('https://api.trace.moe/search', {
    method: 'POST',
    body: img,
    headers: {
      'Content-Type': 'image/jpeg'
    },
  })
  let json = await response.json()
  if (!json.result) throw 'Gambar tidak ditemukan!'
  //let { title, episode, similarity, filename, video } = results.result[0]
  //let link = `https://media.trace.moe/video/${json.result[0].anilist}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`
  let hasil = `*Anilist :* ${json.result[0].anilist}\n*File Name :* ${json.result[0].filename}\n*Episode :* ${json.result[0].episode}\n*Kemiripan :* ${(json.result[0].similarity * 100).toFixed(1)}%`
  let vgg = 'video'
  await conn.sendFile(m.chat, json.result[0].image, 'wait.jpg', hasil, m)
  await conn.sendFile(m.chat, json.result[0].video, 'wait.mp4', vgg, m)
}
handler.help = ['wait (caption|reply image)']
handler.tags = ['tools']
handler.command = /^(wait)$/i
handler.premium = false
export default handler
