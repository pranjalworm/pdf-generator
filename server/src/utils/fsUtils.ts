import { readdir, readFile, writeFile } from 'node:fs/promises'
import { Keys } from '../common'

export async function readDir(path: string) {
  try {
    return await readdir(path, { withFileTypes: true })
  } catch (error) {
    console.error(error)
  }
}

export async function writeHtmlFile(filePath: string, contents: string) {
  await writeFile(filePath, contents, { encoding: 'utf-8' })
}
