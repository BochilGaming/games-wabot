const fs = require('fs')
const WSF = require('wa-sticker-formatter')
const path = require('path')
const fetch = require('node-fetch')
const { spawn } = require('child_process')
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
function sticker1(img, url, mime, packname, author) {
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
      if (/image/g.test(mime)) {
          await ffmpeg(inp)
          .input(inp)
          .on('start', function (cmd) {
              console.log(`Started : ${cmd}`)
              
          })
          .on('error', reject)
          .on('end', function () {
              console.log('Finish')
              fs.unlinkSync(inp) 
              let wm = sticker2(fs.readFileSync(out), packname, author)
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
          .on('error', reject) 
          .on('end', function () {
              console.log('Finish')
              fs.unlinkSync(inp)
              let wm = sticker2(fs.readFileSync(out), packname, author)
              resolve(wm)
          })
          .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
          .toFormat('webp')
          .save(out)
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
function sticker2(sticker, packname,  author) {
    const webpWithMetadata = WSF.addMetadataToWebpBuffer(sticker, packname, author) 
    return webpWithMetadata
}

module.exports = {
  /**
   * Image/Video to Sticker
   * @param {Buffer} img Image/Video Buffer
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
  sticker1
}
