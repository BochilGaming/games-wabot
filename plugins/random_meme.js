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
    
    conn.sendButton(m.chat, titel = IMAGE__title, footer = ('ChatBot'), buffer = IMAGE__URL, button = [["/meme"]])
}

handler.help = ['meme']
handler.tags = ['random']
handler.command = /^meme$/i

handler.fail = null

module.exports = handler
