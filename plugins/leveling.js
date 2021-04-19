let handler = m => m
handler.before = m => {
    let tagleveling = [m.sender]
    let level = global.DATABASE._data.users[m.sender].level
    let exp = global.DATABASE._data.users[m.sender].exp
    let str = `Selamat @${m.sender.split`@`[0]} anda sekarang level ${level + 1}`.trim()
    if (global.DATABASE._data.users[m.sender].exp > level * 100) {
       global.DATABASE._data.users[m.sender].level += 1
       global.DATABASE._data.users[m.sender].exp -= level * 100
       conn.reply(m.chat, str, false, {
           contextInfo: {
               mentionedJid: tagleveling
           }
       })
    }
    return true
}
    
 
module.exports = handler
