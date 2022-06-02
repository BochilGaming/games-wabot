import db from '../lib/database.js'

let handler = async (m, { usedPrefix, command }) => {
    let msgs = db.data.msgs
    let split = Object.entries(msgs).map(([nama, isi]) => { return { nama, ...isi } })
    let fltr = split.map(v => '│◦❒ ' + v.nama).join('\n')

    m.reply(`
┌「 LIST PESAN 」
${fltr}
└────
Akses/ambil dengan mengetik namanya
`.trim())
}
handler.help = ['msg'].map(v => 'list' + v)
handler.tags = ['database']
handler.command = /^listmsg$/

export default handler
