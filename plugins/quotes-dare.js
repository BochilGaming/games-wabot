import { dare } from '@bochilteam/scraper'
let handler = async (m, { conn }) => conn.sendButton(m.chat, await dare(), wm, null, [['Dare', '.dare'], ['Truth', '.truth']], m)

handler.help = ['dare']
handler.tags = ['quotes', 'fun']
handler.command = /^(dare)$/i

export default handler
