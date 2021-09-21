//created by zatu22, WilfredAlmeida, idhamthoriqbot

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
    
 conn.sendButton(m.chat, IMAGE__title, 'ChatBot', IMAGE__URL, [
        ['MENU', '/menu'],
        ['MORE MEME', '/meme']

    ])
}

handler.help = ['meme']
handler.tags = ['random']
handler.command = /^meme$/i

handler.fail = null

module.exports = handler
