/*
BY DAMZZ
COBA COBA AJA NGAB :v
*/
let { MessageType } = require('@adiwajshing/baileys')

let handler  = async (m, { conn, usedPrefix: _p, DevMode }) => {
	let pi = conn.prepareMessageFromContent(m.chat, {
           "listMessage": {
						"title": "MENU KEREN",
						"description": `LIST MENU`,
						"buttonText": "𝐊𝐥𝐢𝐤 𝐃𝐢𝐬𝐢𝐧𝐢 ⌕",
						"listType": "SINGLE_SELECT",
						"sections": [
							{
								"title": "Pilih salah satu kak",
								"rows": [
									{
										"title": ".menu",
										"rowId": "colong aja kak"
									},
									{
										"title": ".menu2",
										"rowId": "colong aja kak"
									}
								]
							}
						]
					}}, {})
conn.relayWAMessage(pi, {waitForAck: true})
}

handler.help = ['menu2']
handler.tags = ['main']
handler.command = /^(menu2)$/i

handler.fail = null
handler.exp = 2

module.exports = handler
