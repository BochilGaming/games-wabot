let handler  = async (m, { conn }) => {
let name = conn.getName(m.sender)
let teks = `
${pickRandom([` _Hey @${m.sender.split`@`[0]}_\n\n_I'm here_`, `_Oeetss @${m.sender.split`@`[0]}_\n\n_What's up??_  `, `_Ekhheemmm, Cough Ughhuk_`, `_Puuuiyy_`, `_Poom_`, `_Hairrr_`, `_Yoossshhhh_`])}
`.trim()
conn.reply(m.chat, teks, m, { contextInfo: { mentionedJid: [m.sender] }})
}
handler.customPrefix = /Bot/
handler.command = new RegExp

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
