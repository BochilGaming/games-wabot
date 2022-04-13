// https://some-random-api.ml/canvas/ ?avatar=
import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'
// @roses_are_rosie < pacar sy

let handler = async (m, { conn, command, usedPrefix}) => {
    if (command == 'komunis') command = 'comrade'
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (!mime) throw `Reply Foto/Kirim foto dengan caption *${usedPrefix + command}*`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
    try {
        let msg = await conn.fakeReply(m.chat, `Proses Kak...`, '0@s.whatsapp.net', command)
        let img = await q.download?.()
        let upld = await uploadImage(img)
        let res = await fetch(`https://some-random-api.ml/canvas/${command}?avatar=${upld}`)
        let fii = await res.buffer()
        conn.sendFile(m.chat, fii, '', 'Sudah jadi kak ```>_<```', m)
        await conn.sendMessage(m.chat, { delete: msg.key })
    } catch (err) {
        let msg = await conn.fakeReply(m.chat, `*ERROR !*`, '0@s.whatsapp.net', command)
    }
}
handler.help = ['wasted', 'glass', 'gay', 'passed', 'jail', 'comrade / komunis']
handler.tags = ['canvas']
handler.command = /^wasted|glaass|gay|passed|jail|comrade|komunis$/i
export default handler


