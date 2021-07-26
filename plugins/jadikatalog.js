/*
JUST EXPERIMENT
Tqto Nayla
Plug by damzz
*/
let split = '|'
let handler  = async (m, { conn, text }) => {
try{
  let lmao = 'emror?'
  let [text, ...text2] = txt.replace(lmao, '').trimStart().split(split)
  text2 = text2.join(split)
  if (!text) return conn.reply(m.chat, 'Masukan Judul dan Deskripsi nya', m)
	if (!text2) return conn.reply(m.chat, 'Contoh : .jadikatalog SLAYER?|INI BUKAN SELAYER BANG:>', m)
let q = m.quoted ? m.quoted : m 
  let mime = (q.msg || q).mimetype || ''
  if (/image|video/.test(mime)) {
    let img = await q.download()
    if (!img) throw 'Foto/Sticker tidak ditemukan'
let pi = conn.prepareMessageFromContent(m.chat, {
	"productMessage": { "product": { "productImage":{ "mimetype": "image/jpeg", "jpegThumbnail": img }, "title": `${text}`, "description": `${text2}`, "currencyCode": "IDR", "priceAmount": "50000", "retailerId": 'DZX Bot', "productImageCount": 1 }, "businessOwnerJid": `13479805233@s.whatsapp.net`
}}, {})} else m.reply('FOTO NYA MANA OM?')
 conn.relayWAMessage(pi, m)
}
}

handler.help = ['jadikatalog']
handler.tags = ['tools']
handler.command = /^(jadikatalog)$/i
handler.owner = true
handler.fail = null
handler.exp = 2

module.exports = handler
