let handler = async (m, { conn, participants, groupMetadata }) => {
    let pp = './src/avatar_contact.png'
    try {
        pp = await conn.getProfilePicture(m.chat)
    } catch (e) {
    } finally {
        let { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, delete: Delete } = global.DATABASE._data.chats[m.chat]
        const groupAdmins = participants.filter(i => i.isAdmin)
        const groupOwner = groupMetadata.owner || `${m.chat.split`-`[0]}@s.whatsapp.net`
        let listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.split('@')[0]}`).join('\n')
        let text = `*「 Group Information 」*\n
*ID:* 
${groupMetadata.id}
*Name:* 
${groupMetadata.subject}
*Description:* 
${groupMetadata.desc}
*Total Members:*
${participants.length} Members
*Group Owner:* 
@${groupOwner.split('@')[0]}
*Group Admins:*
${listAdmin}
*Group Settings:*
${isBanned ? '✅' : '❌'} Banned
${welcome ? '✅' : '❌'} Welcome
${detect ? '✅' : '❌'} Detect
${Delete ? '❌' : '✅'} Anti Delete
${antiLink ? '✅' : '❌'} Anti Link
*Message Settings:*
Welcome: ${sWelcome}
Bye: ${sBye}
Promote: ${sPromote}
Demote: ${sDemote}
`.trim()
        let mentionedJid = groupAdmins.concat([groupOwner])
        conn.sendFile(m.key.remoteJid, pp, 'pp.jpg', text, m, false, {
            contextInfo: {
                mentionedJid
            }
        })
    }
}
handler.help = ['infogrup']
handler.tags = ['group']
handler.command = /^(gro?upinfo|info(gro?up|gc))$/i

handler.group = true

module.exports = handler
