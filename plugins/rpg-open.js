const rewards = {
    common: {
        money: 101,
        exp: 201,
        potion: [0, 1, 0, 1, 0, 0, 0, 0, 0],
        common: [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        uncommon: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    uncommon: {
        money: 201,
        exp: 401,
        potion: [0, 1, 0, 0, 0, 0, 0],
        diamond: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        common: [0, 1, 0, 0, 0, 0, 0, 0],
        uncommon: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        mythic: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        kayu: [0, 1, 0, 0, 0, 0],
        batu: [0, 1, 0, 0, 0, 0],
        string: [0, 1, 0, 0, 0, 0]
    },
    mythic: {
        money: 301,
        exp: 551,
        potion: [0, 1, 0, 0, 0, 0],
        emerald: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        diamond: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        gold: [0, 1, 0, 0, 0, 0, 0, 0, 0],
        iron: [0, 1, 0, 0, 0, 0, 0, 0],
        common: [0, 1, 0, 0, 0, 0],
        uncommon: [0, 1, 0, 0, 0, 0, 0, 0],
        mythic: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        legendary: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        pet: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        kayu: [0, 1, 0, 0, 0],
        batu: [0, 1, 0, 0, 0],
        string: [0, 1, 0, 0, 0]
    },
    legendary: {
        money: 401,
        exp: 601,
        potion: [0, 1, 0, 0, 0],
        emerald: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        diamond: [0, 1, 0, 0, 0, 0, 0, 0, 0],
        gold: [0, 1, 0, 0, 0, 0, 0, 0],
        iron: [0, 1, 0, 0, 0, 0, 0],
        common: [0, 1, 0, 0, 0],
        uncommon: [0, 1, 0, 0, 0, 0, 0],
        mythic: [0, 1, 0, 0, 0, 0, 0, 0, 0],
        legendary: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        pet: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        kayu: [0, 1, 0, 0],
        batu: [0, 1, 0, 0],
        string: [0, 1, 0, 0]
    },
    // pet: {
    //     petFood: [0, 1, 0, 0, 0],
    //     anjing: [],
    // }
}
let handler = async (m, { command, args, usedPrefix, isOwner }) => {
    if (!isOwner) return
    let user = global.db.data.users[m.sender]
    let listCrate = Object.fromEntries(Object.entries(rewards).filter(([v]) => v && v in user))
    let info = `
Use Format *${usedPrefix}${command} [crate] [count]*
Usage example: *${usedPrefix}${command} common 10*

📍Crate list: 
${Object.keys(listCrate).map(([v]) => `
${rpg.emoticon(v)}${v}
`).join('\n')}
`.trim()
    let type = (args[0] || '').toLowerCase()
    let count = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
    if (!(type in listCrate)) return m.reply(info)
    if (user[type] < count) return m.reply(`
Your *${rpg.emoticon(type)}${type} crate* is not enough!, you only have ${user[type]} *${rpg.emoticon(type)}${type} crate*
type *${usedPrefix}buy ${type} ${count - user[type]}* to buy
`.trim())
    // TODO: add pet crate
    // if (type !== 'pet')
    for (let i = 0; i < count; i++)
        for (let [reward, value] of Object.entries(listCrate[type]))
            if (reward in user) {
                const total = value.getRandom()
                console.log({ reward, total })
            }
    //     user[type] -= count * 1
    //     Object.keys(crateReward).map(reward => !(reward in user) ? user[reward] = 0 : user[reward] += crateReward[reward])
    //     m.reply(`
    // You have opened *${count}* ${emot(type)}${type} crate and got:
    // ${Object.keys(crateReward).filter(v => v && crateReward[v] && !/legendary|pet|mythic|diamond|emerald/gi.test(v)).map(reward => `
    // *${emot(reward)}${reward}:* ${crateReward[reward]}
    // `.trim()).join('\n')}
    // `.trim())
    //     let diamond = crateReward.diamond, mythic = crateReward.mythic, pet = crateReward.pet, legendary = crateReward.legendary, emerald = crateReward.emerald
    //     if (mythic || diamond) m.reply(`
    // Congrats you got a rare item, which is ${diamond ? `*${diamond}* ${emot('diamond')}diamond` : ''}${diamond && mythic ? 'and ' : ''}${mythic ? `*${mythic}* ${emot('mythic')}mythic` : ''}
    // `.trim())
    //     if (pet || legendary || emerald) m.reply(`
    // Congrats you got a epic item, which is ${pet ? `*${pet}* ${emot('pet')}pet` : ''}${pet && legendary && emerald ? ', ' : (pet && legendary || legendary && emerald || emerald && pet) ? 'and ' : ''}${legendary ? `*${legendary}* ${emot('legendary')}legendary` : ''}${pet && legendary && emerald ? 'and ' : ''}${emerald ? `*${emerald}* ${emot('emerald')}emerald` : ''}
    // `.trim())
}
handler.help = ['open', 'gacha'].map(v => v + ' [crate] [count]')
handler.tags = ['rpg']
handler.command = /^(open|buka|gacha)$/i

handler.disabled = false

export default handler

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}