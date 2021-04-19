const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
const { MessageType } = require('@adiwajshing/baileys')
const { exec } = require('child_process')
const { sticker } = require('../lib/sticker')

/*
made with love, by Ariffb
http://wa.me/6283128734012 
JANGAN DIHAPUS YA, TERIMAKASIH
*/
let handler = async (m, { conn, text, args, usedPrefix, DevMode }) => {
    try {
        let q = m.quoted ? { message: { [m.quoted.mtype]: m.quoted }} : m  
        let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')
        if (/image/.test(mime)) {
            const img = await conn.downloadAndSaveMediaMessage(q)
            const ran = getRandom('.webp')
            await ffmpeg(`./${img}`)
            .input(img)
            .on('start', function (cmd) {
                console.log(`Started : ${cmd}`)
            })
            .on('error', function (e) {
                console.log(`Error : ${e}`)
                m.reply('Error!')
            })
            .on('end', function () {
                console.log('Finish')
                buff = fs.readFileSync(ran)
                conn.sendMessage(m.chat, buff, MessageType.sticker, { quoted: m })
                fs.unlinkSync(ran)
                fs.unlinkSync(img)
            })
            .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
            .toFormat('webp')
            .save(ran)
        } else if (/video/.test(mime)) {
            const img = await conn.downloadAndSaveMediaMessage(q)
            const ran = getRandom('.webp')
            await ffmpeg(`./${img}`)
            .inputFormat((img.endsWith('.mp4') ? 'mp4' : 'gif'))
            .on('start', function (cmd) {
                console.log(`Started : ${cmd}`)
            })
            .on('error', function (e) {
                console.log(`Error : ${e}`)
                tipe = img.endsWith('.mp4') ? 'video' : 'gif'
                m.reply(`Gagal, pada saat mengkonversi ${tipe} ke stiker, pastikan berdurasi dibawah 10 detik`)
            })
            .on('end', function () {
                console.log('Finish')
                buff = fs.readFileSync(ran)
                conn.sendMessage(m.chat, buff, MessageType.sticker, { quoted: m })
                fs.unlinkSync(ran)
                fs.unlinkSync(img)
            })
            .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
            .toFormat('webp')
            .save(ran)
        } else m.reply('Kirim foto/video atau tag foto/video!!')
    } catch (e) {
        console.log(e)
        m.reply('Error!!')
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, 'Sticker.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    }
}
handler.help = ['stiker (caption|reply media)', 'sgif (caption|reply media)']
handler.tags = ['sticker']
handler.command = /^(s(tic?ker)?(gif)?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`
}