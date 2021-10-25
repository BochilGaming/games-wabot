let { spawn } = require('child_process')
let levelling = require('../lib/levelling')
module.exports = {
  before(m) {
    let user = global.DATABASE._data.users[m.sender]
    if (!user.autolevelup) return !0
    if (m.sender === conn.user.jid) return
    let before = user.level * 1
    while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
      let d = new Date(new Date + 3600000)
      let locale = 'id'
      let time = d.toLocaleTimeString(locale, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })
      let name = this.getName(m.sender)
      let lvlnow = user.level
      let teks = `Selamat *${name}* naik 🧬level`
      let str = `
${teks} 

• 🧬Level Sebelumnya : ${before}
• 🧬Level Baru : ${lvlnow}
• Pada Jam : ${time}

*_Semakin sering berinteraksi dengan bot Semakin Tinggi level kamu_*
`.trim()
      if (global.support.convert || global.support.magick || global.support.gm) {
        let fontLevel = 'src/level_c.otf'
        let fontTexts = 'src/texts.otf'
        let xtsx = 'src/lvlup_template.jpg'
        let bufs = []
        const [_spawnprocess, ..._spawnargs] = [...(global.support.gm ? ['gm'] : global.support.magick ? ['magick'] : []),
          'convert',
          xtsx,
          '-font',
          fontTexts,
          '-fill',
          '#0F3E6A',
          '-size',
          '1024x784',
          '-pointsize',
          '68',
          '-interline-spacing',
          '-7.5',
          '-annotate',
          '+153+200',
          teks,
          //original together
          '-font',
          fontLevel,
          '-fill',
          '#0A2A48',
          '-size',
          '1024x784',
          '-pointsize',
          '140',
          '-interline-spacing',
          '-1.2',
          '-annotate',
          '+1370+260',
          lvlnow,
          '-append',
          'jpg:-'
        ]
        spawn(_spawnprocess, _spawnargs)
          .on('error', e => {
            throw e
          })
          .on('close', () => {
            this.sendFile(m.chat, Buffer.concat(bufs), 'result.jpg', str, m)
          })
          .stdout.on('data', chunk => bufs.push(chunk))

      } else {
        m.reply(str, m.chat, {
          contextInfo: {
            mentionedJid: [m.sender]
          }
        })
      }
    }

    return true
  }
}
