let handler = async (m, { conn, args}) => {
    if (args.length > 0) {
        let mention = args[0].replace(/[@.+-]/g, '').replace(' ', '')
        let ban = (mention + '@s.whatsapp.net')
        let warn = global.DATABASE._data.users[ban].warn
        if (warn < 3) {
            global.DATABASE._data.users[ban].warn += 1
            conn.reply(m.chat, `berhasil Warn`, m)
            m.reply('*Kamu di warn oleh moderator, dan sekarang kamu punya ' + (warn + 1) + '.Ingat Jika kamu mendapat warn 4 kali kamu akan otomatis ke banned*', ban)
        } else if (warn == 3) {
            global.DATABASE._data.users[ban].Banneduser = true
            global.DATABASE._data.users[ban].warn = 0
            conn.reply(m.chat, '*Dia sudah kebanned, karena mendapatkan 4 warn*', m)
             m.reply('*Kamu ke banned karena telah mendapatkan 4 kali warn*', ban)
        }
    } else conn.reply(m.chat, 'Siapa yang mau di Warn om?', m)
}
handler.help = ['warn @mention']
handler.tags = ['owner']
handler.command = /^warn$/i
handler.mods = true

module.exports = handler
