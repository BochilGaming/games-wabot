import { twisearch, Twibbonizze } from 'twibbonizze'
import * as fs from 'fs'
import { join } from 'path'

let __dirname = global.__dirname(import.meta.url)
let src = join(__dirname, '../src/temp/')
let tesss = join(src, pickRandom()+'.jpg')

let handler = async (m, { conn, text }) => {
    if (!text) throw 'Twibbon apa kak?\nCnth. *#twibbon* badut'
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (!mime) throw `Reply Foto/Kirim foto`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
    let msg = await conn.fakeReply(m.chat, `Proses Kak...`, '0@s.whatsapp.net', text)
    let img = await q.download?.()
    try {
        let tes = await (new Twibbonizze(text)).create(img)
        let trs = await fs.writeFileSync(tesss, tes, { encoding: 'base64'})
        await conn.sendFile(m.chat, await fs.readFileSync(tesss), 'tes.jpg', 'Sudah Jadi kak >_<', m)
        await conn.sendMessage(m.chat, { delete: msg.key })
    } catch (err) {
        await delay(2500)
        conn.fakeReply(m.chat, `FAIL!`, '0@s.whatsapp.net', text)
    }
    try {
        await fs.unlinkSync(tesss)
    } catch (err) {
        await delay(2500)
        conn.fakeReply(m.chat, `TWIBBON Tidak ditemukan`, '0@s.whatsapp.net', text)
    }
//     await fs.unlinkSync(image)
}
handler.help = ["twibbon <twibbon name>"]
handler.tags = ["fun"]
handler.command = /^twibbon|twb/i
export default handler

const delay = time => new Promise(res => setTimeout(res, time))

function pickRandom() {
  return Math.floor(Math.random() * 100) + 10;
}
