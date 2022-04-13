import fetch from 'node-fetch'
let handler = async (m, { conn, command, usedPrefix }) => {
    if (command == 'ilham') command = 'katailham'
    if (command == 'fakboi') command = 'pantunpakboy'
    let name = conn.getName(m.sender)
    try {
        let url = `https://api.akuari.my.id/randomtext/${command}`
        let res = await fetch(url).then(a => a.json())
        conn.sendButton(m.chat, `“${res.hasil.result}”`, name, ['Lagi', `${usedPrefix + command}`], m)
    } catch (err) {
        conn.fakeReply(m.chat, `*ERROR !*`, '0@s.whatsapp.net', command)
    }
}
handler.help = ['fakboi', 'ilham', 'bacot', 'sindiran']
handler.tags = ['quotes']
handler.command = /^fakboi|ilham|bacot|sindiran|$/i

export default handler
