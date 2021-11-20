let confirmation = {}
let handler = async (m, { usedPrefix, command, text }) => {
    let isChat = /chat/gi.test(command)
    let number = isChat ? text ? text.replace(/\s/g, '').replace(/([@+-])/g, '') : m.chat : m.mentionedJid.length ? m.mentionedJid[0] : m.quoted && m.quoted.sender ? m.quoted.sender : text ? text.replace(/\s/g, '').replace(/([@+-])/g, '') : ''
    if (!number) throw `Use format: ${usedPrefix}${command} <jid>
Example: ${usedPrefix}${command} 62xxxxxx
`.trim()
    if (!isChat && !/@s\.whatsapp\.net/i.test(number)) number = number + '@s.whatsapp.net'
    else if (isChat && !/@g\.us/i.test(number)) number = number + '@g.us'
    let db = global.DATABASE._data[isChat ? 'chats' : 'users']
    if (!(number in db)) throw 'Jid not in database!'
    delete db[number]
    m.reply(`Succes delete ${isChat ? 'chat' : 'user'} ${number} from database`)
}
handler.help = ['user', 'chat'].map(v => 'reset' + v + ' <jid>')
handler.tags = ['owner']
handler.command = /^reset(user|chat)(d(atabase|b))?$/i

handler.rowner = true

module.exports = handler
