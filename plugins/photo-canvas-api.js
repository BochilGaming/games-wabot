// try
import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'


let handler = async (m, { conn, command, args, usedPrefix, text }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (!mime) throw `Reply Foto/Kirim foto`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
    let msg = await conn.sendMessage(m.chat, {text: "Prosess kak.."}, { quoted: m })
    let img = await q.download?.()
    let upld = await uploadImage(img)
//
    if (/vhs|cyberpunk|memories|flower|smoke|heart|ring|spectrum|painting/i.test(command)) {
        try {
            let img = await fetch(global.API('xcoders', '/api/ephoto/' + command, { url: upld }, 'apikey')).then(a => a.buffer())
            conn.sendFile(m.chat, img, 'tes.jpg', '', m)
        } catch (err) {
            conn.fakeReply(m.chat, `*ERROR !*`, '0@s.whatsapp.net', command)
            conn.sendMessage('6282280781433@s.whatsapp.net', { text: err }, { quoted: m })
        }
    } else if (/wanted|diaryframe/i.test(command)) {
        if (!text) throw `Reply Foto/Kirim foto dengan caption *${usedPrefix + command}* teks1|teks2`
        let [teks1, teks2] = text.split`|`
        try {
            if (/wanted/i.test(command)) command = 'wposter'
            let img = await fetch(global.API('xcoders', '/api/ephoto/'+command, { url: upld, text: teks1, text2: teks2 }, 'apikey')).then(a => a.buffer())
            conn.sendFile(m.chat, img, '', 'Sudah jadi kak ```>_<```', m)
        } catch (err) {
            conn.fakeReply(m.chat, `*ERROR !*`, '0@s.whatsapp.net', command)
            conn.sendMessage('6282280781433@s.whatsapp.net', { text: err }, { quoted: m })
        }
    } else if (/flower|glazing/i.test(command)) {
        if (!text) throw `Reply Foto/Kirim foto dengan caption *${usedPrefix + command}* teks`
        try {
            let img = await fetch(global.API('xcoders', '/api/ephoto/' + command, { url: upld, text: text }, 'apikey')).then(a => a.buffer())
            conn.sendFile(m.chat, img, '', 'Sudah jadi kak ```>_<```', m)
        } catch (err) {
            conn.fakeReply(m.chat, `*ERROR !*`, '0@s.whatsapp.net', command)
            conn.sendMessage('6282280781433@s.whatsapp.net', { text: err }, { quoted: m })
        }
    } else if (/toilet|place|shattered|burning|mirrors|anaglyph|flame|memory|nature|ripped|tearing|exposure|frame/i.test(command)) {
        // /api/photooxy/
        try {
            let img = await fetch(global.API('xcoders', '/api/photooxy/' + command, { url: upld }, 'apikey')).then(a => a.buffer())
            conn.sendFile(m.chat, img, 'tes.jpg', '', m)
        } catch (err) {
            conn.fakeReply(m.chat, `*ERROR !*`, '0@s.whatsapp.net', command)
            conn.sendMessage(global.owner[0]'@s.whatsapp.net', { text: err }, { quoted: m })
        }
    }
    await conn.sendMessage(m.chat, { delete: msg.key })
}
handler.help = [
      'vhs',
      'cyberpunk',
      'memories',
      'flower',
      'smoke',
      'heart',
      'ring',
      'spectrum',
      'wanted',
      'painting',
      'glazing',
      'shattered',
      'burning',
      'place',
      'mirrors',
      'anaglyph',
      'flame',
      'frame',
      'memory',
      'nature',
      'ripped',
      'tearing',
      'exposure',
      'toilet',
      'diaryframe'
]
handler.tags = ['canvas']
handler.command = /^vhs|cyberpunk|memories|flower|smoke|heart|ring|spectrum|wanted|painting|glazing|shattered|burning|place|mirrors|flame|frame|anaglyph|memory|nature|ripped|tearing|exposure|toilet|diaryframe$/i
handler.limit = false

export default handler
