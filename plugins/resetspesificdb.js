let confirmation = {}
let timeout = 60
let handler = async (m, { usedPrefix, command, conn, text }) => {
    if (m.sender in confirmation) return conn.reply(m.chat, 'Confirm this first', confirmation[m.sender].message)
    let isChat = /chat/gi.test(command)
    let number = isChat ? text ? text.replace(/\s/g, '').replace(/([+-])/g, '') : m.chat : m.mentionedJid.length ? m.mentionedJid[0] : m.quoted && m.quoted.sender ? m.quoted.sender : text ? text.replace(/\s/g, '').replace(/([+-])/g, '') : ''
    if (!number) throw `Use format: ${usedPrefix}${command} <jid>
Example: ${usedPrefix}${command} 62xxxxxx
`.trim()
    if (!isChat && !/@s\.whatsapp\.net/i.test(number)) number = number + '@s.whatsapp.net'
    else if (isChat && !/@g\.us|@s\.whatsapp\.net/i.test(number)) {
        number = number + '@g.us'
        let isGroup = await conn.groupMetadata(number).catch(_ => false)
        if (!isGroup) number = number.replace(/@g\.us/i, '') + '@s.whatsapp.net'
    }
    let db = global.DATABASE._data[isChat ? 'chats' : 'users']
    if (!(number in db)) throw 'Jid not in database!'
    confirmation[m.sender] = {
        id: new Date() * 1, m, isChat, number,
        message: await conn.sendButton(m.chat, `
Are you sure want delete ${isChat ? 'chat' : 'user'} ${number} from database?
Y/N timeout ${timeout}s
`.trim(), '', null, [
            ['Yes'],
            ['No']
        ], m),
        timeout: setTimeout(() => (delete confirmation[m.sender]), timeout * 1000)
    }
}

handler.all = (m) => {
    if (!(m.sender in confirmation)) return !1
    let { m: message, isChat, timeout, number } = confirmation[m.sender]
    if (m.id == message.id) return !1
    if (!m.text) return !1
    let isYes = /y(es)/gi.test(m.text)
    let isNo = /n(o)/gi.test(m.text)
    if (isYes || isNo) {
        if (isYes) {
            global.DATABASE._data[isChat ? 'chats' : 'users'][number] = {}
            m.reply(`Succes delete ${isChat ? 'chat' : 'user'} ${number} from database!`)
        } else m.reply(`Cancel delete ${isChat ? 'chat' : 'user'} ${number} from database!`)
        clearTimeout(timeout)
        delete confirmation[m.sender]
    }
    return
}

handler.help = ['user', 'chat'].map(v => 'reset' + v + ' <jid>')
handler.tags = ['owner']
handler.command = /^reset(user|chat)(d(atabase|b))?$/i

handler.rowner = true

module.exports = handler
