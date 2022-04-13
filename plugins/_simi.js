// simi
import fetch from 'node-fetch'

export async function before(m) {
    let chat = db.data.chats[m.chat]
    if (chat.simi) {
        if (!m.text) return
        let url = `https://api-sv2.simsimi.net/v2/?text=${m.text}&lc=id&cf=true`
        let res = await fetch(url)
        let json = await res.json()
        let {
            response,
            result
        } = json.messages[0]
        await this.chatRead(m.chat, m.sender, m.id || m.key.id)
        await delay(1000)
        await this.sendPresenceUpdate('composing', m.chat)
        await delay(2000)
        m.reply(response)
        return !0
    }
    return !0
}

const delay = time => new Promise(res => setTimeout(res, time))
