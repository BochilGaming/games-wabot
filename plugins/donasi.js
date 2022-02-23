let handler =  m => m.reply(`
╭─「 Donasi • Pulsa 」
│ • Smartfren [0881037044211]
│ • XL [081805450249]
│ • BENERAN DONASI ATO MAO LIAT DOANG ?
╰────
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

export default handler
