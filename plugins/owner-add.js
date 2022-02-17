let handler = async (m, { conn, text, participants }) => {
    let _participants = participants.map(user => user.id)
    let users = (await Promise.all(
        text.split(',')
            .map(v => v.replace(/[^0-9]/g, ''))
            .filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
            .map(async v => [
                v,
                await conn.onWhatsApp(v + '@s.whatsapp.net')
            ])
    )).filter(v => v[1][0]?.exists).map(v => v[0] + '@c.us')
    const response = await conn.groupParticipantsUpdate(m.chat, users, 'add')
    m.reply(`Succes add ${response.map(v => '@' + v.split('@')[0])}`, null, { mentions: response })
    // let pp = await conn.getProfilePicture(m.chat).catch(_ => false)
    // let jpegThumbnail = pp ? await (await fetch(pp)).buffer() : false
    // for (let user of response.participants.filter(user => Object.values(user)[0].code == 403)) {
    //     let [[jid, {
    //         invite_code,
    //         invite_code_exp
    //     }]] = Object.entries(user)
    //     let teks = `Mengundang @${jid.split('@')[0]} menggunakan invite...`
    //     m.reply(teks, null, {
    //         contextInfo: {
    //             mentionedJid: conn.parseMention(teks)
    //         }
    //     })
    //     await conn.sendGroupV4Invite(m.chat, jid, invite_code, invite_code_exp, false, 'Invitation to join my WhatsApp group', jpegThumbnail ? {
    //         jpegThumbnail
    //     } : {})
    // }
}
handler.help = ['add', '+'].map(v => 'o' + v + ' @user')
handler.tags = ['owner']
handler.command = /^(oadd|o\+)$/i

handler.owner = true
handler.group = true
handler.botAdmin = true


export default handler