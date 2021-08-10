let { MessageType } = require('@adiwajshing/baileys')

let confirm = {}

async function handler(m, { conn, args, isROwner }) {
    //if (!isROwner) throw 'Dalam perbaikan'
    if (m.sender in confirm) throw 'Kamu masih melakukan judi, tunggu sampai selesai!!'
    try {
        let user = global.DATABASE._data.users[m.sender]
        let count = (args[0] && number(parseInt(args[0])) ? Math.max(parseInt(args[0]), 1) : /all/i.test(args[0]) ? Math.floor(parseInt(user.money)) : 1) * 1
        if ((user.money * 1) < count) return conn.sendMessage(m.chat, button('💵Uang kamu tidak cukup!!', user), MessageType.buttonsMessage, { quoted: m })
        if (!(m.sender in confirm)) {
            confirm[m.sender] = {
                sender: m.sender,
                count,
                timeout: setTimeout(() => (m.reply('timed out'), delete confirm[m.sender]), 60000)
            }
            let txt = '⚠️Warning⚠️\n*Jangan judi karena tidak akan menang, BENERAN!!*\nApakah anda yakin (pikirkan baik-baik) mau melakukan judi (Y/n) (60s Timeout)'
            const buttons = [
                {buttonId: `id1`, buttonText: {displayText: 'y'}, type: 1},
                {buttonId: `id2`, buttonText: {displayText: 'n'}, type: 1}
            ]

            const buttonMessage = {
                contentText: txt,
                footerText: '©games-wabot',
                buttons: buttons,
                headerType: 1
            }
            return conn.sendMessage(m.chat, buttonMessage, MessageType.buttonsMessage, { quoted: m })
        }
    } catch (e) {
        if (m.sender in confirm) {
            let { timeout } = confirm[m.sender]
            clearTimeout(timeout)
            delete confirm[m.sender]
            m.reply('Rejected')
        }
    }
}

handler.before = async m => {
    if (!(m.sender in confirm)) return 
    if (m.isBaileys) return 
    let { timeout, count } = confirm[m.sender]
    let user = global.DATABASE._data.users[m.sender]
    let moneyDulu = user.money * 1
    let txt = (m.msg && m.msg.selectedDisplayText ? m.msg.selectedDisplayText : m.text ? m.text : '').toLowerCase()
    try {
        if (/^y(es|a)?$/i.test(txt)) {
            let Bot = (Math.ceil(Math.random() * 100)) * 1
            let Kamu = (Math.floor(Math.random() * 86)) * 1
            let status = 'Kalah'
            if (Bot < Kamu) {
                user.money += count * 1
                status = 'Menang'
            } else if (Bot > Kamu) {
                user.money -= count * 1
            } else {
                status = 'Seri'
                user.money += (Math.floor(count / 1.5)) * 1
            }
            m.reply(`
Bot roll: *${Bot}*
Kamu roll: *${Kamu}*

Kamu *${status}*, kamu ${status == 'Menang' ? `Mendapatkan *+${count * 2}*` : status == 'Kalah' ? `Kehilangan *-${count * 1}*` : `Mendapatkan *+${Math.floor(count / 1.5)}*`} 💵Money
    `.trim())
            clearTimeout(timeout)
            delete confirm[m.sender]
            return !0
        } else if (/^no?$/i.test(txt)) {
            clearTimeout(timeout)
            delete confirm[m.sender]
            m.reply('Rejected')
            return !0
        }

    } catch (e) {
        clearTimeout(timeout)
        delete confirm[m.sender]
        if (moneyDulu > (user.money * 1)) user.money = moneyDulu * 1
        m.reply('Error saat melakukan judi (Rejected)')
        return !0
    } finally {
        clearTimeout(timeout)
        delete confirm[m.sender]
        return !0
    }
}
  
handler.help = ['judi [jumlah]']
handler.tags = ['rpg']
handler.command = /^(judi)$/i

module.exports = handler

/**
 * Detect if thats number
 * @param {Number} x 
 * @returns Boolean
 */
function number(x = 0) {
    x = parseInt(x)
    return !isNaN(x) && typeof x == 'number'
}

function button(teks, user) {
    let buttons = []
    
    let claim = new Date - user.lastclaim > 86400000
    let monthly = new Date - user.lastmonthly > 2592000000
    let weekly = new Date - user.lastweekly > 604800000
    let adventure = new Date - user.lastadventure > 300000
    let fishing = new Date - user.lastfishing > 300000
    let mining = new Date - user.lastmining > 300000
    let dungeon = new Date - user.lastdungeon > 600000
    console.log({claim, monthly, weekly, adventure, fishing, mining, dungeon})

    if (monthly) buttons.push({buttonId: `id${buttons.length + 1}`, buttonText: {displayText: '/monthly'}, type: 1})
    if (weekly) buttons.push({buttonId: `id${buttons.length + 1}`, buttonText: {displayText: '/weekly'}, type: 1})
    if (claim) buttons.push({buttonId: `id${buttons.length + 1}`, buttonText: {displayText: '/claim'}, type: 1})
    if (adventure) buttons.push({buttonId: `id${buttons.length + 1}`, buttonText: {displayText: '/adventure'}, type: 1})
    if (fishing) buttons.push({buttonId: `id${buttons.length + 1}`, buttonText: {displayText: '/fishing'}, type: 1})
    if (mining) buttons.push({buttonId: `id${buttons.length + 1}`, buttonText: {displayText: '/mining'}, type: 1})
    if (dungeon) buttons.push({buttonId: `id${buttons.length + 1}`, buttonText: {displayText: '/dungeon'}, type: 1})
    if (buttons.length == 0) throw teks
    
    const buttonMessage = {
        contentText: teks,
        footerText: '©games-wabot',
        buttons: buttons,
        headerType: 1
    }
    
    return buttonMessage
}