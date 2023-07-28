import { readFromFile, writeToFile } from './fsUtils'
import { TemplatesMetaDataPath, TemplatesPath } from '../common'

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
  const regEx = /{{2}.[a-zA-Z]+::.[_A-Z]+}{2}/gm

  const matches = contents.match(regEx)

  if (!matches) {
    throw Error('No matches found in template!')
  }

  const keyValuePairs: { [key: string]: string } = {}

  for (const match of matches) {
    let strippedStr = match.replace('{{', '')
    strippedStr = strippedStr.replace('}}', '')
    const [key, value] = strippedStr.split('::')

    keyValuePairs[key] = value
  }

  return keyValuePairs
}
