//created by zatu22, WilfredAlmeida

let fetch = require('node-fetch');
let fs = require('fs');
let path = require('path');

let { MessageType } = require('@adiwajshing/baileys')

let handler = async(m, { conn, text }) => {
 
    var IMAGE__URL = ""
    await fetch("https://meme-api.herokuapp.com/gimme").then(res => res.text()).then(text => {
        jso = JSON.parse(text)
        IMAGE__URL = jso.url
        IMAGE__title = jso.title
        console.log(`Image URL ${IMAGE__URL}`);
    }).catch((error) => console.log("ERROR: ", error));

    let buttons = button('©Reddit')
    let msgtitel = IMAGE__title

    await conn.sendFile(
            m.chat,
            IMAGE__URL,
            '*',
            msgtitel,
            m,
       ),           
        conn.sendMessage(
            m.chat,
            buttons,
            MessageType.buttonsMessage,
        )
}

handler.help = ['meme']
handler.tags = ['random']
handler.command = /^meme$/i

handler.fail = null

module.exports = handler

function button(teks) {

    const buttons = [
        { buttonId: 'id1', buttonText: { displayText: '/menu' }, type: 1 },
        { buttonId: 'id2', buttonText: { displayText: '/meme' }, type: 1 }
    ]

    const buttonMessage = {
        contentText: teks,
        footerText: '©Chatbot',
        buttons: buttons,
        headerType: 1
    }

    return buttonMessage
}
