let handler = async m => {
m.reply(`${m.quoted.isBaileys}`)
}

handler.help = ['isbaileys', 'baileys']
handler.tags = ['owner']
handler.command = ['isbaileys', 'baileys']
handler.owner = true

module.exports = handler
