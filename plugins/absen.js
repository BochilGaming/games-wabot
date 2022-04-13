let handler = async (m, { conn, usedPrefix }) => {
    let id = [m.sender]
    let name = await conn.getName(m.sender)
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) return conn.sendButton(m.chat, `Tidak ada absen berlangsung!`, 'Absen', ['Mulai', `${usedPrefix}+absen`])
    let absen = conn.absen[id][1]
    const wasVote = absen.includes(m.sender)
    if (wasVote) throw 'Kamu sudah absen!'
    absen.push(m.sender)
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
    let caption = `
Tanggal: ${date}

${conn.absen[id][2] ? conn.absen[id][2] + '\n' : ''}
╭─「 Daftar Absen 」
│ Total: ${absen.length}
${list}
╰────`.trim()
    await conn.sendButton(m.chat, caption, 'Absen', null, [['Absen', `${usedPrefix}absen`], ['Cek Absen', `${usedPrefix}cekabsen`]], m, { mentions: id })
}
handler.help = ['absen']
handler.tags = ['absen']
handler.group = true
handler.command = /^(absen|hadir|present)$/i

export default handler



