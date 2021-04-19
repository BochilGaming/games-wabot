let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args, usedPrefix, DevMode }) => {
    if (args.length < 3) {
        return conn.reply(m.chat, `Gunakan format ${usedPrefix}transfer <type> <jumlah> <@tag>\ncontoh penggunaan: *${usedPrefix}transfer money 100 @tag*`.trim(), m)
    } else try {
        let type = (args[0] || '').toLowerCase()
        let count = args[1] && args[1].length > 0 ? Math.min(9999999, Math.max(parseInt(args[1]), 1)) : Math.min(1)
        let who = m.mentionedJid ? m.mentionedJid[0] : (args[2].replace(/[@ .+-]/g, '').replace(' ', '') + '@s.whatsapp.net')
        if(!m.mentionedJid || !args[2]) throw 'Tag salah satu, atau ketik Nomernya!!'
        let users = global.DATABASE._data.users
        switch (type) {
            case 'money':
                if (global.DATABASE._data.users[m.sender].money >= count * 1) {
                    try {
                        global.DATABASE._data.users[m.sender].money -= count * 1
                        global.DATABASE._data.users[who].money += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer money sebesar ${count}`.trim(), m)
                    } catch (e) {
                        global.DATABASE._data.users[m.sender].money += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.sendMessage(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Uang kamu tidak mencukupi untuk mentransfer Money sebesar ${count}`.trim(), m)
                break
            case 'potion':
                if (global.DATABASE._data.users[m.sender].potion >= count * 1) {
                    try {
                        global.DATABASE._data.users[m.sender].potion -= count * 1
                        global.DATABASE._data.users[who].potion += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Potion`.trim(), m)
                    } catch (e) {
                        global.DATABASE._data.users[m.sender].potion += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.sendMessage(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Potion kamu tidak cukup`.trim(), m)
                break
            case 'sampah':
                if (global.DATABASE._data.users[m.sender].sampah >= count * 1) {
                    try {
                        global.DATABASE._data.users[m.sender].sampah -= count * 1
                        global.DATABASE._data.users[who].sampah += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Sampah`.trim(), m)
                    } catch (e) {
                        global.DATABASE._data.users[m.sender].sampah += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.sendMessage(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Sampah kamu tidak cukup`.trim(), m)
                break
            case 'diamond':
                if (global.DATABASE._data.users[m.sender].diamond >= count * 1) {
                    try {
                        global.DATABASE._data.users[m.sender].diamond -= count * 1
                        global.DATABASE._data.users[who].diamond += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Diamond`.trim(), m)
                    } catch (e) {
                        global.DATABASE._data.users[m.sender].diamond += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.sendMessage(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Diamond kamu kamu tidak cukup`.trim(), m)
                break
            case 'common':
                if (global.DATABASE._data.users[m.sender].common >= count * 1) {
                    try {
                        global.DATABASE._data.users[m.sender].common -= count * 1
                        global.DATABASE._data.users[who].common += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Common Crate`.trim(), m)
                    } catch (e) {
                        global.DATABASE._data.users[m.sender].common += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.sendMessage(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Common crate kamu kamu tidak cukup`.trim(), m)
                break
            case 'uncommon':
                if (global.DATABASE._data.users[m.sender].uncommon >= count * 1) {
                    try {
                        global.DATABASE._data.users[m.sender].uncommon -= count * 1
                        global.DATABASE._data.users[who].uncommon += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Uncommon Crate`.trim(), m)
                    } catch (e) {
                        global.DATABASE._data.users[m.sender].uncommon += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.sendMessage(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Uncommon crate kamu kamu tidak cukup`.trim(), m)
                break
            case 'mythic':
                if (global.DATABASE._data.users[m.sender].mythic >= count * 1) {
                    try {
                        global.DATABASE._data.users[m.sender].mythic -= count * 1
                        global.DATABASE._data.users[who].mythic += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Mythic crate`.trim(), m)
                    } catch (e) {
                        global.DATABASE._data.users[m.sender].mythic += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.sendMessage(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Mythic crate kamu kamu tidak cukup`.trim(), m)
                break
            case 'legendary':
                if (global.DATABASE._data.users[m.sender].legendary >= count * 1) {
                    try {
                        global.DATABASE._data.users[m.sender].legendary -= count * 1
                        global.DATABASE._data.users[who].legendary += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Legendary crate`.trim(), m)
                    } catch (e) {
                        global.DATABASE._data.users[m.sender].legendary += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.sendMessage(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Legendary crate kamu kamu tidak cukup`.trim(), m)
                break
            default:
                return conn.reply(m.chat, `Gunakan format ${usedPrefix}transfer <type> <jumlah> <@tag>\ncontoh penggunaan: *${usedPrefix}transfer money 100 @tag*\n\n*List yang bisa di transfer*\nMoney\nPotion\nSampah\nDiamond\nCommon\nUncommon\nMythic\nLegendary`.trim(), m)
        }
    } catch (e) {
        conn.reply(m.chat, `Format yang anda gunakan salah\n\nGunakan format ${usedPrefix}transfer <type> <jumlah> <@tag>\ncontoh penggunaan: *${usedPrefix}transfer money 100 @tag*`.trim(), m)
        console.log(e)
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    }
}
    
handler.help = ['transfer <Args>']
handler.tags = ['rpg']
handler.command = /^(transfer)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.money = 0

module.exports = handler