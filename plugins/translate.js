let fetch = require('node-fetch')
let handler = async (m, { args, usedPrefix, command }) => {
    let msg = `Gunakan format ${usedPrefix}${command} [lang] [teks]`
    if (!args || !args[0]) return m.reply(msg)
    let lang = 'en'
    let text = args.join(' ')
    if (args[0].length == 2 && args.length > 0) {
        lang = args[0]
        text = args.slice(1).join(' ')
    }
    let res = await fetch(global.API('bg', '/translate', {
        q: text,
        lang
    }))
    let json = await res.json()
    if (json.status !== true) throw json
    m.reply(`
*${json.result.from.language.iso}:* ${text}
*${lang}:* ${json.result.text}
`.trim())
}
handler.help = ['translate'].map(v => v + ' [lang] [teks]')

handler.tags = ['tools']
handler.command = /^(tr(anslate)?)$/i

module.exports = handler
