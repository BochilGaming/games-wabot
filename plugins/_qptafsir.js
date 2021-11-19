let axios = require("axios");
let handler = async(m, { conn, text }) => {
let [surat, ayat] = text.split('|')
    if (!surat) return conn.reply(m.chat, 'Masukan Nama Surat nya', m)
	if (!ayat) return conn.reply(m.chat, 'Masukan Ayat nya', m)

	axios.get(`https://rest-api-nasabot.herokuapp.com/api/quran?surah=${surat}&ayat=${ayat}&apikey=Nasabot`).then ((res) => {
	 	let hasil = `${res.data.result.data.tafsir.id.long}
( Q.S ${res.data.result.data.surah.name.transliteration.id} : ${res.data.result.data.number.inSurah} )`
 //let before = `${res.data.result.data.audio.primary}`
// let audio = await ${before}.download()
   conn.sendButton(m.chat, hasil, 'DZX', ' ', ' ')
	//conn.sendFile(m.chat, before, 'a.mp4', { ptt:true, duration: 999 })
	})
}
handler.help = ['qaudio surat|ayat']
handler.tags = ['islam']
handler.command = /^qptafsir$/i
module.exports = handler