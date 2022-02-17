function handler(m) {
  const data = global.owner.filter(([id, isCreator]) => id && isCreator)
  this.sendContact(m.chat, data.map(([id, name]) => [id, name]), m)
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

export default handler
