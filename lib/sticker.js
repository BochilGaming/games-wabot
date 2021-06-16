const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const { spawn, exec } = require('child_process')
const FileType = require('file-type')
const ffmpeg = require('fluent-ffmpeg')
const uploadImage = require('./uploadImage')
const uploadFile = require('./uploadFile')

const tmp = path.join(__dirname, '../tmp')
/**
 * Image to Sticker
 * @param {Buffer} img Image Buffer
 * @param {String} url Image URL
 * @param {String} mime Image Mime
 * @param {String} packname Packname
 * @param {String} author Author 
 */
function sticker1(img, url, mime, packname = global.packname, author = global.author) {
  return new Promise(async (resolve, reject) => {
    try {
      if (url) {
        let res = await fetch(url)
        if (res.status !== 200) throw await res.text()
        img = await res.buffer()
        mime = 'image/jpeg'
      }
      let ran = (Math.floor(Math.random() * 10000)) * 1
      let out = path.join(tmp, + ran + '.webp')
      let inp = path.join(tmp, + ran + '.' + (mime.split`/`[1]))
      fs.writeFileSync(inp, img)
      if (/jpe?g|png/g.test(mime)) {
          await ffmpeg(inp)
          .input(inp)
          .on('start', function (cmd) {
              console.log(`Started : ${cmd}`)
              
          })
          .on('error', reject)
          .on('end', function () {
              console.log('Finish')
              fs.unlinkSync(inp) 
              let wm = sticker2(out, packname, author)
              resolve(wm)
              })
              .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
              .toFormat('webp')
              .save(out)
      } else if (/video/g.test(mime)) {
          await ffmpeg(inp)
            .inputFormat(mime.split('/')[1])
            .on('start', function (cmd) {
            console.log(`Started : ${cmd}`)
        })
            .on('error', function(e) {
            console.log(e)
        })
            .on('end', function () {
            console.log('Finish')
            fs.unlinkSync(inp)
            let wm = sticker2(out, packname, author)
             resolve(wm)
        })
            .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
            .toFormat('webp')
            .save(out)
      } else if (/webp/g.test(mime)) {
          resolve(sticker2(inp, packname, author))
      }
        
    } catch (e) {
        reject(e)
    }
  })
}

/**
 * Add wm
 * @param {Buffer} sticker Sticker Buffer
 * @param {String} packname Packname
 * @param {String} author Author
 */
function addMetadata(packname,  author) {
    if (!packname) packname = global.packname
    if (!author) author = global.author
    author = author.replace(/[^a-zA-Z0-9]/g, '')	
    let name = path.join(tmp, + author + '_' + packname + '.exif')
    if (fs.existsSync(name)) return 
    const json = {	
        "sticker-pack-name": packname,
        "sticker-pack-publisher": author
    }
    const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
    const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	
    let len = JSON.stringify(json).length	
    let last	
    if (len > 256) {	
        len = len - 256	
        bytes.unshift(0x01)	
        
    } else {	
        bytes.unshift(0x00)	
    }	
    if (len < 16) {	
        last = len.toString(16)	
        last = "0" + len	
        
    } else {	
        last = len.toString(16)	
        
    }	
    const buf2 = Buffer.from(last, "hex")	
    const buf3 = Buffer.from(bytes)	
    const buf4 = Buffer.from(JSON.stringify(json))	
    const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	
    fs.writeFile(name, buffer, (err) => {	
        return name
        
    })	
}

function sticker2(path, packname = global.packname, author = global.author) {
    let buffer
    try {
        exec(`webpmux -set exif ${addMetadata(packname, author)} ${path} -o ${path}`)
    } catch (e) {
        buffer = fs.readFileSync(path)
        console.log(e)
    } finally {
        buffer = fs.readFileSync(path)
        return buffer
    }
}
module.exports = {
  /**
   * Image/Video to Sticker or webp to add wm
   * @param {Buffer} img Image/Video/Webp Buffer
   * @param {String} url Image/Video URL
   * @param {...String} 
   */
  async sticker(img, url, ...args) {
    let lastError
    for (let func of [sticker1]) {
      try {
        return await func(img, url, ...args)
      } catch (err) {
        lastError = err
      }
    }
    throw lastError
  },
  sticker1,
  sticker2
}
