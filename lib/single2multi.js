import fs from 'fs'
import path from 'path'
import store from './store.js'

/** @type {import('@adiwajshing/baileys')} */
const {
    BufferJSON
} = (await import('@adiwajshing/baileys')).default

/**
 * 
 * @param {string} fileSingle 
 * @param {string} folderMulti
 * @param {Awaited<ReturnType<import('./store').MultiFileAuthStateStore>>} authState
 */
export default async function single2multi(fileSingle, folderMulti, authState) {
    const authSingleResult = JSON.parse(await fs.promises.readFile(fileSingle, 'utf8'), BufferJSON.reviver)
    const authSingleCreds = authSingleResult.creds || {}
    const authSingleKeys = authSingleResult.keys || {}

    const writeData = (data, file) => {
        return fs.promises.writeFile(path.join(folderMulti, store.fixFileName(file)), JSON.stringify(data, store.JSONreplacer))
    }

    const getKeyByValue = (obj, value) => {
        return Object.keys(obj).find(key => obj[key] === value)
    }

    const keys = Object.fromEntries(Object.entries(authSingleKeys).map(([key, value]) => (value && [getKeyByValue(store.KEY_MAP, key), value])).filter(Boolean))

    await Promise.all([
        writeData(authSingleCreds, 'creds.json'),
        authState.state.keys.set(keys),
    ])
}