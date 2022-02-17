
import { dare } from '@bochilteam/scraper'
let handler = async (m) => m.reply(await dare())

handler.help = ['dare']
handler.tags = ['quotes', 'fun']
handler.command = /^(dare)$/i

export default handler
