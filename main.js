require('./config')
const {
  default: makeWASocket,
  BufferJSON,
  initInMemoryKeyStore,
  DisconnectReason
} = require('@adiwajshing/baileys-md')
const WebSocket = require('ws')
const path = require('path')
const fs = require('fs')
const yargs = require('yargs/yargs')
const Readline = require('readline')
const cp = require('child_process')
const _ = require('lodash')
const syntaxerror = require('syntax-error')
const cloudDBAdapter = require('./lib/cloudDBAdapter')
let simple = require('./lib/simple')
var low
try {
  low = require('lowdb')
} catch (e) {
  low = require('./lib/lowdb')
}
const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')
const rl = Readline.createInterface(process.stdin, process.stdout)


global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
global.Fn = function functionCallBack(fn, ...args) { return fn.call(global.conn, ...args) }
global.timestamp = {
  start: new Date
}

const PORT = process.env.PORT || 3000
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())

global.prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
      new mongoDB(opts['db']) :
      new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(function () {(!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null)}, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read()
  global.db.READ = false
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    ...(global.db.data || {})
  }
  global.db.chain = _.chain(global.db.data)
}
loadDatabase()

global.authFile = `${opts._[0] || 'session'}.data.json`
global.isInit = !fs.existsSync(authFile)
const auth = (auth = null) => {
  if (!fs.existsSync(authFile) && !auth) return undefined
  try {
    const value = JSON.parse(
      auth || fs.readFileSync(authFile, { encoding: 'utf-8' }),
      BufferJSON.reviver
    )
    const state = {
      creds: value.creds,
      // stores pre-keys, session & other keys in a JSON object
      // we deserialize it here
      keys: initInMemoryKeyStore(value.keys)
    }
    return state
  } catch (e) {
    console.error(e)
    return null
  }
}

global.conn = simple.makeWASocket({
  printQRInTerminal: true,
  auth: auth()
})

if (!opts['test']) {
  if (global.db) setInterval(async () => {
    await global.db.write()
  }, 30 * 1000)
  rl.on('line', line => {
    process.send(line.trim())
  })
}

const connection_update = async (update) => {
  if (global.db.data == null) await loadDatabase()
  const { connection, lastDisconnect } = update
  global.timestamp.connect = new Date
  if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut && conn.ws.readyState !== WebSocket.CONNECTING) {
    console.log(global.reloadHandler(true))
  }
}

const auth_state_update = () => {
  const state = conn.authState
  if (!state) return
  fs.writeFileSync(
    global.authFile,
    // BufferJSON replacer utility saves buffers nicely
    JSON.stringify(state, BufferJSON.replacer, 2)
  )
}

process.on('uncaughtException', console.error)
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

const imports = (path) => {
  let modules, retry = 0
  do {
    modules = require(path)
    retry++
  } while ((!modules || (Array.isArray(modules) || modules instanceof String) ? !(modules || []).length : typeof modules == 'object' && !Buffer.isBuffer(modules) ? !(Object.keys(modules || {})).length : true) && retry <= 10)
  return modules
}
let isInit = true
global.reloadHandler = function (restatConn) {
  simple = imports('./lib/simple')
  let handler = imports('./handler')
  if (restatConn) {
    try { global.conn.ws.close() } catch { }
    global.conn = simple.makeWASocket({
      printQRInTerminal: true,
      auth: auth()
    })
  }
  conn.welcome = 'Hai, @user!\nSelamat datang di grup @subject\n\n@desc'
  conn.bye = 'Selamat tinggal @user!'
  conn.spromote = '@user sekarang admin!'
  conn.sdemote = '@user sekarang bukan admin!'
  conn.handler = function handlerMessage(...args) { return Fn(handler.handler, ...args) }
  conn.participantsUpdate = function handlerParticipantsUpdate(...args) { return Fn(handler.participantsUpdate, ...args) }
  // conn.groupsUpdate = (...args) => Fn(handler.groupsUpdate, ...args)
  // conn.contacts_upsert = (...args) => Fn(handler.contacts_upsert, ...args)
  conn.connection_update = function handlerConnectionUpdate(...args) { return Fn(connection_update, ...args) }
  conn.auth_state_update = function handlerAuthStateUpdate(...args) { return Fn(auth_state_update, ...args) }
  conn.auth = auth

  if (!isInit) {
    // conn.ev.removeAllListeners('messages.upsert')
    // conn.ev.removeAllListeners('group-participants.update')
    // // conn.ev.removeAllListeners('groups.update')
    // conn.ev.removeAllListeners('connection.update')
    // conn.ev.removeAllListeners('auth-state.update')
    // // conn.ev.removeAllListeners('contacts.upsert')
    conn.ev.removeListener('messages.upsert', conn.handler)
    conn.ev.removeListener('group-participants.update', conn.participantsUpdate)
    // conn.ev.removeListener('groups.update', conn.groupsUpdate)
    conn.ev.removeListener('connection.update', conn.connection_update)
    conn.ev.removeListener('auth-state.update', conn.auth_state_update)
    // conn.ev.removeListener('contacts.upsert', conn.contacts_upsert)
  }

  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('group-participants.update', conn.participantsUpdate)
  // conn.ev.on('groups.update', conn.groupsUpdate)
  conn.ev.on('connection.update', conn.connection_update)
  conn.ev.on('auth-state.update', conn.auth_state_update)
  // conn.ev.on('contacts.upsert', conn.contacts_upsert)
  isInit = false
  return true
}

let pluginFolder = path.join(__dirname, 'plugins')
let pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
  try {
    global.plugins[filename] = require(path.join(pluginFolder, filename))
  } catch (e) {
    conn.logger.error(e)
    delete global.plugins[filename]
  }
}
console.log(Object.keys(global.plugins))
global.reload = (_ev, filename) => {
  if (pluginFilter(filename)) {
    let dir = path.join(pluginFolder, filename)
    if (dir in require.cache) {
      delete require.cache[dir]
      if (fs.existsSync(dir)) conn.logger?.info(`re - require plugin '${filename}'`)
      else {
        conn.logger.warn(`deleted plugin '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`requiring new plugin '${filename}'`)
    let err = syntaxerror(fs.readFileSync(dir), filename)
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${err}`)
    else try {
      global.plugins[filename] = require(dir)
    } catch (e) {
      conn.logger.error(e)
    } finally {
      global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
    }
  }
}
Object.freeze(global.reload)
fs.watch(path.join(__dirname, 'plugins'), global.reload)
global.reloadHandler()

// Quick Test
async function _quickTest() {
  let test = await Promise.all([
    cp.spawn('ffmpeg'),
    cp.spawn('ffprobe'),
    cp.spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    cp.spawn('convert'),
    cp.spawn('magick'),
    cp.spawn('gm'),
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127)
        })
      }),
      new Promise(resolve => {
        p.on('error', _ => resolve(false))
      })
    ])
  }))
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm] = test
  console.log(test)
  let s = global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm
  }
  // require('./lib/sticker').support = s
  Object.freeze(global.support)

  if (!s.ffmpeg) conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
  if (s.ffmpeg && !s.ffmpegWebp) conn.logger?.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
  if (!s.convert && !s.magick && !s.gm) conn.logger?.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
}

_quickTest()
  .then(() => conn.logger.info('Quick Test Done'))
  .catch(console.error)