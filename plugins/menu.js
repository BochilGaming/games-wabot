let fs = require ('fs')
let path = require('path')
let { MessageType, Presence } = require('@adiwajshing/baileys')

let handler  = async (m, { conn, usedPrefix: _p, DevMode }) => {
let botaks = fs.readFileSync(path.join(__dirname , '../src/botstyle.png')).toString('base64')
await conn.updatePresence(m.chat, Presence.recording)
let botstyle = './src/avatar_contact.png'
  try {
    let package = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')))
    let botstyle = await conn.getProfilePicture(conn.user.jid)
    let tnbot = fs.readFileSync(path.join(__dirname , '../src/dzxbot.jpg')).toString('base64')
    let name = conn.getName(m.sender)
	let d = new Date(new Date + 3600000)
    let gmtof = 18000
    let locale = 'id'
    /*d.getTimeZoneOffset()
    Offset -420 is 18.00
    Offset    0 is  0.00
    Offset  420 is  7.00*/
    let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
    let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
	let timeSay = msgTime()
	let timeTod = msgTod()
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.DATABASE._data.users).length
    let tags = {
      'main': 'Main',
      'about': 'About And Info',
      'sound': 'Sound Or Musix',
      'rpg': 'Rpg',
      'game': 'Games',
      'anonymous': 'Anonymous Chat',
      'sticker': 'Sticker & Image',
      'audio': 'Audio Tools',
      'primbon': 'Primbon',
      'kerang': 'Kerang Ajaib',
      'quotes': 'Quotes',
      'nulis': 'Mager Nulis',
      'database': 'Database',
      'vote': 'Voting',
      'islam': 'Islam',
      'image': 'Image',
      'anime': 'Anime',
      'internet': 'Internet',
      'downloader': 'Downloader',
      'tools': 'Tools',
      'audio': 'Audio',
      'aduhlort': '18+',
      'expression': 'Expression',
      'spammer': 'Spammer',
      'jadibot': 'Jadi Bot',
      'admin': 'Admin',
      'group': 'Group',
      'owner': 'Owner',
      'host': 'Host',
      'advanced': 'Advanced',
      'info': 'Info',
      '': 'No Category',
    }
    for (let plugin of Object.values(global.plugins))
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!tag in  tags) tags[tag] = tag
    let help = Object.values(global.plugins).map(plugin => {
      return {
        help: plugin.help,
        tags: plugin.tags,
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit
      }
    })
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let menu of help)
        if (menu.tags && menu.tags.includes(tag))
          if (menu.help) groups[tag].push(menu)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || ` ┌──「 DZX BOTZ 」
│
├ Hai %name, %timeTod
├ Tanggal: *%week,  %date*
├ Waktu: *%time*
├ Uptime: *%uptime*
├ Battery BOT: *${conn.battery ? `${conn.battery.value}% ${conn.battery.live ? '🔌 Charging...' : '⚡ Discharging'}` : 'Unknown'}*
│
╰────`
    let header = conn.menu.header || '◪「 %category 」'
    let body   = conn.menu.body   || '├❏  %cmd%islimit'
    let footer = conn.menu.footer || '╰────\n'
    let after  = conn.menu.after  || '\n'
    let _text  = before + '\n'
    for (let tag in groups) {
      _text += header.replace(/%category/g, tags[tag]) + '\n'
      for (let menu of groups[tag]) {
        for (let help of menu.help)
          _text += body.replace(/%cmd/g, menu.prefix ? help : '%p' + help).replace(/%islimit/g, menu.limit ? ' (Limit)' : '')  + '\n'
      }
      _text += footer + '\n'
    }
    _text += after
    text =  typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, timeSay, timeTod,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      name, weton, week, date, time,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).join`|`})`, 'g'), (_, name) => replace[name])
    conn.sendFile(m.chat, botstyle, 'botstyle.mp4', text.trim(), { 
      key: { 
        remoteJid: '13479805233-1626081721@g.us', 
        participant: '6289643544046@s.whatsapp.net', 
        fromMe: false 
      }, 
	message: {
			          "productMessage": {
				          "product": {
					          "productImage":{
						          "mimetype": "image/jpeg",
						          "jpegThumbnail": fs.readFileSync(`./src/botstyle.png`)
					            },
					          "title": `${timeSay} 🗿🙏`,
					          "description": `🔋 = ${conn.battery ? `${conn.battery.value}% ${conn.battery.live ? '🔌 Charging...' : '⚡ Discharging'}` : 'Unknown'}`,
					         // "currencyCode": "IDR",
					          //"priceAmount1000": "50000000",
					          "retailerId": "Self Bot",
					          "productImageCount": 1
				             },
				             "businessOwnerJid": `0@s.whatsapp.net`
		                   }
	                    }
						
	}, m, { 
     thumbnail: Buffer.alloc(0), 
      contextInfo: {
		forwardingScore: 508, isForwarded: true, mentionedJid: [m.sender]}})
      

await conn.send2Button(m.chat, 'Reading menu.js', 'Copyright DZX BOTZ', 'PEMILIK BOT', '.owner', 'DONASI', '.donasi', { quoted: m })
      conn.updatePresence(m.chat, Presence.composing)
      conn.updatePresence(m.chat, Presence.available)
      conn.updatePresence(m.chat, Presence.composing)
  }
    catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
    if (DevMode) {
        for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
            conn.sendMessage(jid, 'Menu.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
        }
    }
  }
}
handler.help = ['menu','help','?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i

handler.fail = null
handler.exp = 2

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}

function msgTime() {
  let hours = new Date().getHours()
  let msg = ''
  if (hours > 18 && hours < 4) msg = 'Malam Tod'
  else if (hours > 3 && hours < 10) msg = 'Pagi Tod'
  else if (hours > 9 && hours < 15) msg = 'Siang Tod'
  else if (hours > 14 && hours < 19) msg = 'Sore Tod'
  else msg = 'Malam Tod'
  return msg 
}

function msgTod() {
  let hours = new Date().getHours()
  let msg = ''
  if (hours > 18 && hours < 4) msg = 'Selamat Malam'
  else if (hours > 3 && hours < 10) msg = 'Selamat Pagi'
  else if (hours > 9 && hours < 15) msg = 'Selamat Siang'
  else if (hours > 14 && hours < 19) msg = 'Selamat Sore'
  else msg = 'Selamat Malam'
  return msg 
}
