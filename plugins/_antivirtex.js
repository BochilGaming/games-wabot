//BY ADII:V

let handler = m => m

handler.before = function(m, { text }) {

  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let pushname = conn.getName(who)
  let mentionedJid = [m.sender]
  let name = m.fromMe ? conn.user : conn.contacts[m.sender]
  let users = m.sender

    if (m.text > 5000) {
  this.reply(m.chat, `Virus Text (Virtex) Detected!

User : ${pushname}
${m.key}`, m)
     //this.groupRemove(m.chat, [users])
  }
}
//handler.group = true

module.exports = handler
