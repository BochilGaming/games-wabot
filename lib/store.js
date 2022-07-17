// @ts-check

import { readFileSync, writeFileSync, existsSync, promises } from 'fs'
import { join } from 'path'

/** @type {import('@adiwajshing/baileys')} */
// @ts-ignore
const {
    initAuthCreds,
    BufferJSON,
    proto,
    isJidBroadcast,
    isJidGroup,
    WAMessageStubType,
    // @ts-ignore
    useMultiFileAuthState: baileysMultiFileAuthState
} = (await import('@adiwajshing/baileys')).default

const TIME_TO_DATA_STALE = 5 * 60 * 1000

// TODO: better way to do this?
// Sepparate file for each device?
function makeInMemoryStore() {
    /** @type {{ [jid: string]: { id: string, lastfetch?: number, subject?: string, name?: string, isChats?: boolean, isContact?: boolean, presence?: import('@adiwajshing/baileys').PresenceData, metadata?: import('@adiwajshing/baileys').GroupMetadata } & import('@adiwajshing/baileys').Chat & import('@adiwajshing/baileys').Contact }}} */
    let chats = {}
    /** @type {{ [jid: string]: import('@adiwajshing/baileys').proto.IWebMessageInfo[] }} */
    let messages = {}

    function loadMessage(jid, id) {
        // If only 1 param, first param is id
        if (!id && jid) {
            id = jid
            return (Object.entries(messages).filter(([, msgs]) => {
                return msgs.find(msg => msg?.key?.id === id)
            })?.[0]?.[1]?.[0] || null)
        }
        jid = jid?.decodeJid?.()
        if (!(jid in messages)) return null;
        const message = messages[jid].find(m => m.key.id === id)
        return message ? message : null
    }

    /**
     * @param {string} jid 
     * @param {(jid: string) => Promise<import('@adiwajshing/baileys').GroupMetadata> | null} groupMetadata 
     */
    async function fetchGroupMetadata(jid, groupMetadata) {
        // @ts-ignore
        jid = jid?.decodeJid?.()
        if (!isJidGroup(jid)) return
        if (!(jid in chats)) return chats[jid] = { id: jid }
        const isRequiredToUpdate = !chats[jid].metadata || Date.now() - (chats[jid].lastfetch || 0) > TIME_TO_DATA_STALE
        if (isRequiredToUpdate) {
            const metadata = await groupMetadata?.(jid)
            if (metadata) Object.assign(chats[jid], { 
                subject: metadata.subject, 
                lastfetch: Date.now(),
                metadata 
            })
        }
        return chats[jid].metadata
    }

    /** @param {string} id */
    function fetchMessageReceipts(id) {
        const msg = loadMessage(id)
        if (!msg) return null
        return msg.userReceipt
    }

    /**
     * @param {string} jid 
     * @param {(jid: string, type?: 'preview' | 'image', timeoutMs?: number) => Promise<string>} profilePictureUrl 
     */
    async function fetchImageUrl(jid, profilePictureUrl) {
        // @ts-ignore
        jid = jid?.decodeJid?.()
        if (!(jid in chats)) return chats[jid] = { id: jid }
        if (!chats[jid].imgUrl) {
            const url = await profilePictureUrl(jid, 'image').catch(() => './src/avatar_contact.png')
            if (url) chats[jid].imgUrl = url
        }
        return chats[jid].imgUrl
    }

    /** 
     * @param {import('@adiwajshing/baileys').BaileysEventEmitter} ev 
     * @param {{ groupMetadata: (jid: string, minimal?: boolean) => Promise<import('@adiwajshing/baileys').GroupMetadata> | null }} opts
     */
    function bind(ev, opts = { groupMetadata: () => null }) {
        ev.on('chats.set', function store(chatsSet) {
            // const { isLatest } = chatsSet
            // if (isLatest) chats = {}
            for (const chat of chatsSet.chats) {
                // @ts-ignore
                const id = chat.id?.decodeJid?.()
                if (!id) continue
                // @ts-ignore
                if (!(id in chats)) chats[id] = { ...chat, isChats: true, ...(chat.name ? { name: /** @type {String} */ (chat.name) } : {}) }
                if (chat.name) chats[id].name = chat.name
            }
        })

        ev.on('contacts.set', function store(contactsSet) {
            for (const contact of contactsSet.contacts) {
                // @ts-ignore
                const id = contact.id?.decodeJid?.()
                if (!id) continue
                chats[id] = Object.assign(chats[id] || {}, { ...contact, isContact: true })
            }
        })

        ev.on('messages.set', function store(messagesSet) {
            // const { isLatest } = messagesSet
            // if (isLatest) messages = {}
            for (const message of messagesSet.messages) {
                // @ts-ignore
                const jid = message.key.remoteJid?.decodeJid?.()
                if (!jid) continue
                // const id = message.key.id
                if (!jid || isJidBroadcast(jid)) continue
                if (!(jid in messages)) messages[jid] = []
                // const msg = loadMessage(jid, id)
                // if (msg) console.log(`duplicate message ${id} ('message.set')`)
                messages[jid].push(message)
            }
        })

        ev.on('contacts.update', function store(contactsUpdate) {
            for (const contact of contactsUpdate) {
                // @ts-ignore
                const id = contact.id?.decodeJid?.()
                if (!id) continue
                chats[id] = Object.assign(chats[id] || {}, { id, ...contact, isContact: true })
            }
        })

        ev.on('chats.upsert', async function store(chatsUpsert) {
            await Promise.all(chatsUpsert.map(async (chat) => {
                // @ts-ignore
                const id = chat.id?.decodeJid?.()
                if (!id || isJidBroadcast(id)) return
                const isGroup = isJidGroup(id)
                chats[id] = Object.assign(chats[id] || {}, { ...chat, isChats: true })
                if (isGroup && !chats[id].metadata) await fetchGroupMetadata(id, opts.groupMetadata)
            }))
        })

        ev.on('chats.update', function store(chatsUpdate) {
            for (const chat of chatsUpdate) {
                // @ts-ignore
                const id = chat.id?.decodeJid?.()
                if (!id) continue
                if (id in chats && chat.unreadCount) chat.unreadCount += chats[id].unreadCount || 0
                chats[id] = Object.assign(chats[id] || {}, { id, ...chat, isChats: true })
            }
        })

        ev.on('presence.update', function store(presenceUpdate) {
            // @ts-ignore
            const id = presenceUpdate.id?.decodeJid?.()
            if (!id) return
            chats[id] = Object.assign(chats[id] || {}, presenceUpdate)
        })

        ev.on('messages.upsert', function store(messagesUpsert) {
            const { messages: newMessages, type } = messagesUpsert
            switch (type) {
                case 'append':
                case 'notify':
                    for (const msg of newMessages) {
                        // @ts-ignore
                        const jid = msg.key.remoteJid?.decodeJid?.()
                        if (!jid || isJidBroadcast(jid)) continue

                        if (msg.messageStubType == WAMessageStubType.CIPHERTEXT) continue
                        if (!(jid in messages)) messages[jid] = []
                        // const message = loadMessage(jid, msg.key.id)
                        // if (message) console.log(`duplicate message ${msg.key.id} ('messages.upsert')`)
                        messages[jid].push(msg)

                        if (type === 'notify' && !(jid in chats))
                            ev.emit('chats.upsert', [{
                                id: jid,
                                conversationTimestamp: msg.messageTimestamp,
                                unreadCount: 1,
                                name: msg.pushName || msg.verifiedBizName,
                            }])
                    }
                    break
            }
        })

        ev.on('messages.update', function store(messagesUpdate) {
            for (const message of messagesUpdate) {
                // @ts-ignore
                const jid = message.key.remoteJid?.decodeJid?.()
                if (!jid) continue
                const id = message.key.id
                if (!jid || isJidBroadcast(jid)) continue
                if (!(jid in messages)) messages[jid] = []
                const msg = loadMessage(id)
                if (!msg) return // console.log(`missing message ${id} ('messages.update')`)
                // @ts-ignore
                const msgIndex = messages[msg.key.remoteJid].findIndex(m => m.key.id === id)
                messages[jid][msgIndex] = Object.assign(msg, message.update)
            }
        })

        ev.on('groups.update', async function store(groupsUpdate) {
            await Promise.all(groupsUpdate.map(async (group) => {
                // @ts-ignore
                const id = group.id?.decodeJid?.()
                if (!id) return
                const isGroup = isJidGroup(id)
                if (!isGroup) return
                if (!(id in chats)) chats[id] = { id, ...group, isChats: true }
                if (!chats[id].metadata) await fetchGroupMetadata(id, opts.groupMetadata)
                // @ts-ignore
                chats[id].metadata = Object.assign(chats[id].metadata, group)
            }))
        })

        ev.on('group-participants.update', async function store(groupParticipantsUpdate) {
            // @ts-ignore
            const id = groupParticipantsUpdate.id?.decodeJid?.()
            if (!id || !isJidGroup(id)) return
            if (!(id in chats) || !chats[id].metadata) await fetchGroupMetadata(id, opts.groupMetadata)
            const metadata = chats[id].metadata
            if (!metadata) return // console.log(`Try to update group ${id} but metadata not found in 'group-participants.update'`)
            switch (groupParticipantsUpdate.action) {
                case 'add':
                    metadata.participants.push(...groupParticipantsUpdate.participants.map(id => ({ id, admin: null })))
                    break
                case 'demote':
                case 'promote':
                    for (const participant of metadata.participants)
                        if (groupParticipantsUpdate.participants.includes(participant.id))
                            participant.admin = groupParticipantsUpdate.action === 'promote' ? 'admin' : null

                    break
                case 'remove':
                    metadata.participants = metadata.participants.filter(p => !groupParticipantsUpdate.participants.includes(p.id))
                    break
            }
        })

        ev.on('message-receipt.update', function store(messageReceiptUpdate) {
            for (const receipt of messageReceiptUpdate) {
                // @ts-ignore
                const jid = receipt.key.remoteJid?.decodeJid?.()
                if (!jid) continue
                const id = receipt.key.id
                if (!(jid in messages)) messages[jid] = []
                const msg = loadMessage(jid, id)
                if (!msg) return // console.log(`missing message ${id} ('message-receipt.update')`)
                msg.userReceipt = msg.userReceipt || []
                const recp = msg.userReceipt.find(m => m.userJid === receipt.receipt.userJid)
                if (recp) Object.assign(recp, receipt.receipt)
                else msg.userReceipt.push(receipt.receipt)
            }
        })

    }

    function toJSON() {
        return { chats, messages }
    }

    function fromJSON(json) {
        Object.assign(chats, json.chats)
        for (const jid in json.messages)
            messages[jid] = json.messages[jid].map(m => m && proto.WebMessageInfo.fromObject(m)).filter(m => m && m.messageStubType != WAMessageStubType.CIPHERTEXT)

    }

    /** @param {string} path  */
    function writeToFile(path) {
        writeFileSync(path, JSON.stringify(toJSON(), (key, value) => key == 'isChats' ? undefined : value, 2))
    }

    /** @param {string} path  */
    function readFromFile(path) {
        if (existsSync(path)) {
            const result = JSON.parse(readFileSync(path, { encoding: 'utf-8' }))
            fromJSON(result)
        }
    }

    return {
        chats,
        messages,

        loadMessage,
        fetchGroupMetadata,
        fetchMessageReceipts,
        fetchImageUrl,

        bind,
        writeToFile,
        readFromFile
    }
}

