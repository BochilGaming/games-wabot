let handler = async (m, { conn }) => {
    if (!m.quoted) throw 'where\'s message?'
    if (m.quoted.mtype !== 'viewOnceMessage') throw 'Itu bukan pesan viewOnce'
    const msg = await conn.loadMessage(m.quoted.id)
    if (!msg) throw 'can\'t open message, Maybe bot has ben open that message?'
    await conn.copyNForward(m.chat, msg, false, { readViewOnce: true })
}

handler.help = ['readviewonce']
handler.tags = ['tools']
handler.command = /^readviewonce/i

export default handler