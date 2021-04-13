let { MessageType } = require('@adiwajshing/baileys')
const util = require('minecraft-server-util')
let handler = async (m, { conn, args, usedPrefix }) => {
    try {
        let type = (args[0] || '').toLowerCase()
        switch (type) {
            case 'bedrock':
                let _data = [args[1], args.length < 3 ? 19132 : args[2] == /([1-9])/i ? args[2] : 19132]
                let _port = (_data[1] * 1)
                util.statusBedrock(_data[0], { port: `${_port * 1}` })
                    .then((response) => {
                        console.log(response)
                        m.reply(`*Info Server Bedrock Edition*\n\nip/host: *${response.host}*\nPort: *${response.port}*\nVersion: *${response.version}*\nProtocol Version: *${response.protocolVersion}*\nGamemode: *${response.gameMode}*\nOnline Player: *${response.onlinePlayers}*\nMax Player: *${response.maxPlayers}*\nMotd: *${response.motdLine1.descriptionText}*`)
                    })
                    .catch((error) => {
                        conn.sendMessage('6281390658325@s.whatsapp.net', 'Server_Minecraft error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + error + '*', MessageType.text)
                        console.error(error)
                        m.reply(`Server *${_data[0]} : ${_data[1]}* Offline`)
                    })
                    break
                case 'java':
                    util.status(args[1]) // port is default 25565
                    .then((response) => {
                        console.log(response)
                        m.reply(`*Info Server Java Edition*\n\nip/host: *${response.host}*\nPort: *${response.port}*\nVersion: *${response.version}*\nProtocol Version: *${response.protocolVersion}*\nOnline Player: *${response.onlinePlayers}*\nMax Player: *${response.maxPlayers}*\nMotd: *${response.description.descriptionText}*`)
                    })
                    .catch((error) => {
                        console.error(error)
                        conn.sendMessage('6281390658325@s.whatsapp.net', 'Server_Minecraft error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + error + '*', MessageType.text)
                        m.reply(`Server *${args[1]}* Offline`)
                    })
                    break
                default:
                    return conn.reply(m.chat, `Gunakan format ${usedPrefix}server <bedrock | java> <ip> <port>\ncontoh penggunaan: *${usedPrefix}server bedrock play.nethergames.org 19132*`.trim(), m)
        }
    } catch (e) {
        conn.reply(m.chat, `Gunakan format ${usedPrefix}server <bedrock | java> <ip> <port>\ncontoh penggunaan: *${usedPrefix}server bedrock play.nethergames.org 19132*`.trim(), m)
        console.log(e)
        conn.sendMessage('6281390658325@s.whatsapp.net', 'Server_Minecraft error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
    }
}
    
handler.help = ['server <type> <ip> <port>']
handler.tags = ['internet']
handler.command = /^(server)$/i
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