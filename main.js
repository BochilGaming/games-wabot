require('./config')
const {
  default: makeWASocket,
  BufferJSON,
  initInMemoryKeyStore,
  DisconnectReason
} = require('@adiwajshing/baileys-md')
const path = require('path')
const fs = require('fs')
const yargs = require('yargs/yargs')
const Readline = require('readline')
const cp = require('child_process')
const _ = require('lodash')
const syntaxerror = require('syntax-error')
const cloudDBAdapter = require('./lib/cloudDBAdapter')
const simple = require('./lib/simple')
var low
try {
  low = require('lowdb')
} catch (e) {
  low = require('./lib/lowdb')
}
const { Low, JSONFile } = low

const rl = Readline.createInterface(process.stdin, process.stdout)


global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
global.callFunction = (Function, conn = global.conn, ...args) => Function.call(conn, ...args)
global.timestamp = {
  start: new Date
}

const PORT = process.env.PORT || 3000
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())

global.prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) :
    new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
)
global.DATABASE = global.db // Backwards Compatibility

global.authFile = `${opts._[0] || 'session'}.data.json`
const auth = () => {
  if (!fs.existsSync(authFile)) return undefined
  try {
    const value = JSON.parse(
      fs.readFileSync(authFile, { encoding: 'utf-8' }),
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
  }
}

global.conn = simple.makeWASocket({
  printQRInTerminal: true,
  auth: auth()
})

if (!opts['test']) {
  if (global.db) setInterval(async () => {
    await global.db.write()
  }, 60 * 1000)
  rl.on('line', line => {
    process.send(line.trim())
  })
}

conn.auth = auth
conn.connection_update = async (update) => {
  const { connection, lastDisconnect } = update
  if (!global.db.data) {
    await global.db.read()
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
  global.timestamp.connect = new Date
  if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
    console.log(global.reloadHandler(true))
  }
}

conn.auth_state_update = () => {
  const state = conn.authState
  fs.writeFileSync(
    global.authFile,
    // BufferJSON replacer utility saves buffers nicely
    JSON.stringify(state, BufferJSON.replacer, 2)
  )
}

process.on('uncaughtException', console.error)
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

let isInit = true
global.reloadHandler = function (restatConn) {
  if (restatConn) {
    try { global.conn.ws.close() } catch { }
    global.conn = null
    global.conn = simple.makeWASocket({
      printQRInTerminal: true,
      auth: auth()
    })
  }
  let handler = require('./handler')
  if (!isInit) {
    conn.event.off('messages.upsert', conn.handler)
    conn.event.off('group-participants.update', conn.participantsUpdate)
    conn.event.off('groups.update', conn.groupsUpdate)
    conn.event.off('connection.update', conn.connection_update)
    conn.event.off('auth-state.update', conn.auth_state_update)
  }
  conn.handler = handler.handler
  conn.participantsUpdate = handler.participantsUpdate
  conn.groupsUpdate = handler.groupsUpdate
  conn.event.on('messages.upsert', conn.handler)
  conn.event.on('group-participants.update', conn.participantsUpdate)
  conn.event.on('groups.update', conn.groupsUpdate)
  conn.event.on('connection.update', conn.connection_update)
  conn.event.on('auth-state.update', conn.auth_state_update)
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
global.reload = (_event, filename) => {
  if (pluginFilter(filename)) {
    let dir = path.join(pluginFolder, filename)
    if (dir in require.cache) {
      delete require.cache[dir]
      if (fs.existsSync(dir)) conn.logger.info(`re - require plugin '${filename}'`)
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
  if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
  if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
}

_quickTest()
  .then(() => conn.logger.info('Quick Test Done'))
  .catch(console.error)