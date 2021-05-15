const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')

let handler = async (m, { conn, text, DevMode }) => {
    let stiker = false
    try {
        let [packname, author] = text.split`|`
        if (!packname) packname = global.packname
        if (!author) author = global.author
        let q = m.quoted ? m.quoted : m 
        let mime = (q.msg || q).mimetype || ''
        if (/image|video/.test(mime)) {
            let img = await q.download()
            if (!img) throw 'Foto/Video tidak ditemukan'
            stiker = await sticker(img, false, mime, packname, author)
        } else m.reply('Tag foto/videonya!!')
    } catch (e) {
        console.log(e)
        if (DevMode) {
            let file = require.resolve(__filename)
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, file + ' error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    } finally {
        if (stiker) conn.sendMessage(m.chat, stiker, MessageType.sticker, {
            quoted: m
        })
        else return m.reply('Conversasion failed!! ')
    }
}
handler.help = ['wm'].map(v => v + ' packname|author')
handler.tags = ['sticker']
handler.command = /^(wm)$/i

handler.fail = null

module.exports = handler
