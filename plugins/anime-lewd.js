// lewd
import fetch from 'node-fetch'

let handler = async(m, { conn }) => {
    let img = await fetch(`https://storage.caliph71.xyz/img/lewd/${gr()+'.png'}`).then(a => a.buffer())
    await conn.sendFile(m.chat, img, 'lewn.png', '', m)
}
handler.help = ['lewd']
handler.tags = ['internet']
handler.command = /^lewd$/i
export default handler
function gr() {
  return Math.floor(Math.random() * 400) + 10;
}
