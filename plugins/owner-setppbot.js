let handler = async (m, { conn, args }) => {
    let bot = conn.user.jid 
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image/.test(mime)) {
        let img = await q.download()
        if (!img) throw `Foto tidak ditemukan`
        conn.updateProfilePicture(bot, img)
        conn.fakeReply(m.chat, `SUKSES MENGANTI FOTO PROFILE`, '0@s.whatsapp.net', 'PHOTO PROFILE UPDATE')
    }
}
handler.help = ['setpp']
handler.tags = ['owner']
handler.command = /^setpp$/i

handler.owner = true
export default handler
