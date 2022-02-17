
import { truth } from '@bochilteam/scraper'
let handler = async (m) => m.reply(await truth())

handler.help = ['truth']
handler.tags = ['quotes', 'fun']
handler.command = /^(truth)$/i

export default handler
