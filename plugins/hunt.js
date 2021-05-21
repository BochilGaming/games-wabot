let handler = async (m, { conn, text }) => {

let monsters = [
	{area: 1,	name: "Goblin"},
	{area: 1,	name: "Slime"},
	{area: 1,	name: "Wolf"},
	{area: 2,	name: "Nymph"},
	{area: 2,	name: "Skeleton"},
	{area: 2,	name: "Wolf"},
	{area: 3,	name: "Baby Demon"},
	{area: 3,	name: "Ghost"},
	{area: 3,	name: "Zombie"},
	{area: 4,	name: "Imp"},
	{area: 4,	name: "Witch"},
	{area: 4,	name: "Zombie"},
	{area: 5,	name: "Ghoul"},
	{area: 5,	name: "Giant Scorpion"},
	{area: 5,	name: "Unicorn"},
	{area: 6,	name: "Baby Robot"},
	{area: 6,	name: "Sorcerer"},
	{area: 6,	name: "Unicorn"},
	{area: 7,	name: "Cecaelia"},
	{area: 7,	name: "Giant Piranha"},
	{area: 7,	name: "Mermaid"},
	{area: 8,	name: "Giant Crocodile"},
	{area: 8,	name: "Nereid"},
	{area: 8,	name: "Mermaid"},
	{area: 9,	name: "Demon"},
	{area: 9,	name: "Harpy"},
	{area: 9,	name: "Killer Robot"},
	{area: 10,	name: "Dullahan"},
	{area: 10,	name: "Manticore"},
	{area: 10,	name: "Killer Robot"},
	{area: 11,	name: "Baby Dragon"},
	{area: 11,	name: "Young Dragon"},
	{area: 11,	name: "Scaled Baby Dragon"},
	{area: 12,	name: "Kid Dragon"},
	{area: 12,	name: "Not so young Dragon"},
	{area: 12,	name: "Scaled Kid Dragon"},
	{area: 13,	name: "Definitely not so young Dragon"},
	{area: 13,	name: "Teen Dragon"},
	{area: 13,	name: "Scaled Teen Dragon"},
]
let player = global.DATABASE.data.users[m.sender]
let pname = conn.getName(m.sender)

let cdm = `${MeNit(new Date - player.Thunt)}`
let cds = `${DeTik(new Date - player.Thunt)}`
let cd1 = Math.ceil(02 - cdm)
let cd2 = Math.ceil(60 - cds)

let area_monsters = monsters.filter(monster => { return  monster.area === player.area })
let monster = area_monsters[Math.floor(Math.random() * area_monsters.length)]
let monsterName = monster.name.toUpperCase()

if (new Date - global.DATABASE._data.users[m.sender].Thunt > 120000) {
let coins = parseInt((player.area * player.area * 12.67).toFixed())
let exp = parseInt((player.area * player.area * 8 * (1 + 51.5*1/100)).toFixed())
let sum = 82 * player.area - 59
let dmg = player.attack + player.defense - sum
    dmg = dmg < 0 ? Math.abs(dmg) : 0

player.hp -= dmg
player.Thunt = new Date * 1

if (player.hp < 0) {
	let msg = `*${pname}* Anda Mati Di Bunuh Oleh ${monsterName}`
	 if (player.level > 1) {
	  player.level -= 1
	  msg += `\nLevel Anda Turun 1 Karena Mati Saat Berburu` 
          }
	  player.exp = 0
	  player.hp = player.max_hp
          m.reply(msg)
	  return
	}

player.coins += coins
player.exp += exp

 let pesan = `*${pname}* Menemukan Dan Membunuh *${monsterName}*\nMendapatkan ${new Intl.NumberFormat('en-US').format(coins)} coins & ${new Intl.NumberFormat('en-US').format(exp)} XP\nBerkurang -${dmg}Hp, Tersisa ${player.hp}/${player.max_hp}`
 m.reply(pesan)
 } else throw `Tunggu *00:${cd1}:${cd2}* Untuk Berburu Lagi`
}

handler.help = ['hunt']
handler.tags = ['help']
handler.command = /^hunt/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function MeNit(ms) {
  let m = isNaN(ms) ? '02' : Math.floor(ms / 60000) % 60
  return [m].map(v => v.toString().padStart(2, 0) ).join(':')
}

function DeTik(ms) {
  let s = isNaN(ms) ? '60' : Math.floor(ms / 1000) % 60
  return [s].map(v => v.toString().padStart(2, 0) ).join(':')
}
