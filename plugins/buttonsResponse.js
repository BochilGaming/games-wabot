const { MessageType, newMessagesDB } = require("@adiwajshing/baileys")
//const util = require('util')

module.exports = {
    async all(m, chatUpdate) {
        if (m.isBaileys) return
        if (!m.message) return
        if (m.mtype !== 'buttonsResponseMessage' && m.type !== 1) return
        //m.reply(util.format(m.msg))
        this.emit('chat-update', {
            ...chatUpdate,
            messages: newMessagesDB([
                this.cMod(m.chat,
                    await this.prepareMessage(m.chat, m.msg.selectedDisplayText, MessageType.extendedText, {
                    contextInfo: {
                        mentionedJid: m.msg.contextInfo && m.msg.contextInfo.mentionedJid ? m.msg.contextInfo.mentionedJid : []
                        },
                        ...(m.quoted ? { quoted: m.quoted.fakeObj } : {}),
                        messageId: m.id,
                    }),
                    m.msg.selectedDisplayText,
                    m.sender
                )
            ])
        })
    }
}