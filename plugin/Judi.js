let buatall = 1
let handler = async (m, { conn, args, usedPrefix }) => {
    let judi = global.DATABASE._data.users[m.sender].judi
    let randomaku = `${Math.floor(Math.random() * 101)}`.trim()
    let randomkamu = `${Math.floor(Math.random() * 81)}`.trim()
    let Aku = (randomaku * 1)
    let Kamu = (randomkamu * 1)
    let count = args[0]
    count = count ? /all/i.test(count) ? Math.floor(global.DATABASE._data.users[m.sender].money / buatall) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
    count = Math.max(1, count)
    if (args.length < 1) return conn.reply(m.chat, usedPrefix + 'judi <jumlah>\n ' + usedPrefix + 'judi 1000', m)
    if (global.DATABASE._data.users[m.sender].money >= count * 1) {
        global.DATABASE._data.users[m.sender].money -= count * 1
        await m.reply('*Jangan judi gk bakal menang!!, kalau gk percaya gpp*')
        if (Aku > Kamu) {
            if (Aku > Kamu) {
                if (Aku > Kamu) {
                    conn.reply(m.chat, `aku roll:${Aku}\nKamu roll: ${Kamu}\n\nkamu *Kalah*, kamu kehilangan ${count} Money`.trim(), m)
                }
            }
        }
        if (Aku < Kamu) {
            if (Aku < Kamu) {
                if (Aku < Kamu) {
                    global.DATABASE._data.users[m.sender].money += count * 2
                    conn.reply(m.chat, `aku roll:${Aku}\nKamu roll: ${Kamu}\n\nkamu *Menang*, kamu Mendapatkan ${count * 2} Money`.trim(), m)
                }
            }
        }
    } else conn.reply(m.chat, `uang kamu tidak cukup untuk melakukan judi sebesar ${count} Money`.trim(), m)
}
    
handler.help = ['judi <jumlah>']
handler.tags = ['rpg']
handler.command = /^(judi)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
