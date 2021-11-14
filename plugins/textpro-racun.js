const textpro = require("../lib/textpro.js");
const axios = require ("axios")
const { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args}) => {
    let txt = args.join` `
    	  if (!txt) return conn.reply(m.chat, 'harap masukan teksnya!!!', m)
    textpro("https://textpro.me/toxic-text-effect-online-901.html", [`${txt}`])
.then(async (data) => {
let au = `${data}`
console.log(data)
let buf = await getBuffer(data);
conn.reply(m.chat, '_tunggu sebentar. . ._',m)
conn.sendMessage(m.chat, buf, MessageType.image, { quoted: m, caption: 'nihhhh!!!'} )
})
.catch(error => console.log(error));
}
handler.help = ['racun <text>']
handler.tags = ['textpro']
handler.command = /^racun$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
handler.limit = true
handler.exp = 15
module.exports = handler

const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
                    'User-Agent': 'GoogleBot',
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}
