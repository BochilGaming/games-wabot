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
    const response = await conn.query({
        tag: 'iq',
        attrs: {
            type: 'set',
            xmlns: 'w:g2',
            to: m.chat,
        },
        content: users.map(jid => ({
            tag: 'add',
            attrs: {},
            content: [{ tag: 'participant', attrs: { jid } }]
        }))
    })
    console.log(response)
    // m.reply(`Succes add ${response.map(v => '@' + v.split('@')[0])}`, null, { mentions: response })
    // TO SERVER -> <iq to="6282213162100-1633921576@g.us" type="set" xmlns="w:g2" id="63244.456-598"><add><participant jid="6285713964963@c.us" /></add></iq>
    // FROM SERVER -> <iq from="6282213162100-1633921576@g.us" type="result" id="63244.456-598"><add><participant jid="6285713964963@s.whatsapp.net" error="403"><add_request code="32Ovb3/5p/Ap+2hb" expiration="1646365973" /></participant></add></iq>
}
handler.help = ['add', '+'].map(v => 'o' + v + ' @user')
handler.tags = ['owner']
handler.command = /^(oadd|o\+)$/i

handler.owner = true
handler.group = true
handler.botAdmin = true


export default handler