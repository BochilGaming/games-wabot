// ariffb - http:/wa.me/6283128734012
const translate = require('translate-google-api')
const { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { text, usedPrefix, DevMode }) => {
    goblok = `contoh: \n${usedPrefix}tr kode bahasa|teks\n${usedPrefix}tr id|thankyou\n\nBahasa yang didukung: https://cloud.google.com/translate/docs/language`
    if (!text) throw goblok

    let [to, trans] = text.split`|`

    if (!to) throw `Silahkan masukan kode bahasa\ncontoh: \n\n${usedPrefix}tr id|thankyou\n\nBahasa yang didukung: https://cloud.google.com/translate/docs/language`
    if (!trans) throw `Silahkan masukan kalimat yang ingin diterjemahkan\ncontoh: \n\n${usedPrefix}tr id|thankyou`

    try {
        const result = await translate(`${trans}`, {
            tld: "cn",
            to: `${to}`,
        })
        m.reply(`Pesan: ${trans}\n\nTerjemahan: ${result[0]}`)
        console.log(result[0])
    } catch (e) {
        throw goblok
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, 'Translate.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    }

}
handler.help = ['translate'].map(v => v + ' <to>|<teks>')
handler.tags = ['tools']
handler.command = /^(tr(anslate)?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0

module.exports = handler

