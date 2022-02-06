let handler = async m => m.reply(`
┏━━━━❀「 Donate • Pulse 」❀━━
│ ☆ Paytm [9609900020]
│ ☆ Gpay [9609900020]
┗━━━━━━━━━━━━━━━❀
┏━━━━❀「 contact 」❀━━
│ > if you want to donate? Wa.me/919609900020
╰────
`.trim()) // add yourself if you want
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
