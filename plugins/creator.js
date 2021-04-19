let handler = function (m) {
  this.sendContact(m.chat, '6281515860089', 'Nurutomo', m)
  //plsss do not change this, jika mau add boleh tapi jangan rubah
  this.sendContact(m.chat, '6281390658325', 'Owner Metro Bot :)', m)
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

module.exports = handler
