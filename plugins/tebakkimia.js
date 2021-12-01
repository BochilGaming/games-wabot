let fetch = require('node-fetch')

let timeout = 120000
let poin = 500
let src
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakkimia = conn.tebakkimia ? conn.tebakkimia : {}
    let id = m.chat
    if (id in conn.tebakkimia) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakkimia[id][0])
        throw false
    }
    if (!src) src = await (await fetch(global.API('https://raw.githubusercontent.com', '/BochilTeam/database/master/games/tebakkimia.json'))).json()
    let json = src[Math.floor(Math.random() * src.length)]
    if (!json) throw json
    let caption = `
Nama unsur dari lambang ${json.lambang} adalah...

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}teki untuk bantuan
Bonus: ${poin} XP
`.trim()
    conn.tebakkimia[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakkimia[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.unsur}*`, conn.tebakkimia[id][0])
            delete conn.tebakkimia[id]
        }, timeout)
    ]
}
handler.help = ['tebakkimia']
handler.tags = ['game']
handler.command = /^tebakkimia/i

module.exports = handler