// @ts-check
import yargs from 'yargs'
import os from 'os'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { createRequire } from 'module'

const __filename = function filename(pathURL = import.meta.url, rmPrefix = os.platform() !== 'win32') {
    return rmPrefix ?
        /file:\/\/\//.test(pathURL) ?
            fileURLToPath(pathURL) :
            pathURL : /file:\/\/\//.test(pathURL) ?
            pathURL : pathToFileURL(pathURL).href
}

const __dirname = function dirname(pathURL) {
    return path.dirname(__filename(pathURL, true))
}

const __require = function require(dir = import.meta.url) {
    return createRequire(dir)
}

/** @type {(name: string, path: string, query: { [Key: string]: any }, apikeyqueryname: string) => string} */
const API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
/** @type {ReturnType<yargs.Argv['parse']>} */
const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
const prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')



export default {
    __filename,
    __dirname,
    __require,
    API,
    opts,
    prefix
}