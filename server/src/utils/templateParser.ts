import path from 'path'
import { readDir, readFromFile, writeToFile } from './fsUtils'
import { TemplatesMetaDataPath, TemplatesPath } from '../common'

interface KeyValuePair {
  key: string
  type: string
  value: string
}

export async function parseAllTemplates() {
  const templatesPath = path.resolve(TemplatesPath)

  const files = await readDir(templatesPath)

  if (!files || !files.length) {
    console.info('No templates present')
    return
  }

  const promisesArr = []

  for (const file of files) {
    const templateId = file.name
    console.info('Parsing template', templateId)
    promisesArr.push(parseTemplate(templateId))
  }

  await promisesArr

  console.info('Successfully parsed all templates')
}

export async function parseTemplate(templateId: string) {
  const templatePath = `${TemplatesPath}/${templateId}`
  const contents = await readFromFile(templatePath)

  if (!contents) {
    throw Error('Template is empty!')
  }

  const keyValuePairs = extractKeyValuePairs(contents)

  const data = (await readFromFile(TemplatesMetaDataPath)) as string
  const templatesMetaData = JSON.parse(data)

  templatesMetaData[templateId] = keyValuePairs

  const dataCopy = { ...templatesMetaData }

  // write meta data to file
  await writeToFile(TemplatesMetaDataPath, JSON.stringify(dataCopy))
}

function extractKeyValuePairs(contents: string) {
  const regex = /{{2}.[a-zA-Z]+::.[a-z]+::.+}{2}/gm

  const matches = contents.match(regex)

  if (!matches) {
    console.error('No matches found in template!')
    return
  }

  const keyValuePairs: KeyValuePair[] = []

  for (const match of matches) {
    let strippedStr = match.replace('{{', '')
    strippedStr = strippedStr.replace('}}', '')
    const [key, type, value] = strippedStr.split('::')

    const keyValuePair: KeyValuePair = {
      key,
      type,
      value,
    }

    keyValuePairs.push(keyValuePair)
  }

  return keyValuePairs
}

export function getKeyRegex(key: string) {
  const regex = new RegExp(`{{2}${key}::.[a-z]+::.+}{2}`, 'gm')
  return regex
}
