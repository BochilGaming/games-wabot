import got from "got";
import fetch from "node-fetch";
import cheerio from "cheerio";

async function wikipedia(querry) {
  try {
    const link = await got.get(`https://id.wikipedia.org/wiki/${querry}`);
    const $ = cheerio.load(link.body);
    let judul = $("#firstHeading").text().trim();
    let thumb =
      $("#mw-content-text")
        .find(
          "div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img"
        )
        .attr("src") || `//k.top4top.io/p_2121ug8or0.png`;
    let isi = [];
    $("#mw-content-text > div.mw-parser-output").each(function (rayy, Ra) {
      let penjelasan = $(Ra).find("p").text().trim();
      isi.push(penjelasan);
    });
    for (let i of isi) {
      const data = {
        status: link.status,
        result: {
          judul: judul,
          thumb: "https:" + thumb,
          isi: i,
        },
      };
      return data;
    }
  } catch (err) {
    var notFond = {
      status: link.status,
      Pesan: eror,
    };
    return notFond;
  }
}

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Contoh penggunaan ${usedPrefix}${command} Minecraft`;
  let res = await wikipedia(`${text}`).catch(() => {
    throw "Not found";
  });
  m.reply(`*${res.result.judul}*\n\n${res.result.isi}`);
};
handler.help = ["wikipedia"].map((v) => v + " <apa>");
handler.tags = ["internet"];
handler.command = /^(wiki|wikipedia)$/i;

export default handler;
