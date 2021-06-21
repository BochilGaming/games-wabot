const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const { spawn, exec } = require('child_process')
const FileType = require('file-type')
const ffmpeg = require('fluent-ffmpeg')

const tmp = path.join(__dirname, '../tmp')

/**
 * Image or Video to Sticker
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
          .on('error', (err) => {
              console.error(err)
              fs.unlinkSync(inp)
          })
          .on('end', async () => {
              console.log('Finish')
              fs.unlinkSync(inp) 
              let wm = await sticker2(out, packname, author)
              resolve(wm)
              fs.unlinkSync(out)
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
            .on('error', (err) => {
                console.log(err)
                fs.unlinkSync(inp)
            })
            .on('end', async () => {
            console.log('Finish')
            fs.unlinkSync(inp)
            let wm = await sticker2(out, packname, author)
            resolve(wm)
            fs.unlinkSync(out)
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
 * @return webp buffer
*/

/**
 * Creates Exif Metadata File
 * @param pack
 * @param author
 */
function createExif(pack = global.packname, author = global.author) {
    const stickerPackID = 'com.etheral.waifuhub.android.stickercontentprovider b5e7275f-f1de-4137-961f-57becfad34f2'
    const json = {
        'sticker-pack-id': stickerPackID,
        'sticker-pack-name': pack,
        'sticker-pack-publisher': author
    }

    let length = new TextEncoder().encode(JSON.stringify(json)).length
    const f = Buffer.from([0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])
    const code = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]
    if (length > 256) {
        length = length - 256
        code.unshift(0x01)
    } else {
        code.unshift(0x00)
    }
    const fff = Buffer.from(code)
    const ffff = Buffer.from(JSON.stringify(json), 'utf-8')
    let len
    if (length < 16) {
        len = length.toString(16)
        len = '0' + length
    } else {
        len = length.toString(16)
    }

    const ff = Buffer.from(len, 'hex')
    const buffer = Buffer.concat([f, ff, fff, ffff])
    let ran = (Math.floor(Math.random() * 10000)) * 1
    const fn = path.join(tmp, + author + '_' + pack + '.exif') || path.join(tmp, + ran + '.exif')
    fs.writeFileSync(fn, buffer)
    return fn
}
/**
 * @return exif Filename
*/

/**
 * Add author and packname to webp file
 * @param {String} path Path of Webp
 * @param {String} packname Packname
 * @param {String} author Author
 */
function sticker2(path, packname = global.packname, author = global.author) {
    let buffer
    try {
        const WebP = require('node-webpmux')
        let img = new WebP.Image()
        img.load(path)
        let exif = createExif(packname, author)
        img.exif = fs.readFileSync(exif)
        img.save(path)
        buffer = fs.readFileSync(path)
    } catch (e) {
        console.error(e)
        buffer = fs.readFileSync(path)
    } finally {
        return buffer
    }
}
/**
 * @return Buffer from Webp
*/

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
