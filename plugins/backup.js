let { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')
let handler  = async (m, { conn, DevMode }) => {
    try {
        let d = new Date
        let date = d.toLocaleDateString('id', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
        })
        await global.DATABASE.save()
        await fs.copyFile(`./database.json`, `./database ${date}.json`, (err) => {
            if (err) {
                console.log(err)
                if (DevMode) {
                    for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                        conn.sendMessage(jid, 'Backup.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
                    }
                }
            } else {
                 m.reply('Berhasil!!')
                 console.log('database.json was copied to database ' + date + '.json')
            }
        })
    } catch (e) {
        console.log(e)
        conn.reply(m.chat, 'Gunaan Format Yang benar', m)
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, 'Backup.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    }
}

handler.help = ['backup']
handler.tags = ['owner']
handler.command = /^(backup)$/i
handler.owner = true

module.exports = handler
