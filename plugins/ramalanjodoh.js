// david | rose
import axios from 'axios'
import cheerio from 'cheerio'

// const nama1 = 'david'
// const nama2 = 'rose'

async function jodoh(nama1, nama2) {
    return new Promise((resolve, reject) => {
        axios.get('https://www.primbon.com/kecocokan_nama_pasangan.php?nama1='+nama1+'&nama2='+nama2+'&proses=+Submit%21+').then(({ data }) => {
            const $ = cheerio.load(data)
            const progress = 'https://www.primbon.com/'+$('#body > img').attr('src')
            const isi = $('#body').text().split(nama2)[1].replace('< Hitung Kembali','').split('\n')[0]
            const posi = isi.split('Sisi Negatif Anda: ')[0].replace('Sisi Positif Anda: ','')
            const nega = isi.split('Sisi Negatif Anda: ')[1]
            const res = { result: {
                nama1: nama1,
                nama2: nama2,
                thumb: progress,
                positif: posi,
                negatif: nega
            } }
            resolve(res)
        }).catch(e => reject({
            status: 404
        }))
})
}
// jodoh('david', 'rose').then(console.log).catch(console.log)
let handler = async(m, { conn, text, usedPrefix, command }) => {
    let [teks1, teks2] = text.split`|`
    if (!teks1 || !teks2) throw `Contoh:\n*${usedPrefix + command}* david|rose`
    try {
        let res = await jodoh(teks1, teks2).then(a => JSON.stringify(a)).then(b => JSON.parse(b))
        let {
            nama1,
            nama2,
            thumb,
            positif,
            negatif
        } = res.result
        let hasil = `*Nama kamu :* ${nama1}\n*Nama Pasangan :* ${nama2}\n*Positif :* ${positif}\n*Negatif :* ${negatif}`
        conn.sendFile(m.chat, thumb, '', hasil, m)
    } catch (err) {
        conn.sendMessage('6282280781433@s.whatsapp.net', { text: `\n*ERROR!* ${command}` + err })
        conn.fakeReply(m.chat, `*ERROR !*`, '0@s.whatsapp.net', command)
    }
}
handler.help = ['ramaljodoh <nama>|<nama>']
// handler.tags = [''] gatau mau letak dimana hehe
handler.command = /^ramaljodoh$/i
export default handler

/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */








