let fetch = require('node-fetch')
let winScore = 999
let family100_api = [
    ['xteam', '/game/family100', null, 'APIKEY', json => {
        if (!json.status) throw json
        return json
    }],
    ['bg', '/family100', null, null, json => {
        if (!json.status) throw json
        return {
            soal: json.result.soal,
            jawaban: json.result.jawaban
        }
    }],
    ['https://raw.githubusercontent.com', '/BochilTeam/database/master/games/family100.json', null, null, json => {
        return json[Math.floor(Math.random * json.length)]
    }]
]
async function handler(m) {
    this.game = this.game ? this.game : {}
    let id = 'family100_' + m.chat
    if (id in this.game) {
        this.reply(m.chat, 'Masih ada kuis yang belum terjawab di chat ini', this.game[id].msg)
        throw false
    }

    let json
    for (let [origin, pathname, query, apikey, fn] of family100_api) {
        try {
            let res = await fetch(global.API(origin, pathname, {}, apikey))
             if (!res.ok) throw res.text()
             let _json = await res.json()
             json = await fn(_json)
             break
        } catch (e) {
             lastErr = e
        }
    }

    let caption = `
*Soal:* ${json.soal} 

Terdapat *${json.jawaban.length}* jawaban${json.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)
`: ''}

+${winScore} XP tiap jawaban benar
    `.trim()
    this.game[id] = {
        id,
        msg: await m.reply(caption),
        ...json,
        terjawab: Array.from(json.jawaban, () => false),
        winScore,
    }
}
handler.help = ['family100']
handler.tags = ['game']
handler.command = /^family100$/i

module.exports = handler