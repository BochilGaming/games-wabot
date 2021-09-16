/*
* Fitur Image To Maps
* Bukan fitur virus!!!
* Hanya work di wa ori , wa gb ngebug gambar nya :v
* Creator idhamthoriqbot
* Recode by BochilGaming :)
*/

let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m 
  let mime = (q.msg || q).mimetype || ''
  if (/image|video/.test(mime)) {
    let img = await q.download()
    if (!img) throw 'Foto/Sticker tidak ditemukan'
    conn.sendMessage(m.chat, {degreesLatitude: 25.21465, degreesLongitude: 49.33476, jpegThumbnail: img, Image: img, caption: "DZX NGEBUG:V"}, MessageType.location)
  } else m.reply('Tag foto/videonya!!')
}

handler.help = ['jadilokasi']
handler.tags = ['tools']
handler.command = /^(jadilokasi)$/i

module.exports = handler
