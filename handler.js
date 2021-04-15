let util = require('util')
let simple = require('./lib/simple')

const isNumber = x => typeof x === 'number' && !isNaN(x)
module.exports = {
  async handler(chatUpdate) {
    if (!chatUpdate.hasNewMessage) return
    if (!chatUpdate.messages && !chatUpdate.count) return
    let m = chatUpdate.messages.all()[0]
    try {
    	simple.smsg(this, m)
      m.exp = 0
      m.limit = false
      try {
        let user
        if (user = global.DATABASE._data.users[m.sender]) {
            if (!isNumber(user.healt)) user.healt = 0
            if (!isNumber(user.healtlimit)) user.healtlimit = 10
            if (!isNumber(user.healtlastclaim)) user.healtlastclaim = 0  
            if (!isNumber(user.level)) user.level = 0
            if (!isNumber(user.levellimit)) user.levellimit = 10
            if (!isNumber(user.lastclaimlevel)) user.lastclaimlevel = 0
            if (!isNumber(user.exp)) user.exp = 0
            if (!isNumber(user.limit)) user.limit = 10
            if (!isNumber(user.lastclaim)) user.lastclaim = 0
            if (!isNumber(user.money)) user.money = 0
            if (!isNumber(user.moneylimit)) user.moneylimit = 10
            if (!isNumber(user.moneylastclaim)) user.moneylastclaim = 0
            if (!isNumber(user.diamond)) user.diamond = 0
            if (!isNumber(user.diamondlimit)) user.diamondlimit = 10
            if (!isNumber(user.diamondlastclaim)) user.diamondlastclaim = 0
            if (!isNumber(user.common)) user.common = 0
            if (!isNumber(user.commonlimit)) user.commonlimit = 10
            if (!isNumber(user.commonlastclaim)) user.commonlastclaim = 0
            if (!isNumber(user.uncommon)) user.uncommon = 0
            if (!isNumber(user.uncommonlimit)) user.uncommonlimit = 10
            if (!isNumber(user.uncommonlastclaim)) user.uncommonlastclaim = 0
            if (!isNumber(user.mythic)) user.mythic = 0
            if (!isNumber(user.mythiclimit)) user.mythiclimit = 10
            if (!isNumber(user.mythiclastclaim)) user.mythiclastclaim = 0
            if (!isNumber(user.legendary)) user.legendary = 0
            if (!isNumber(user.legendarylimit)) user.legendarylimit = 10
            if (!isNumber(user.legendarylastclaim)) user.legendarylastclaim = 0
        
            if (!isNumber(user.pet)) user.pet = 0
            if (!isNumber(user.petlimit)) user.petlimit = 10
            if (!isNumber(user.petlastclaim)) user.petlastclaim = 0
        
            if (!isNumber(user.potion)) user.potion = 0
            if (!isNumber(user.potionlimit)) user.potionlimit = 10
            if (!isNumber(user.potionlastclaim)) user.potionlastclaim = 0
            if (!isNumber(user.sampah)) user.sampah = 0
            if (!isNumber(user.sampahlimit)) user.sampahlimit = 10
            if (!isNumber(user.sampahlastclaim)) user.sampahlastclaim = 0
        
            if (!isNumber(user.armor)) user.armor = 0
            if (!isNumber(user.armorlimit)) user.armorlimit = 10
            if (!isNumber(user.armorlastclaim)) user.armorlastclaim = 0
        
            if (!isNumber(user.kucing)) user.kucing = 0
            if (!isNumber(user.kucinglimit)) user.kucinglimit = 10
            if (!isNumber(user.kucinglastclaim)) user.kucinglastclaim = 0
        
            if (!isNumber(user.kuda)) user.kuda = 0
            if (!isNumber(user.kudalimit)) user.kudalimit = 10
            if (!isNumber(user.kudalastclaim)) user.kudalastclaim = 0
        
            if (!isNumber(user.rubah)) user.rubah = 0
            if (!isNumber(user.rubahlimit)) user.rubahlimit = 10
            if (!isNumber(user.rubahlastclaim)) user.rubahlastclaim = 0
            if (!'Banneduser' in user) user.Banneduser = false
        
            if (!isNumber(user.warn)) user.warn = 0
            if (!isNumber(user.warnlimit)) user.warnlimit = 10
            if (!isNumber(user.warnlastclaim)) user.warnlastclaim = 0
            if (!isNumber(user.afk)) user.afk = -1
            if (!'afkReason' in user) user.afkReason = ''
        
            if (!isNumber(user.anakkucing)) user.anakkucing = 0
            if (!isNumber(user.anakkuda)) user.anakkuda = 0
            if (!isNumber(user.anakrubah)) user.anakrubah = 0
            if (!isNumber(user.makananpet)) user.makananpet = 0
            if (!isNumber(user.antispam)) user.antispam = 0
            if (!isNumber(user.antispamlastclaim)) user.antispamlastclaim = 0
        } else global.DATABASE._data.users[m.sender] = {
        healt: 100,
        healtlimit: 999999,
        healtlastclaim: 0,
        level: 0,
        levellimit: 10,
        lastclaimlevel: 0,
        exp: 0,
        limit: 10,
        lastclaim: 0,
        money: 0,
        moneylimit: 999999,
        moneylastclaim: 0,
        diamond: 0,
        diamondlimit: 999999,
        diamondlastclaim: 0,
        common: 0,
        commonlimit: 999999,
        commonlastclaim: 0,
        uncommon: 0,
        uncommonlimit: 999999,
        uncommonlastclaim: 0,
        mythic: 0,
        mythiclimit: 999999,
        mythiclastclaim: 0,
        legendary: 0,
        legendarylimit: 999999,
        legendarylastclaim: 0,
        pet: 0,
        petlimit: 999999,
        petlastclaim: 0,
        potion: 0,
        potionlimit: 999999,
        potionlastclaim: 0,
        sampah: 0,
        sampahlimit: 999999,
        sampahlastclaim: 0,
        armor: 0,
        armorlimit: 999999,
        armorlastclaim: 0,
        kucing: 0,
        kucinglimit: 999999,
        kucinglastclaim: 0,
        kuda: 0,
        kudalimit: 999999,
        kudalastclaim: 0,
        rubah: 0,
        rubahlimit: 999999,
        rubahlastclaim: 0,
        Banneduser: false,
        warn: 0,
        warnlimit: 999999,
        warnlastclaim: 0,
        afk: -1,
        afkReason: '',
        anakkucing: 0,
        anakkuda: 0,
        anakrubah: 0,
        makananpet: 0,
        antispam: 0,
        antispamlastclaim: 0,
        }
    
        let chat
        if (chat = global.DATABASE._data.chats[m.chat]) {
          if (!'isBanned' in chat) chat.isBanned = false
          if (!'welcome' in chat) chat.welcome = false
          if (!'sWelcome' in chat) chat.sWelcome = ''
          if (!'sBye' in chat) chat.sBye = ''
          if (!'delete' in chat) chat.delete = true
          if (!'antiLink' in chat) chat.antiLink = false
          if (!'antiToxic' in chat) chat.antiToxic = true
        } else global.DATABASE._data.chats[m.chat] = {
          isBanned: false,
          welcome: false,
          sWelcome: '',
          sBye: '',
          delete: true,
          antiLink: false,
          antiToxic: true,
        }
      } catch (e) {
        console.log(e, global.DATABASE.data)
      }
      if (!m.fromMe && opts['self']) return
      if (typeof m.text !== 'string') m.text = ''
      if (m.isBaileys) return
      m.exp += Math.ceil(Math.random() * 10)
      await conn.chatRead (m.chat)
    	let usedPrefix
      let _user = global.DATABASE.data && global.DATABASE.data.users && global.DATABASE.data.users[m.sender]

      let isROwner = [global.conn.user.jid, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
      let isOwner = isROwner || m.fromMe
      let isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
      let isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
      let groupMetadata = m.isGroup ? await this.groupMetadata(m.chat) : {}
      let participants = m.isGroup ? groupMetadata.participants : []
      let user = m.isGroup ? participants.find(u => u.jid == m.sender) : {} // User Data
      let bot = m.isGroup ? participants.find(u => u.jid == this.user.jid) : {} // Your Data
      let isAdmin = user.isAdmin || user.isSuperAdmin || false // Is User Admin?
      let isBotAdmin = bot.isAdmin || bot.isSuperAdmin || false // Are you Admin?
    	for (let name in global.plugins) {
    	  let plugin = global.plugins[name]
        if (!plugin) continue
        if (!opts['restrict']) if (plugin.tags && plugin.tags.includes('admin')) continue
        const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
  		  let match = (_prefix instanceof RegExp ? // RegExp Mode?
          [[_prefix.exec(m.text), _prefix]] :
          Array.isArray(_prefix) ? // Array?
            _prefix.map(p => {
              let re = p instanceof RegExp ? // RegExp in Array?
                p :
                new RegExp(str2Regex(p))
              return [re.exec(m.text), re]
            }) :
             typeof _prefix === 'string' ? // String?
              [[new RegExp(str2Regex(_prefix)).exec(m.text),new RegExp(str2Regex(_prefix))]] :
              [[[], new RegExp]]
        ).find(p => p[1])
        if (typeof plugin.before == 'function') if (await plugin.before.call(this, m, {
          match, user, groupMetadata, chatUpdate
        })) continue
    	  if ((usedPrefix = (match[0] || '')[0])) {
          let noPrefix = m.text.replace(usedPrefix, '')
  	  	  let [command, ...args] = noPrefix.trim().split` `.filter(v=>v)
          args = args || []
          let _args = noPrefix.trim().split` `.slice(1)
          let text = _args.join` `
    		  command = (command || '').toLowerCase()
          let fail = plugin.fail || global.dfail // When failed
  		  	let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
            plugin.command.test(command) :
            Array.isArray(plugin.command) ? // Array?
              plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
                cmd.test(command) :
                cmd === command
              ) :
              typeof plugin.command === 'string' ? // String?
                plugin.command === command :
                false

    			if (!isAccept) continue
          m.plugin = name
          if (m.chat in global.DATABASE._data.chats || m.sender in global.DATABASE._data.users) {
            let chat = global.DATABASE._data.chats[m.chat]
            let user = global.DATABASE._data.users[m.sender]
            if (chat.isBanned == true || user.Banneduser == true) {
                if (name != 'math_answer.js' && name != '_afk.js' && name != 'leveling.js') {       
                    this.reply(m.chat, '*Anda Terbanned*\nJoin Official Group Metro Bot untuk keterangan lebih lanjut\n\n https://chat.whatsapp.com/Lb4Emjih98rBiCZiZoS2eM \n\n*Atau hubungi wa.me/6281390658325*', m) 
                }
            }
            if (name != 'unbanchat.js' && chat && chat.isBanned) return // Except this
            if (name != 'unbanuser.js' && user && user.Banneduser) return
          }
          if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
            fail('owner', m, this)
            continue
          }
          if (plugin.rowner && !isROwner) { // Real Owner
            fail('rowner', m, this)
            continue
          }
          if (plugin.owner && !isOwner) { // Number Owner
            fail('owner', m, this)
            continue
          }
          if (plugin.mods && !isMods) { // Moderator
            fail('mods', m, this)
            continue
          }
          if (plugin.premium && !isPrems) { // Premium
            fail('premium', m, this)
            continue
          }
    			if (plugin.group && !m.isGroup) { // Group Only
            fail('group', m, this)
            continue
          } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
            fail('botAdmin', m, this)
            continue
          } else if (plugin.admin && !isAdmin) { // User Admin
            fail('admin', m, this)
            continue
          }
          if (plugin.private && m.isGroup) { // Private Chat Only
            fail('private', m, this)
            continue
          }
          if (plugin.register == true && _user.registered == false) { // Butuh daftar?
            fail('unreg', m, this)
            continue
          }
          if (new Date - global.DATABASE._data.users[m.sender].antispamlastclaim > 5000) {
            global.DATABASE._data.users[m.sender].antispam = 0
            global.DATABASE._data.users[m.sender].antispamlastclaim = new Date
          } else {
            global.DATABASE._data.users[m.sender].antispam += 1
          }
          if (global.DATABASE._data.users[m.sender].antispam > 15) {
              if (isROwner) return
              if (isOwner) return
              if (isMods) return
            
            global.DATABASE._data.users[m.sender].antispam = 0
            global.DATABASE._data.users[m.sender].warn += 1
            global.DATABASE._data.users[m.sender].antispamlastclaim = new Date
            this.reply(m.chat, '*You get a warn for being spammed*\n*remember if you get a warn 4 times you will automatically be BANNED*', m)
            this.sendMessage('6281390658325@s.whatsapp.net', `${m.sender.split`@`[0]} *Spam*`.trim(), MessageType.text)
            if(global.DATABASE._data.users[m.sender].warn == 3) {
                this.reply(m.chat, '*You got banned for spam*\nJoin Official Group Metro Bot untuk keterangan lebih lanjut\n\n https://chat.whatsapp.com/Lb4Emjih98rBiCZiZoS2eM \n\n*Atau hubungi wa.me/6281390658325*', m)
                this.sendMessage('6281390658325@s.whatsapp.net', `${m.sender.split`@`[0]} *Spam And Got BANNED*`.trim(), MessageType.text)
            }
          }
          if (global.DATABASE._data.users[m.sender].money > 99999999) {
              global.DATABASE._data.users[m.sender].money = 99999999
          }
          if (global.DATABASE._data.users[m.sender].healt > 100) {
              global.DATABASE._data.users[m.sender].healt = 100
          }
          if (global.DATABASE._data.users[m.sender].healt < 0) {
              global.DATABASE._data.users[m.sender].healt = 0
          }

          m.isCommand = true
          let xp = 'exp' in plugin ? parseInt(plugin.exp) : 6 // XP Earning per command
          if (xp > 99999999999) m.reply('Ngecit -_-') // Hehehe
          else m.exp += xp
          if (!isPrems && plugin.limit && global.DATABASE._data.users[m.sender].limit < plugin.limit * 1) {
            this.reply(m.chat, `Limit anda habis, silahkan beli melalui *${usedPrefix}buy*`, m)
            continue // Limit habis
          }
          try {
            await plugin.call(this, m, {
              match,
              usedPrefix,
              noPrefix,
              _args,
              args,
              command,
              text,
              conn: this,
              participants,
              groupMetadata,
              user,
              bot,
              isROwner,
              isOwner,
              isAdmin,
              isBotAdmin,
              isPrems,
              chatUpdate,
            })
            if (!isPrems) m.limit = m.limit || plugin.limit || false
          } catch (e) {
            // Error occured
            m.error = e
            console.log(e)
            if (e) {
              let text = util.format(e)
              for (let key of Object.values(global.APIKeys))
                text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
              m.reply(text)
            }
          } finally {
            // m.reply(util.format(_user)) 
            if (m.limit) m.reply(+ m.limit + ' Limit terpakai')
          }
    			break
  	  	}
    	}
    } finally {
      //console.log(global.DATABASE._data.users[m.sender])
      let user, stats = global.DATABASE._data.stats
      if (m) {
        if (m.sender && (user = global.DATABASE._data.users[m.sender])) {
          user.exp += m.exp
          user.limit -= m.limit * 1
        }
    
        let stat
        if (m.plugin) {
          let now = + new Date
          if (m.plugin in stats) {
            stat = stats[m.plugin]
            if (!isNumber(stat.total)) stat.total = 1
            if (!isNumber(stat.success)) stat.success = m.error ? 0 : 1
            if (!isNumber(stat.last)) stat.last = now
            if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error ? 0 : now
          } else stat = stats[m.plugin] = {
            total: 1,
            success: m.error ? 0 : 1,
            last: now,
            lastSuccess: m.error ? 0 : now
          }
          stat.total += 1
          stat.last = now
          if (!m.error) {
            stat.success += 1
            stat.lastSuccess = now
          }
        }
      } 

      try {
        require('./lib/print')(m, this)
      } catch (e) {
        console.log(m, m.quoted, e)
      }
    }
  },
  async welcome({ m, participants }) {
    let chat = global.DATABASE._data.chats[m.key.remoteJid]
    if (!chat.welcome) return
    for (let user of participants) {
      let pp = './src/avatar_contact.png'
      try {
        pp = await this.getProfilePicture(user)
      } catch (e) {
      } finally {
        let text = (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!').replace('@user', '@' + user.split('@')[0]).replace('@subject', this.getName(m.key.remoteJid))
        this.sendFile(m.key.remoteJid, pp, 'pp.jpg', text, m, false, {
          contextInfo: {
            mentionedJid: [user]
          }
        })
      }
    }
  },
  async leave({ m, participants }) {
    let chat = global.DATABASE._data.chats[m.key.remoteJid]
    if (!chat.welcome) return
    for (let user of participants) {
      if (this.user.jid == user) continue
      let pp = './src/avatar_contact.png'
      try {
        pp = await this.getProfilePicture(user)
      } catch (e) {
      } finally {
        let text = (chat.sBye || this.bye || conn.bye || 'Bye, @user!').replace('@user', '@' + user.split('@')[0])
        this.sendFile(m.key.remoteJid, pp, 'pp.jpg', text, m, false, {
          contextInfo: {
            mentionedJid: [user]
          }
        })
      }
    }
  },
  async delete(m) {
    if (m.key.fromMe) return
    let chat = global.DATABASE._data.chats[m.key.remoteJid]
    if (chat.delete) return
  }
}

global.dfail = (type, m, conn) => {
  let msg = {
    rowner: 'Perintah ini hanya dapat digunakan oleh _*OWWNER!1!1!*_',
    owner: 'Perintah ini hanya dapat digunakan oleh _*Owner Bot*_!',
    mods: 'Perintah ini hanya dapat digunakan oleh _*Moderator*_ !',
    premium: 'Perintah ini hanya untuk member _*Premium*_ !',
    group: 'Perintah ini hanya dapat digunakan di grup!',
    private: 'Perintah ini hanya dapat digunakan di Chat Pribadi!\nKuy Join Official Group Metro Bot\n\nhttps://chat.whatsapp.com/Lb4Emjih98rBiCZiZoS2eM',
    admin: 'Perintah ini hanya untuk *Admin* grup!',
    botAdmin: 'Jadikan bot sebagai *Admin* untuk menggunakan perintah ini!',
    unreg: 'Silahkan daftar untuk menggunakan fitur ini dengan cara mengetik:\n\n*#daftar nama.umur*\n\nContoh: *#daftar Manusia.16*'
  }[type]
  if (msg) return m.reply(msg)
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'handler.js'"))
  delete require.cache[file]
  if (global.reloadHandler) console.log(global.reloadHandler())
})
