let handler = async (m, { usedPrefix, command, conn, args }) => {
  if (!args[0]) throw `Gunakan format: ${usedPrefix}${command} https://www.instagram.com/xxx/xxxx/`
  let res = await igdl(args[0])
  if (!res.length) throw 'Not found!'
  for (let ress of res) {
    let caption = ` 
  *Url:* ${args[0]}
  *Link:* ${ress.result}
  `.trim()
    conn.sendFile(m.chat, ress.result, 'ig.mp4', caption, m)
  }
}
handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(ig(dl)?)$/i

module.exports = handler

const fetch = require('node-fetch')
const cheerio = require('cheerio')
const FormData = require('form-data')
async function igdl(url) {
  if (!/^((https|http)?:\/\/(?:www\.)?instagram\.com\/(p|tv|reel|stories)\/([^/?#&]+)).*/i.test(url)) throw 'Url invalid'
  let form = new FormData()
  form.append('url', encodeURI(url))
  form.append('action', 'post')
  let res = await fetch('https://snapinsta.app/action.php', {
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary1kCNm4346FA9yvCN',
      'cookie': 'PHPSESSID=6d7nupv45th6ln9ldhpu62pg8s; _ga=GA1.2.1450546575.1637033620; _gid=GA1.2.1378038975.1637033620; _gat=1; __gads=ID=68a947f8174e0410-22fc6960b3ce005e:T=1637033620:RT=1637033620:S=ALNI_MbXTvxtxuISyAFMevds6-00PecLlw; __atuvc=1%7C46; __atuvs=61932694ba428f79000; __atssc=google%3B1',
      'origin': 'https://snapinsta.app',
      'referer': 'https://snapinsta.app/id',
      'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
      ...form.getHeaders()
    },
    body: form
  })
  let html = await res.text()
  const $ = cheerio.load(html)
  let results = []
  $('div.col-md-4').each(function () {
    let thumbnail = $(this).find('div.download-items > div.download-items__thumb > img').attr('src')
    let result = $(this).find('div.download-items > div.download-items__btn > a').attr('href')
    if (!/https?:\/\//i.test(result)) result = 'https://snapinsta.app' + result
    results.push({
      thumbnail,
      result
    })
  })
  return results
}
