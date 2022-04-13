let handler = async (m, { conn, usedPrefix, text, isAdmin, isOwner }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    }
    conn.absen = conn.absen ? conn.absen : {}
    let id = [m.sender]
    if (id in conn.absen) return conn.sendButton(m.chat, `Masih ada absen di group ini!`, 'Absen', ['Hapus', `${usedPrefix}hapusabsen`], ['Cek', `${usedPrefix}cekabsen`], conn.absen[id][0])
    conn.absen[id] = [
        await conn.sendButton(m.chat, `Absen dimulai`, 'Absen', ['Absen', `${usedPrefix}absen`]),
        [],
        text
    ]
}
handler.help = ['mulaiabsen [teks]']
handler.tags = ['absen']
handler.group = true
handler.command = /^(start|mulai|\+)absen$/i

export default handler
