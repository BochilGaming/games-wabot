let handler = async (m, { conn, usedPrefix }) => {
    let id = [m.sender]
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) return conn.sendButton(m.chat, `Tidak ada absen berlangsung!`, 'Frieren', ['Mulai', `${usedPrefix}+absen`], m)
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let absen = conn.absen[id][1]
    let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
    let caption = `
Tanggal: ${date}

${conn.absen[id][2] ? conn.absen[id][2] + '\n' : ''}
╭─「 Daftar Absen 」
│ Total: ${absen.length}
${absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
╰────`.trim()
    await conn.sendButton(m.chat, caption, 'Absen', null, [['Absen', `${usedPrefix}absen`], ['Hapus Absen', `${usedPrefix}-absen`]], m, { mentions: id })
}
handler.help = ['cekabsen']
handler.tags = ['absen']
handler.group = true
handler.command = /^cekabsen$/i

export default handler
