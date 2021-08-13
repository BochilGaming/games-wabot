let handler = async m => m.reply(`Metro Bot sedang mengguna source code dari
https://github.com/BochilGaming/games-wabot`.trim()) // Tambah sendiri kalo mau
handler.help = ['sc', 'sourcecode']
handler.tags = ['info']
handler.command = ['sc', 'sourcecode']

module.exports = handler
