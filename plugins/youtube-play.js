import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Use example ${usedPrefix}${command} Minecraft`
  let vid = (await youtubeSearch(text)).video[0]
  if (!vid) throw 'Video/Audio Tidak ditemukan'
  let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
  const url = 'https://www.youtube.com/watch?v=' + videoId
  await conn.sendButton(m.chat, `
📌 *Title:* ${title}
🔗 *Url:* ${url}
📝 *Description:* ${description}
⏲️ *Published:* ${publishedTime}
⌚ *Duration:* ${durationH}
👁️ *Views:* ${viewH}
  `.trim(), author, thumbnail, [
    ['Audio 🎧', `${usedPrefix}yta ${url} yes`], ['Video 🎥', `${usedPrefix}ytv ${url} yes`]
  ], m)
  //   for (let i in servers) {
  //     let server = servers[i]
  //     try {
  //       yt = await (isVideo ? ytv : yta)(vid.url, server)
  //       usedServer = server
  //       break
  //     } catch (e) {
  //       m.reply(`Server ${server} error!${servers.length >= i + 1 ? '' : '\nmencoba server lain...'}`)
  //     }
  //   }
  //   if (yt === false) throw 'Semua server tidak bisa :/'
  //   let { dl_link, thumb, title, filesize, filesizeF } = yt
  //   let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < filesize
  //   conn.sendFile(m.chat, thumb, 'thumbnail.jpg', `
  // *Title:* ${title}
  // *Filesize:* ${filesizeF}
  // *Source:* ${vid.url}
  // *${isLimit ? 'Pakai ' : ''}Link:* ${dl_link}
  // *Server y2mate:* ${usedServer}
  // `.trim(), m)
  //   let _thumb = {}
  //   try { if (isVideo) _thumb = { thumbnail: await (await fetch(thumb)).buffer() } }
  //   catch (e) { }
  //   if (!isLimit) conn.sendFile(m.chat, dl_link, title + '.mp' + (3 + /2$/.test(command)), `
  // *Title:* ${title}
  // *Filesize:* ${filesizeF}
  // *Source:* ${vid.url}
  // *Server y2mate:* ${usedServer}
  // `.trim(), m, false, {
  //     ..._thumb,
  //     asDocument: chat.useDocument
  //   })
}
handler.help = ['play', 'play2'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^play2?$/i

handler.exp = 0
handler.limit = false

export default handler

