import path from 'path'
import { readDir, readFromFile, writeToFile } from './fsUtils'
import { TemplatesMetaDataPath, TemplatesPath } from '../common'

interface KeyValuePair {
  key: string
  value: string
  type: string
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
  const regEx = /{{2}.[a-zA-Z]+::.[_A-Z]+::.[a-z]+}{2}/gm

  const matches = contents.match(regEx)

  if (!matches) {
    console.error('No matches found in template!')
    return
  }

  const keyValuePairs: KeyValuePair[] = []

  for (const match of matches) {
    let strippedStr = match.replace('{{', '')
    strippedStr = strippedStr.replace('}}', '')
    const [key, value, type] = strippedStr.split('::')

    const keyValuePair: KeyValuePair = {
      key,
      value,
      type,
    }

    keyValuePairs.push(keyValuePair)
  }

  return keyValuePairs
}
