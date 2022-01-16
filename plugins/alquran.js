let handler = async (m, { conn, args, usedPrefix, command }) => {
    let prehelp = `${usedPrefix + command}`
    if (sudahbaca === false) {
    let res = await alquran(args[0], args[1], prehelp)
    return await conn.sendButton(m.chat, `${res.pesan}`.trim(), '© stikerin', 'Menampilkan audio', `${usedPrefix+command} audio`)
    } else {
        if (args[0] === "audio") {
            if (sudahbaca === true) {
                conn.sendFile(m.chat, audioa, 'Alquran.mp3', '', m)
            }
            sudahbaca = false;
        }
    }
}


handler.help = ['alquran <114> <1>']
handler.tags = ['quran']
handler.command = /^(al)?quran$/i
module.exports = handler
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
global.sudahbaca = false;
const fetch = require('node-fetch')
const cheerio = require('cheerio')
async function alquran2(ad) {
audioa
}
async function alquran(surah, ayat, hlp) {
    if (!(surah||ayat)) return `contoh:\n${hlp} 1 2 \n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 `
    if (isNaN(surah)||isNaN(ayat)) return `contoh:\n${hlp} 1 2 \n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 `
    let res = await fetch(`https://kalam.sindonews.com/ayat/${ayat}/${surah}`)
    if (!res.ok) throw 'Error, maybe not found?'
    let $ = cheerio.load(await res.text())
    let content = $('body > main > div > div.content.clearfix > div.news > section > div.list-content.clearfix')//content
    let Surah = $(content).find('div.ayat-title > h1').text()//surah
    let arab = $(content).find('div.ayat-detail > div.ayat-arab').text()//arab
    let latin = $(content).find('div.ayat-detail > div.ayat-latin').text()//latin
    let terjemahan = $(content).find('div.ayat-detail > div.ayat-detail-text').text()//terjemahan
    let tafsir = ''
    $(content).find('div.ayat-detail > div.tafsir-box > div').each(function () {
        tafsir += $(this).text() + '\n'
    })//tafsir
    tafsir = tafsir.trim()
    keterangan = $(content).find('div.ayat-detail > div.ayat-summary').text()//keterangan
    let isi = []
    isi.push(arab, latin, terjemahan, readMore, tafsir, "(" + Surah + ")")
    // https://quran.kemenag.go.id/assets/js/quran.js
    audioa = `https://quran.kemenag.go.id/cmsq/source/s01/${surah < 10 ? '00' : surah >= 10 && surah < 100 ? '0' : ''}${surah}${ayat < 10 ? '00' : ayat >= 10 && ayat < 100 ? '0' : ''}${ayat}.mp3`
    pesan = ""
    for (let i = 0; i < isi.length;i++) {
        pesan += isi[i]
        pesan += "\n\n"
    }
    sudahbaca = true;
    return {
        pesan,
        keterangan
    }
}
