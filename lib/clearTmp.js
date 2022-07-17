import Helper from './helper.js'
import { promises as fs } from 'fs'
import { tmpdir, platform } from 'os'
import { join } from 'path'

const TIME = 1000 * 60 * 3

const __dirname = Helper.__dirname(import.meta)

export default async function clearTmp() {
    const tmp = [tmpdir(), join(__dirname, '../tmp')]
    const filename = []

    await Promise.allSettled(tmp.map(async (dir) => {
        const files = await fs.readdir(dir)
        for (const file of files) filename.push(join(dir, file))
    }))

    return await Promise.allSettled(filename.map(async (file) => {
        const stat = await fs.stat(file)
        if (stat.isFile() && (Date.now() - stat.mtimeMs >= TIME)) {
            // https://stackoverflow.com/questions/28588707/node-js-check-if-a-file-is-open-before-copy
            if (platform() === 'win32') {
                // https://github.com/nodejs/node/issues/20548
                // https://nodejs.org/api/fs.html#filehandleclose
                let fileHandle
                try {
                    fileHandle = await fs.open(file, 'r+')
                } catch (e) {
                    console.error('[clearTmp]', e, 'Skipping', file)
                    return e
                } finally {
                    await fileHandle?.close()
                }
            }
            await fs.unlink(file)
        }
    }))
}
