import { readFile } from 'node:fs/promises'
import * as pdf from 'html-pdf'
import { Keys } from '../common'

export function fillTemplateDetails(contents: string, details: any) {
  const { companyName } = details

  const modifiedContents = contents.replace(Keys.CompanyName, companyName)

  return modifiedContents
}

export async function readTemplate(filePath: string) {
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

export async function generatePdf(
  htmlFilePath: string,
  outputFilePath: string
) {
  const htmlTemplate = await readTemplate(htmlFilePath)
  const options = {
    height: '896px',
    width: '598px',
    localUrlAccess: true,
    quality: '100',
  }

  const tempData = pdf
    .create(htmlTemplate, options)
    .toFile(outputFilePath, (err: any, res: any) => {
      if (err) return console.log(err)

      console.log(res)
    })

  console.log('generating pdf, tempData', tempData)
}
