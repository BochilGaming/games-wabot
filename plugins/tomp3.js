let { Presence, Mimetype } = require('@adiwajshing/baileys')
let ffmpeg = require('fluent-ffmpeg');
let fetch = require('node-fetch');
let ftype = require('file-type');
let fs = require('fs');
let { exec } = require('child_process');

let handler = async(m, { conn, text }) => {

   await m.reply('_Sedang mengonversi..._')
   await conn.updatePresence(m.chat, Presence.composing)
	  let type = Object.keys(m.message)[0]
      let isMedia = (type === 'videoMessage')
      let isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
      if (!m.quoted) return conn.reply(m.chat, 'Tag Videonya!', m)
	  if (!isQuotedVideo) return m.reply('Hanya bisa untuk Video!')
	  let encmedia = JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
	     let media = await conn.downloadAndSaveMediaMessage(encmedia)
	     let ran = getRandom('.mp4')
		     exec(`ffmpeg -i ${media} ${ran}`, (err) => {
					fs.unlinkSync(media)
					let buffer = fs.readFileSync(ran)
					conn.sendFile(m.chat, buffer, { mimetype: 'audio/mp4', quoted: m })
                    fs.unlinkSync(ran)
                    })
      m.reply('*Nih Ngab...*')
}
handler.help = ['tomp3 (reply video)']
handler.tags = ['audio']
handler.command = /^tomp3$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0
handler.limit = true

module.exports = handler
