import { readdir, readFile, writeFile } from 'node:fs/promises'

export async function readDir(path: string) {
  try {
    return await readdir(path, { withFileTypes: true })
  } catch (error) {
    console.error(error)
  }
}

export async function writeToFile(filePath: string, contents: string) {
  try {
    await writeFile(filePath, contents, { encoding: 'utf-8' })
  } catch (error) {
    console.error(error)
  }
}

export async function readFromFile(filePath: string) {
  try {
    const data = await readFile(filePath, { encoding: 'utf-8' })

    if (!data) {
      throw Error('Template is empty!')
    }

    return data
  } catch (error) {
    console.error(error)
  }
}
