let handler = async (m, { conn, usedPrefix, isAdmin, isOwner }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    }
    let id = [m.sender]
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) return conn.sendButton(m.chat, `Tidak ada absen berlangsung!`, 'Frieren', ['Mulai', `${usedPrefix}+absen`], m)
    delete conn.absen[id]
    m.reply(`Absen berhasil dihapus`)
}
handler.help = ['hapusabsen']
handler.tags = ['absen']
handler.group = true
handler.command = /^(delete|hapus|-)absen$/i

export default handler
