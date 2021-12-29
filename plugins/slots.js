let { MessageType } = require('@adiwajshing/baileys')
let num = /([0-9])$/i
let handler = async (m, { conn, text }) => {
    if (!text) throw 'Masukkan Jumlah Uang Yang Ingin Anda Slot'
    if (!num.test(text)) throw 'Hanya Angka'
    let money = text * 1
    let jackpot = Math.ceil(money * 5)
    let win = Math.ceil(money * 2)
    if (money < 10) throw 'Minimal 10'
    let users = global.DATABASE._data.users
    if (money > users[m.sender].money) throw 'Uang Anda Tidak Cukup'
    let emojis = ["🍏","🍎","🍊","🍋","🍑","🪙","🍅","🍐","🍒","🥥","🍌"];
    let a = Math.floor(Math.random() * emojis.length);
    let b = Math.floor(Math.random() * emojis.length);
    let c = Math.floor(Math.random() * emojis.length);
    let x = [],
        y = [],
        z = [];
    for (let i = 0; i < 3; i++) {
        x[i] = emojis[a];
        a++;
        if (a == emojis.length) a = 0;
    }
    for (let i = 0; i < 3; i++) {
        y[i] = emojis[b];
        b++;
        if (b == emojis.length) b = 0;
    }
    for (let i = 0; i < 3; i++) {
        z[i] = emojis[c];
        c++;
        if (c == emojis.length) c = 0;
    }
    let end;
    if (a == b && b == c) {
        end = "_*JACKPOT*_";
        hasil = `Win With 3 Thing Common +${jackpot} Money`;
        gcha = `${x[0]} | ${y[0]} | ${z[0]}\n${x[1]} | ${y[1]} | ${z[1]} <=== ${end}\n${x[2]} | ${y[2]} | ${z[2]}`;
        global.DATABASE._data.users[m.sender].money += jackpot
        await conn.fakeReply(m.chat, `*[ 🎰 VIRTUAL SLOT 🎰 ]*\n\n${gcha}\n\n*[ 🎰 VIRTUAL SLOT 🎰 ]*`, '0@s.whatsapp.net', `${hasil}`, 'status@broadcast')

    } else if (a == b || a == c || b == c) {
        end = "_*YOU WIN*_";
        hasil = `Win With 2 Things Common +${win} Money`;
        gcha = `${x[0]} | ${y[0]} | ${z[0]}\n${x[1]} | ${y[1]} | ${z[1]} <=== ${end}\n${x[2]} | ${y[2]} | ${z[2]}`;
        global.DATABASE._data.users[m.sender].money += win
        await conn.fakeReply(m.chat, `*[ 🎰 VIRTUAL SLOT 🎰 ]*\n\n${gcha}\n\n*[ 🎰 VIRTUAL SLOT 🎰 ]*`, '0@s.whatsapp.net', `${hasil}`, 'status@broadcast')
    } else {
        end = "_*YOU LOSE*_";
        hasil = `Hopefully You Are Lucky Next -${money} Money`;
        gcha = `${x[0]} | ${y[0]} | ${z[0]}\n${x[1]} | ${y[1]} | ${z[1]} <=== ${end}\n${x[2]} | ${y[2]} | ${z[2]}`;
        global.DATABASE._data.users[m.sender].money -= money
        await conn.fakeReply(m.chat, `*[ 🎰 VIRTUAL SLOT 🎰 ]*\n\n${gcha}\n\n*[ 🎰 VIRTUAL SLOT 🎰 ]*`, '0@s.whatsapp.net', `${hasil}`, 'status@broadcast')
    }
}
handler.help = ['slot']
handler.tags = ['game']
handler.command = /^(slot)$/i

module.exports = handler
