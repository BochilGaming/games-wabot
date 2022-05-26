// import { resolve, dirname as _dirname } from 'path'
// import _fs, { existsSync, readFileSync } from 'fs'
// const { promises: fs } = _fs

// class Database {
//     /**
//      * Create new Database
//      * @param {String} filepath Path to specified json database
//      * @param  {...any} args JSON.stringify arguments
//      */
//     constructor(filepath, ...args) {
//         this.file = resolve(filepath)
//         this.logger = console

//         this._load()

//         this._jsonargs = args
//         this._state = false
//         this._queue = []
//         this._interval = setInterval(async () => {
//           if (!this._state && this._queue && this._queue[0]) {
//             this._state = true
//             await this[this._queue.shift()]().catch(this.logger.error)
//             this._state = false
//           }
//         }, 1000)

//     }

//     get data() {
//         return this._data
//     }

//     set data(value) {
//         this._data = value
//         this.save()
//     }

//     /**
//      * Queue Load
//      */
//     load() {
//         this._queue.push('_load')
//     }

//     /**
//      * Queue Save
//      */
//     save() {
//         this._queue.push('_save')
//     }

//     _load() {
//         try {
//           return this._data = existsSync(this.file) ? JSON.parse(readFileSync(this.file)) : {}
//         } catch (e) {
//           this.logger.error(e)
//           return this._data = {}
//         }
//     }

//     async _save() {
//         let dirname = _dirname(this.file)
//         if (!existsSync(dirname)) await fs.mkdir(dirname, { recursive: true })
//         await fs.writeFile(this.file, JSON.stringify(this._data, ...this._jsonargs))
//         return this.file
//     }
// }


import Helper from './helper.js'
import { Low, JSONFile } from 'lowdb'
import { cloudDBAdapter, mongoDB, mongoDBV2 } from './DB_Adapters/index.js'
import lodash from 'lodash'

const databaseUrl = Helper.opts['db'] || ''
const databaseAdapter = /https?:\/\//.test(databaseUrl) ?
  new cloudDBAdapter(databaseUrl) : /mongodb(\+srv)?:\/\//i.test(databaseUrl) ?
    (Helper.opts['mongodbv2'] ? new mongoDBV2(databaseUrl) :
      new mongoDB(databaseUrl)) :
    new JSONFile(`${Helper.opts._[0] ? Helper.opts._[0] + '_' : ''}database.json`)
let database = new Low(databaseAdapter)

loadDatabase()

async function loadDatabase() {
  if (database.READ) return new Promise((resolve) => setInterval(function () {
    if (!database.READ) {
      clearInterval(this)
      resolve(database.data == null ? loadDatabase(arguments) : database.data)
    }
  }, 1 * 1000))
  if (database.data !== null) return
  database.READ = true
  await database.read().catch(console.error)
  database.READ = false
  database.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(database.data || {})
  }
  database.chain = lodash.chain(database.data)

  return database.data
}


export {
  databaseUrl,
  databaseAdapter,
  database,
  loadDatabase
}
/** @type {typeof database & { chain: ReturnType<lodash.chain>, READ: boolean }} */
export default database


