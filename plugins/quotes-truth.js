import { truth } from '@bochilteam/scraper'
let handler = async (m, { conn }) => conn.sendButton(m.chat, await truth(), wm, null, [['Truth', '.truth'], ['Dare', '.dare']], m)

handler.help = ['truth']
handler.tags = ['quotes', 'fun']
handler.command = /^(truth)$/i

export default handler
