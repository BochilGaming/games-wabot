const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
const { MessageType } = require('@adiwajshing/baileys')
const { exec } = require('child_process')
const { sticker } = require('../lib/sticker')

/*
made with love, by Ariffb
http://wa.me/6283128734012 
jangan lupa install package ffmpeg nya
npm i fluent-ffmpeg
npm i remove.bg
JANGAN DIHAPUS YA, TERIMAKASIH
*/
let handler = async (m, { conn, text, args, usedPrefix }) => {
    try {
        const type = Object.keys(m.message)[0]
        const content = JSON.stringify(m.message)
        const isMedia = (type === 'imageMessage' || type === 'videoMessage')
        const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
        const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
        if ((isMedia && !m.message.videoMessage || isQuotedImage)) {
            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m
            const media = await conn.downloadAndSaveMediaMessage(encmedia)
            const ran = getRandom('.webp')
            await ffmpeg(`./${media}`)
            .input(media)
            .on('start', function (cmd) {
                console.log(`Started : ${cmd}`)
            })
            .on('error', function (e) {
                console.log(`Error : ${e}`)
                fs.unlinkSync(media)
                m.reply('Error!')
            })
            .on('end', function () {
                console.log('Finish')
                buff = fs.readFileSync(ran)
                conn.sendMessage(m.chat, buff, MessageType.sticker, { quoted: m })
                fs.unlinkSync(media)
                fs.unlinkSync(ran)
            })
            .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
            .toFormat('webp')
            .save(ran)
        } else if ((isMedia && m.message.videoMessage.seconds < 11 || isQuotedVideo && m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11)) {
            const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m
            const media = await conn.downloadAndSaveMediaMessage(encmedia)
            const ran = getRandom('.webp')
            await ffmpeg(`./${media}`)
            .inputFormat(media.split('.')[1])
            .on('start', function (cmd) {
                console.log(`Started : ${cmd}`)
            })
            .on('error', function (e) {
                console.log(`Error : ${e}`)
                fs.unlinkSync(media)
                tipe = media.endsWith('.mp4') ? 'video' : 'gif'
                m.reply(`Gagal, pada saat mengkonversi ${tipe} ke stiker, pastikan berdurasi dibawah 10 detik`)
            })
            .on('end', function () {
                console.log('Finish')
                buff = fs.readFileSync(ran)
                conn.sendMessage(m.chat, buff, MessageType.sticker, { quoted: m })
                fs.unlinkSync(media)
                fs.unlinkSync(ran)
            })
            .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
            .toFormat('webp')
            .save(ran)
        } else if ((isMedia && m.message.videoMessage.seconds > 10 || isQuotedVideo && m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds > 10)) {
            m.reply('Videonya kepanjangan')
        } else {
            m.reply('Kirim foto atau videonya, jangan lupa tag/reply')
        }
    } catch (e) {
        console.log(e)
        conn.sendMessage('6281390658325@s.whatsapp.net', 'Sticker error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
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