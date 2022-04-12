// try

import fetch from 'node-fetch'

import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn, command, args, usedPrefix }) => {


//
    let q = m.quoted ? m.quoted : m

    let mime = (q.msg || q).mimetype || q.mediaType || ''

    if (!mime) throw `Reply Foto/Kirim foto`

    if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`

    let msg = await conn.sendMessage(m.chat, {text: "Prosess kak.."}, m)

    let img = await q.download?.()

    let upld = await uploadImage(img)

    try {

        let img = await fetch(global.API('xcoders', '/api/ephoto/' + command, { url: upld }, 'apikey')).then(a => a.buffer())

        conn.sendFile(m.chat, img, 'tes.jpg', 'tes', m)

    } catch (err) {

        m.reply(err)

    }

}
// handler.tags = 
handler.command = /^vhs|cyberpunk$/i

export default handler
