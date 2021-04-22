// Feature by shinz
// tqto shinz
// Pembuat :v : wa.me/6285719854930
// gw cuman remake dikit :v

const imgbb = require('imgbb-uploader')
const fs = require('fs')
const { exec } = require('child_process')
const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, args }) => {
    const content = JSON.stringify(m.message)
    const type = Object.keys(m.message)[0]
    const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
    const isMedia = (type === 'imageMessage' || type === 'videoMessage')
    if ((isMedia && !m.message.videoMessage || isQuotedImage) && args.length == 0) {
        const ger = isQuotedImage ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m
        const owgi = await conn.downloadAndSaveMediaMessage(ger, `./tmp/${Math.floor(Math.random() * 10000)}`)
        const anu = await imgbb("bbd84b1e8f381e888d1bb48a8846637e", owgi)
        const url = `${anu.display_url}`
        let ranp = getRandom('.gif')
        let rano = getRandom('.webp')
        anu1 = `https://some-random-api.ml/canvas/triggered?avatar=${url}`
        exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=40 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
            fs.unlinkSync(ranp)
            if (err) return m.reply('emror..')
            nobg = fs.readFileSync(rano)
            conn.sendMessage(m.chat, nobg, MessageType.sticker, { quoted: m })
            fs.unlinkSync(rano)
            fs.unlinkSync(owgi)
        })
    } else {
        m.reply('pastikan format jpg/png!')
    }
}

handler.help = ['trigger (caption|reply media)']
handler.tags = ['sticker']
handler.command = /^(trigger(ed)?)$/i
handler.limit = true
handler.group = true
module.exports = handler

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}
