const { proto } = (await import('@adiwajshing/baileys')).default
import db from '../lib/database.js'

let handler = async (m, { conn, command, usedPrefix, text }) => {
    let M = proto.WebMessageInfo
    if (!m.quoted) throw `Balas pesan dengan perintah *${usedPrefix + command}*`
    if (!text) throw `Pengunaan:${usedPrefix + command} <teks>\n\nContoh:\n${usedPrefix + command} tes`
    let msgs = db.data.msgs
    if (text in msgs) throw `'${text}' telah terdaftar!`
    msgs[text] = M.fromObject(await m.getQuotedObj()).toJSON()
    m.reply(`Berhasil menambahkan pesan '${text}'\n\nAkses dengan mengetik namanya`.trim())
}
handler.help = ['msg'].map(v => 'add' + v + ' <teks>')
handler.tags = ['database']
handler.command = /^addmsg$/

export default handler
