// TODO: fix jadibot

import Connection from '../lib/connection.js'
import Store from '../lib/store.js'
import qrcode from 'qrcode'
import ws from 'ws'

const { DisconnectReason } = await import('@adiwajshing/baileys')

let handler = async (m, { conn: _conn, args, usedPrefix, command, isOwner }) => {
    /** @type {import('../lib/connection').Socket} */
    let parent = args[0] && args[0] == 'plz' ? _conn : await Connection.conn
    if (!((args[0] && args[0] == 'plz') || (await Connection.conn).user.jid == _conn.user.jid)) {
        throw 'Tidak bisa membuat bot didalam bot!\n\nhttps://wa.me/' + (await Connection.conn).user.jid.split`@`[0] + '?text=.jadibot'
    }

    const id = Connection.conns.size
    const auth = Store.useMemoryAuthState()
    const store = Store.makeInMemoryStore()
    const conn = await Connection.start(null, {
        isChild: true,
        connectionOptions: { auth: auth.state },
        store
    })
    const logout = async () => {
        await parent.sendMessage(conn.user?.jid || m.chat, { text: 'Koneksi terputus...' })
        try { conn.ws.close() } catch { }
        Connection.conns.delete(id)
    }
    let lastQr, shouldSendLogin, errorCount = 0
    conn.ev.on('connection.update', async ({ qr, isNewLogin, lastDisconnect }) => {
        if (shouldSendLogin && conn.user) {
            await parent.sendMessage(conn.user.jid, { text: 'Berhasil tersambung dengan WhatsApp - mu.\n*NOTE: Ini cuma numpang*\n' + JSON.stringify(conn.user, null, 2) }, { quoted: m })
        }
        if (qr) {
            if (lastQr) lastQr.delete()
            lastQr = await parent.sendFile(m.chat, await qrcode.toDataURL(qr, { scale: 8 }), 'qrcode.png', `
Scan QR ini untuk jadi bot sementara
1. Klik titik tiga di pojok kanan atas
2. Ketuk perangkat tertaut
3. Scan QR ini 

QR akan Expired !
`.trim(), m)
        }
        if (isNewLogin)
            shouldSendLogin = true

        if (lastDisconnect) {
            const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
            if (code && code !== DisconnectReason.loggedOut && conn?.ws.readyState !== ws.CONNECTING) {
                console.log(await Connection.reload(conn, true, { isChild: true }).catch(console.error))
            } else if (code == DisconnectReason.loggedOut)
                logout()
            errorCount++;
        }

        if (errorCount > 5)
            logout()

    })

    Connection.conns.set(id, conn)
}


handler.help = ['jadibot']
handler.tags = ['jadibot']

handler.command = /^jadibot$/i

handler.disabled = true
handler.limit = true

export default handler