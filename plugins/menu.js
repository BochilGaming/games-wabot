let fs = require ('fs')
let path = require('path')
let { MessageType } = require('@adiwajshing/baileys')
let handler  = async (m, { conn, usedPrefix: _p }) => {
   let pp = './src/avatar_contact.png'
  try {
    pp = await conn.getProfilePicture(conn.user.jid)
    // pp = await conn.getProfilePicture(m.sender)
    let package = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')))
    let name = conn.getName(m.sender)
    let d = new Date
    let locale = 'id'
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
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.DATABASE._data.users).length
    let tags = {
      'main': 'Main',
      'about': 'About And Info',
      'rpg': 'Rpg',
      'game': 'Games',
      'sticker': 'Sticker',
      'audio': 'Filter Audio',
      'kerang': 'Kerang Ajaib',
      'quotes': 'Quotes',
      'nulis': 'Mager Nulis',
      'internet': 'Internet',
      'downloader': 'Downloader',
      'tools': 'Tools',
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
    let before = conn.menu.before || ` ╭─「 ${conn.getName(conn.user.jid)} 」
│ Hai, %name!
│
│ 
│ Tanggal: *%week %weton, %date*
│ Waktu: *%time*
│
│ Github:
│ %github
╰────`
    let header = conn.menu.header || '╭─「 %category 」'
    let body   = conn.menu.body   || '│➥ %cmd%islimit'
    let footer = conn.menu.footer || '╰────\n'
    let after  = conn.menu.after  || `\n*%npmname@^%version*\n\`\`\`\%npmdesc\`\`\``
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
      p: _p, uptime,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      name, weton, week, date, time,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).join`|`})`, 'g'), (_, name) => replace[name])
    try {
     await conn.sendFile(m.chat, pp, 'pp.jpg', text.trim(), m)
    } catch (e) {
      try {
        await conn.reply(m.chat, text.trim(), m)
      } catch (e) {
        conn.reply(m.chat, 'Maaf, menu sedang error', m)
        throw e
      }
    }
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
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
