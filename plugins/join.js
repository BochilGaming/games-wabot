let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text, isMods }) => {
    if (!isMods) {
       for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) m.reply(`*No:* ${m.sender}\n*Link:* ${text}`, jid)
        return m.reply('Sedang di proses oleh owner')
    }
    let [_, code] = text.match(linkRegex) || []
    if (!code) return m.reply('Link invalid')
    let res = await conn.acceptInvite(code)
    m.reply(`Berhasil join grup ${res.gid}`)
}
handler.help = ['join <chat.whatsapp.com>']
handler.tags = ['premium']

handler.command = /^join$/i

module.exports = handler