function JSONreplacer(key, value) {
    if (value == null) return
    const baileysJSON = BufferJSON.replacer(key, value)
    return baileysJSON
}

/**
 * @typedef {typeof baileysMultiFileAuthState} MultiFileAuthStateStore
 */
/** @type {MultiFileAuthStateStore} */
const useMultiFileAuthState = baileysMultiFileAuthState ||
    /**
     * Re implement useMultiFileAuthState if baileysMultiFileAuthState is undefined
     * @type {MultiFileAuthStateStore}
     */
    async function useMultiFileAuthState(folder) {

        const writeData = (data, file) => {
            return promises.writeFile(join(folder, fixFileName(file)), JSON.stringify(data, JSONreplacer))
        }

        const readData = async (file) => {
            try {
                const data = await promises.readFile(join(folder, fixFileName(file)), { encoding: 'utf-8' })
                return JSON.parse(data, BufferJSON.reviver)
            } catch (error) {
                return null
            }
        }

        const removeData = async (file) => {
            try {
                await promises.unlink(fixFileName(file))
            } catch {

            }
        }

        const folderInfo = await promises.stat(folder).catch(() => { })
        if (folderInfo) {
            if (!folderInfo.isDirectory()) {
                throw new Error(`found something that is not a directory at ${folder}, either delete it or specify a different location`)
            }
        } else {
            await promises.mkdir(folder, { recursive: true })
        }

        const fixFileName = (file) => {
            if (file) {
                return file.replace(/:/g, '-');
            }
            else {
                return file
            }
        }

        const creds = await readData('creds.json') || initAuthCreds()

        return {
            state: {
                creds,
                keys: {
                    // @ts-ignore
                    get: async (type, ids) => {
                        const data = {}
                        await Promise.all(
                            ids.map(
                                async id => {
                                    let value = await readData(`${type}-${id}.json`)
                                    if (type === 'app-state-sync-key') {
                                        value = proto.AppStateSyncKeyData.fromObject(value)
                                    }

                                    data[id] = value
                                }
                            )
                        )

                        return data
                    },
                    set: async (data) => {
                        const tasks = []
                        for (const category in data) {
                            for (const id in data[category]) {
                                const value = data[category][id]
                                const file = `${category}-${id}.json`
                                tasks.push(value ? writeData(value, file) : removeData(file))
                            }
                        }

                        await Promise.all(tasks)
                    }
                }
            },
            saveCreds: () => {
                return writeData(creds, 'creds.json')
            }
        }
    }

export default {
    makeInMemoryStore,
    useMultiFileAuthState
}
