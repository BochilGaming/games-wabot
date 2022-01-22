let handler = async (m, { conn, args }) => {
    const bonus = Math.floor(Math.random() * 300)
    if (!args[0]) throw 'Harap masukan pilihan angka yang akan kamu pilih'
    if (!/\d/i.test(args[0])) throw 'Pilih Angka 0 sampai 9 Yang Akan Kamu Pilih!'
    const bot = pickRandom(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
    const isWin = bot == args[0]
    conn.reply(m.chat, `
*「 TEBAK ANGKA 」*
Angka Kamu : ${args[0]}
Angka Bot : ${bot}
Apakah Angkamu Sama Dengan Bot ?
+${isWin ? bonus : 0} XP!
`.trim(), m)
    if (isWin) global.DATABASE.data.users[m.sender].exp += bonus * 1
}
handler.help = ['angka <0-9>']
handler.tags = ['game']
handler.command = /^angka/i

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
