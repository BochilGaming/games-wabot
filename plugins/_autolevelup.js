let util = require('util')
let path = require('path')
let { spawn } = require('child_process')

let handler = m => m
let levelling = require('../lib/levelling')
handler.before = m => {
    let user = global.DATABASE._data.users[m.sender]
    if (!user.autolevelup) return
    if (m.sender === global.conn.user.jid) return
    let before = user.level * 1
    while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
        let str = `Selamat *${name}* naik level \n• Level Sebelumnya : ${before}\n• Level Baru : ${user.level}\n• Pada Jam : ${time}\n\n*_Semakin sering berinteraksi dengan bot Semakin Tinggi level kamu_*`.trim()
        if (!global.support.convert && !global.support.magick && !global.support.gm) return handler.disabled = true
        let fontLevel = 'src/level_c.otf'
        let fontTexts = 'src/texts.otf'
        let xtsx = 'src/lvlup_template.jpg'
        let lvlnow = `${user.level}`
        let teks = `Selamat anda naik level`
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
	    .on('error', e => conn.reply(m.chat, util.format(e), m))
	    .on('close', () => {
	      conn.sendFile(m.chat, Buffer.concat(bufs), 'result.jpg', str, m)
	    })
	    .stdout.on('data', chunk => bufs.push(chunk))
	
    }
    return true
}
 
module.exports = handler
