// @ts-check
import yargs from 'yargs'
import os from 'os'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { createRequire } from 'module'
import fs from 'fs'

/** @param {ImportMeta | string} pathURL */
const __filename = function filename(pathURL = import.meta, rmPrefix = os.platform() !== 'win32') {
    const path = /** @type {ImportMeta} */ (pathURL).url || /** @type {String} */ (pathURL)
    return rmPrefix ?
        /file:\/\/\//.test(path) ?
            fileURLToPath(path) :
            path : /file:\/\/\//.test(path) ?
            path : pathToFileURL(path).href
}

/** @param {ImportMeta | string} pathURL */
const __dirname = function dirname(pathURL) {
    return path.dirname(__filename(pathURL, true))
}

/** @param {ImportMeta | string} dir */
const __require = function require(dir = import.meta) {
    const path = /** @type {ImportMeta} */ (dir).url || /** @type {String} */ (dir)
    return createRequire(path)
}
/** @param {string} file */
const checkFileExists = (file) => fs.promises.access(file, fs.constants.F_OK).then(() => true).catch(() => false)

/** @type {(name: string, path: string, query: { [Key: string]: any }, apikeyqueryname: string) => string} */
const API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
/** @type {ReturnType<yargs.Argv['parse']>} */
const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
const prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')



export default {
    __filename,
    __dirname,
    __require,
    checkFileExists,
    API,
    opts,
    prefix
}