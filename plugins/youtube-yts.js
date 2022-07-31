import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, usedPrefix, text }) => {
  if (!text) throw 'Cari apa?'
  const { video, channel } = await youtubeSearch(text)
  const listSections = []
  let teks = [...video, ...channel].map(v => {
    switch (v.type) {
      case 'video': {
        listSections.push([`${v.title}`, [
          ['Video 🎥', `${usedPrefix}ytv ${v.url} yes`, `download ${v.title} (${v.url})`],
          ['Audio 🎧', `${usedPrefix}yta ${v.url} yes`, `download ${v.title} (${v.url})`]
        ]])
        return `
📌 *${v.title}* (${v.url})
⌚ Duration: ${v.durationH}
⏲️ Uploaded ${v.publishedTime}
👁️ ${v.view} views
      `.trim()
      }
      case 'channel': return `
📌 *${v.channelName}* (${v.url})
🧑‍🤝‍🧑 _${v.subscriberH} (${v.subscriber}) Subscriber_
🎥 ${v.videoCount} video
`.trim()
    }
  }).filter(v => v).join('\n\n========================\n\n')
  const msg = await m.reply(teks)
  conn.sendList(m.chat, '📺Youtube Search🔎', '\nDownload List', global.wm, 'Choose', listSections, msg)
}
handler.help = ['', 'earch'].map(v => 'yts' + v + ' <pencarian>')
handler.tags = ['tools']
handler.command = /^yts(earch)?$/i

export default handler
