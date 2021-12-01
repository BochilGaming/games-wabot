let handler = async (m, { usedPrefix, command, conn, args }) => {
  if (!args[0]) throw `Gunakan format: ${usedPrefix}${command} instagram`
  let res = await igstory(args[0])
  if (!res.length) throw 'User no have story!'
  for (let { url, type } of res)
    conn.sendFile(m.chat, url, 'ig' + (type == 'video' ? '.mp4' : '.jpg'), `
@${args[0]}
`.trim(), m)
}
handler.help = ['igstory'].map(v => v + ' <username>')
handler.tags = ['downloader']

handler.command = /^(igs(tory)?)$/i

module.exports = handler

const axios = require('axios')
const cheerio = require('cheerio')
const fetch = require('node-fetch')
async function igstory(username) {
  username = username.replace(/https:\/\/instagram.com\//g, '')
  let { data } = await axios.get(`https://www.instadownloader.org/data.php?username=${username}&t=${new Date * 1}`)
  const $ = cheerio.load(data)
  let results = []
  $('body > center').each(function (i, el) {
    results.push({
      url: $(el).find('a.download-btn').attr('href'),
      type: $(el).find('video').html() ? 'video' : 'image'
    })
  })
  return results
}
