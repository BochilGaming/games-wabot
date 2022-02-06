// nyolong sc aowkoaow

let handler = async (m, { conn }) => {
    let id = m.chat
    let mCount = {}
    let totalM = 0
    await conn.loadAllMessages(id, m => {
        let user = m.key.fromMe ? conn.user.jid : m.participant ? m.participant : id.includes('g.us') ? '' : id
        if (!user) return
        if (user in mCount) mCount[user]++
        else mCount[user] = 1
        totalM++
    }, 1000)
    let sorted = Object.entries(mCount).sort((a, b) => b[1] - a[1])
    let message = sorted.map(v => `${v[0].replace(/(\d+)@.+/, '@$1')}: ${v[1]} message`).join('\n')
    m.reply(`${totalM} message last\n${message}`, false, { contextInfo: { mentionedJid: sorted.map(v => v[0]) } })
}
handler.help = ['totalmessage']
handler.tags = ['group']

handler.command = /^totalmessage$/i

module.exports = handler
