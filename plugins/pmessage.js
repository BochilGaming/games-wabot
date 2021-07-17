/*
BY DAMZZ!
HANYA FITUR BIASA
*/
let { MessageType } = require('@adiwajshing/baileys')
let split = '|'
let handler  = async (m, { conn, usedPrefix: _p, DevMode, text: txt }) => {
	let effect = 'emror'
	let [text, ...text2] = txt.replace(effect, '').trimStart().split(split)
  text2 = text2.join(split)
	if (!text) return conn.reply(m.chat, 'Masukan Text nya tod', m)
	if (!text2) return conn.reply(m.chat, 'contoh .pmessage text|text', m)
	let pi = conn.prepareMessageFromContent(m.chat, {
           "listMessage": {
						"title": `${text}`,
						"description": `${text2}`,
						"buttonText": "Click Me!",
						"listType": "SINGLE_SELECT",
						"sections": [
							{
								"title": "Pilih salah satu kak",
								"rows": [
									{
										"title": "YA",
										"rowId": "damz"
									},
									{
										"title": "TIDAK",
										"rowId": "damz"
									},
									{
										"title": `Opsi 3 :v`,
										"rowId": "damz"
									}
								]
							}
						]
					}}, {})
conn.relayWAMessage(pi, {waitForAck: true})
}

handler.help = ['pmessage text1|text2']
handler.tags = ['tools']
handler.command = /^(pmessage)$/i

handler.fail = null
handler.exp = 2

module.exports = handler
