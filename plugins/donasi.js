let handler = async m => m.reply(`
╭─「 Donasi • Pulsa 」
│ • 3 [089524664142]
│ • Telkomsel [082339922441]
│ • Gopay [089524664142]
╰────
╭─「 Hubungi 」
│ > Ingin donasi? Wa.me/6289524664142
╰────
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
