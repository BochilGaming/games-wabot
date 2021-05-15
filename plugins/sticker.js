const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')

let handler = async (m, { conn, args, DevMode }) => {
    let stiker = false
    try {
        let q = m.quoted ? m.quoted : m 
        let mime = (q.msg || q).mimetype || ''
        if (/image|video/.test(mime)) {
            let img = await q.download()
            if (!img) throw 'Foto/Video tidak ditemukan'
            stiker = await sticker(img, false, mime,  global.packname, global.author)
        } else if (args[0]) stiker = await sticker(false, args[0], false, global.packname, global.author)
        else m.reply('Tag foto/videonya!!')
    } catch (e) {
        console.log(e)
        m.reply('Conversasion failed!!')
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
    }
}
handler.help = ['stiker (caption|reply media)', 'sgif (caption|reply media)']
handler.tags = ['sticker']
handler.command = /^(s(tic?ker)?(gif)?)$/i

handler.fail = null

module.exports = handler
