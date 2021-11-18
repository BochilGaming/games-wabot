const {
    default: makeWASocket,
    proto,
    downloadContentFromMessage,
    prepareWAMessageMedia
} = require('@adiwajshing/baileys-md')
const { toAudio, toPTT, toVideo } = require('./converter')
const chalk = require('chalk')
const fetch = require('node-fetch')
const FileType = require('file-type')
const PhoneNumber = require('awesome-phonenumber')
let fs = require('fs')

exports.makeWASocket = (args) => {
    let conn = makeWASocket({ ...args })

    if (conn.user && conn.user.id) conn.user.jid = conn.user.id.split(':')[0] + '@s.whatsapp.net'

    conn.logger = {
        ...conn.logger,
        info(...args) { console.log(chalk.bgCyan('INFO '), chalk.cyan(...args)) },
        error(...args) { console.log(chalk.bgRed('ERROR '), chalk.red(...args)) },
        warn(...args) { console.log(chalk.bgYellow('WARNING '), chalk.keyword('orange')(...args)) }
    }

    /**
     * getBuffer hehe
     * @param {String|Buffer} path
     */
    conn.getFile = async (path) => {
        let res
        let data = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (res = await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : typeof path === 'string' ? path : Buffer.alloc(0)
        if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        return {
            res,
            ...type,
            data
        }
    }


    /**
     * waitEvent
     * @param {*} eventName 
     * @param {Boolean} is 
     * @param {Number} maxTries 
     * @returns 
     */
    conn.waitEvent = (eventName, is = () => true, maxTries = 25) => {
        return new Promise((resolve, reject) => {
            let tries = 0
            let on = (...args) => {
                if (++tries > maxTries) reject('Max tries reached')
                else if (is()) {
                    conn.event.off(eventName, on)
                    resolve(...args)
                }
            }
            conn.event.on(eventName, on)
        })
    }

    /**
    * Send Media/File with Automatic Type Specifier
    * @param {String} jid
    * @param {String|Buffer} path
    * @param {String} filename
    * @param {String} caption
    * @param {Object} quoted
    * @param {Boolean} ptt
    * @param {Object} options
    */
    conn.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
        let type = await conn.getFile(path)
        // console.log({ type })
        let { res, data: file } = type
        if (res && res.status !== 200 || file.length <= 65536) {
            try { throw { json: JSON.parse(file.toString()) } }
            catch (e) { if (e.json) throw e.json }
        }
        let opt = { filename, caption }
        if (quoted) opt.quoted = quoted
        if (!type) if (options.asDocument) options.asDocument = true
        let mtype = ''
        if (/webp/.test(type.mime)) mtype = 'sticker'
        else if (/image/.test(type.mime)) mtype = 'image'
        else if (/video/.test(type.mime)) mtype = 'video'
        else if (/audio/.test(type.mime)) {
            file = await (ptt ? toPTT : toAudio)(file, type.ext)
            mtype = 'audio'
        }
        else if (/x-protobuf/.test(type.mime)) mtype = 'history'
        else mtype = 'document'
        return await conn.sendMessage(jid, { [mtype]: file, ...opt, ...options })
    }

    /**
     * Send Contact
     * @param {String} jid 
     * @param {String} number 
     * @param {String} name 
     * @param {Object} quoted 
     * @param {Object} options 
     */
    conn.sendContact = async (jid, number, name, quoted, options) => {
        number = number.replace(/[^0-9]/g, '')
        let njid = number + '@s.whatsapp.net'
        let vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${name.replace(/\n/g, '\\n')}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
END:VCARD
`
        return await conn.sendMessage(jid, {
            contacts: {
                displayName: name,
                contacts: [{ vcard }]
            },
            quoted, ...options
        })
    }

    /**
     * Reply to a message
     * @param {String} jid
     * @param {String|Object} text
     * @param {Object} quoted
     * @param {Object} options
     */
    conn.reply = (jid, text = '', quoted, options) => {
        return Buffer.isBuffer(text) ? this.sendFile(jid, text, 'file', '', quoted, false, options) : conn.sendMessage(jid, { text }, { quoted, ...options })
    }

    /**
     * send Button
     * @param {String} jid 
     * @param {String} contentText 
     * @param {String} footerText 
     * @param {Buffer|String} buffer 
     * @param {String[]} buttons 
     * @param {Object} quoted 
     * @param {Object} options 
     */
    conn.sendButton = async (jid, contentText, footerText, buffer, buttons, quoted, options) => {
        let m = buffer ? await prepareWAMessageMedia({ image: await conn.getFile(buffer) }) : ''
        return await conn.sendMessage(jid, {
            ...(buffer && m ? { caption: contentText || '' } : { text: contentText || '' }),
            footerText,
            buttons: buttons.map(btn => {
                return {
                    buttonId: btn[1] || btn[0] || '',
                    buttonText: {
                        displayText: btn[0] || btn[1] || ''
                    }
                }
            }), // [{ buttonId: 'test-1', buttonText: { displayText: 'no' } }, { buttonId: 'test-2', buttonText: { displayText: 'yes' } }]
            ...(buffer && m ? { ...m } : {})
        }, {
            quoted,
            ...options
        })
    }
    /**
     * Download media message
     * @param {Object} m
     */
    conn.downloadM = async (m, type) => {
        if (!m || !(m.url || m.directPath)) return Buffer.alloc(0)
        const stream = await downloadContentFromMessage(m, type)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        return buffer
    }

    /**
     * Read message
     * @param {String} jid 
     * @param {String|undefined|null} participant 
     * @param {String} messageID 
     */
    conn.chatRead = async (jid, participant, messageID) => {
        return await conn.sendReadReceipt(jid, participant, [messageID])
    }

    /**
     * Get name from jid
     * @param {String} jid
     * @param {Boolean} withoutContact
     */
    conn.getName = (jid, withoutContact = false) => {
        withoutContact = this.withoutContact || withoutContact
        let v
        if (jid.endsWith('@g.us')) {
            v = global.db.data.chats[jid]
            if (!(v.name || v.subject))
                v = new Promise(async (resolve) => {
                    return resolve(await conn.groupMetadata(jid) || {})
                })
            if (v instanceof Promise) return v.then(j => (j.name || j.subject || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')))
            else return v.name || v.subject || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')

        }
        else v = jid === '0@s.whatsapp.net' ? {
            jid,
            vname: 'WhatsApp'
        } : jid === conn.user.jid ?
            conn.user :
            global.db.data.users[jid]
        return (withoutContact ? '' : v.name) || v.subject || v.vname || v.notify || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }

    /**
     * Serialize Message, so it easier to manipulate
     * @param {Object} m
     */
    conn.serializeM = (m) => {
        return exports.smsg(conn, m)
    }

    return conn
}
/**
 * Serialize Message
 * @param {WAConnection} conn 
 * @param {Object} m 
 * @param {Boolean} hasParent 
 */
exports.smsg = (conn, m, hasParent) => {
    if (!m) return m
    let M = proto.WebMessageInfo
    if (m.key) {
        m.id = m.key.id
        m.isBaileys = m.id && m.id.length === 16 || false
        m.chat = m.key.remoteJid || m.msg && m.msg.groupId || ''
        m.fromMe = m.key.fromMe
        m.isGroup = m.chat.endsWith('@g.us')
        m.sender = m.participant || m.key.participant || m.chat || ''
    }
    if (m.message) {
        m.mtype = Object.keys(m.message)[0]
        m.msg = m.message[m.mtype]
        m.text = m.msg.text || m.msg.caption || m.msg.contentText || m.msg || ''
        m.mentionedJid = m.msg && m.msg.contextInfo && m.msg.contextInfo.mentionedJid && m.msg.contextInfo.mentionedJid.length && m.msg.contextInfo.mentionedJid || []
        let quoted = m.quoted = m.msg && m.msg.contextInfo && m.msg.contextInfo.quotedMessage ? m.msg.contextInfo.quotedMessage : null
        if (m.quoted) {
            let type = Object.keys(m.quoted)[0]
            m.quoted = m.quoted[type]
            if (typeof m.quoted === 'string') m.quoted = { text: m.quoted }
            m.quoted.mtype = type
            m.quoted.id = m.msg.contextInfo.stanzaId
            m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat || m.sender
            m.quoted.isBaileys = m.quoted.id && m.quoted.id.length === 16 || false
            m.quoted.sender = m.msg.contextInfo.participant
            m.quoted.fromMe = m.quoted.sender === conn.user.jid
            m.quoted.text = m.quoted.text || m.quoted.caption || ''
            m.quoted.mentionedJid = m.quoted.contextInfo && m.quoted.contextInfo.mentionedJid && m.quoted.contextInfo.mentionedJid.length && m.quoted.contextInfo.mentionedJid || []

            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    fromMe: m.quoted.fromMe,
                    remoteJid: m.quoted.chat,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {})
            })

            if (m.quoted.url || m.quoted.directPath) m.quoted.download = () => conn.downloadM(m.quoted, m.quoted.mtype.toLowerCase().replace(/message/i, ''))

            /**
             * Reply to quoted message
             * @param {String|Object} text
             * @param {String|false} chatId
             * @param {Object} options
             */
            m.quoted.reply = (text, chatId, options) => conn.reply(chatId ? chatId : m.chat, text, vM, options)

            /**
             * Copy quoted message
             */
            m.quoted.copy = () => exports.smsg(conn, M.fromObject(M.toObject(vM)))

            /**
             * Delete quoted message
             */
            m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key })
        }
    }
    m.name = m.pushName

    /**
     * Reply to this message
     * @param {String|Object} text
     * @param {String|false} chatId
     * @param {Object} options
     */
    m.reply = (text, chatId, options) => conn.reply(chatId ? chatId : m.chat, text, m, options)

    /**
     * Delete this message
     */
    m.delete = () => conn.sendMessage(m.chat, { delete: m.key })
    // console.log({ smsg: m.quoted })
    return m
}

exports.logic = (check, inp, out) => {
    if (inp.length !== out.length) throw new Error('Input and Output must have same length')
    for (let i in inp) if (util.isDeepStrictEqual(check, inp[i])) return out[i]
    return null
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright("Update 'lib/simple.js'"))
    delete require.cache[file]
    if (global.reloadHandler) console.log(global.reloadHandler(true))
})