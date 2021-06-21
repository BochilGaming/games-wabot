var nodemon = require('nodemon')

nodemon({
  script: 'index.js',
  ext: 'js'
})

nodemon.on('start', function () {
  console.log('App has started')
}).on('quit', function () {
  console.log('App has quit')
  process.exit()
}).on('restart', function (files) {
  console.log('App restarted due to: ', files || '')
})
