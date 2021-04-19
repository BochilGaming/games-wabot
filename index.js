console.log('Starting...')
let fs = require('fs')

/*For Auto Backup*/
let d = new Date
let tanggal = d.toLocaleDateString('id', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
})
let waktu = d.toLocaleTimeString('id', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
})
let _data = './database.json'
if (fs.existsSync(_data)) {
    fs.copyFile(_data, `./database ${tanggal} ${waktu}.json`, (err) => {
        if (err) {
            console.log('Cannot copy database.json\n\n' + err)
        } else {
            console.log('database.json was copied to database ' + tanggal + ' ' + waktu + '.json')
        }
    })
}

let { spawn } = require('child_process')
let path = require('path')
let package = require('./package.json')
const CFonts  = require('cfonts')
CFonts.say('Lightweight\nWhatsApp Bot', {
  font: 'chrome',
  align: 'center',
  gradient: ['red', 'magenta']
})
CFonts.say(`'${package.name}' By @${package.author.name || package.author}`, {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']
})

/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
  let args = [path.join(__dirname, file), ...process.argv.slice(2)]
  CFonts.say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
  })
  let p = spawn(process.argv[0], args, {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc']
  })
  p.on('message', data => {
    console.log('[RECEIVED]', data)
    switch (data) {
      case 'reset':
        p.kill()
        start.apply(this, arguments)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }
  })
  p.on('exit', code => {
    console.error('Exited with code:', code)
    if (code === 0) return
    fs.watchFile(args[0], () => {
      fs.unwatchFile(args[0])
      start(file)
    })
  })
  // console.log(p)
}

start('main.js')
