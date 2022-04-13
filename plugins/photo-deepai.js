import deepai from 'deepai'

deepai.setApiKey('apikey') // APIKEY DEEPAI

let handler = async(m, { conn, usedPrefix, command }) => {
    if (command == 'hd') command = 'torch-srgan'
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `Reply Foto/Kirim foto dengan caption *${usedPrefix + command}*`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
    let msg = await conn.fakeReply(m.chat, `Proses Kak...`, '0@s.whatsapp.net', command)
    let img = await q.download()
    try {
        let resp = await deepai.callStandardApi(command,{
            image: img,
        });
        conn.sendFile(m.chat, resp.output_url, '', 'Sudah jadi kak ```>_<```',  m)
        await conn.sendMessage(m.chat, { delete: msg.key })
    } catch (err) {
        m.reply('Proses *ERROR*')
    }
}
handler.help = ['colorizer', 'deepdream', 'toonify', 'torch-srgan / hd', 'waifu2x']
handler.tags = ['Deep.ai']
handler.command = /^colorizer|deepdream|toonify|hd|torch-srgan|waifu2x$/i
export default handler
