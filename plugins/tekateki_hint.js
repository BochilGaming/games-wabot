let handler = async (m, { conn }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (!(id in conn.tekateki)) throw false
    let json = conn.tekateki[id][1]
    m.reply('```' + json.jawaban.toLowerCase().replace(/[bcdfghjklmnpqrstvwxyz]/g, '_') + '```')
}
handler.command = /^hah$/i
handler.limit = true
module.exports = handler  