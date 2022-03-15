let handler = async m => m.reply(`
╭─「 Donasi • Pulsa 」
│ • Smartfren [088233481992]
│ • Gopay [088233481992]
╰────
╭─「 Hubungi 」
│ > Ingin donasi? Wa.me/6288233481992
╰────
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
