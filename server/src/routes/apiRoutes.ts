import express from 'express'
import path from 'path'
import {
  fillTemplateDetails,
  readDir,
  writeToFile,
  readFromFile,
  generatePdf,
} from '../utils'
import bodyParser from 'body-parser'
import { APIs } from './routes'
import {
  TemplatesPath,
  PreviewFilesPath,
  OutputFilesPath,
  TemplatesMetaDataPath,
} from '../common'
import { parseTemplate } from '../utils/templateParser'

const router = express.Router()
const jsonParser = bodyParser.json({ type: 'application/json' })

// API to list all available templates
router.get(APIs.Templates, async (req, res) => {
  const templatesPath = path.resolve(TemplatesPath)

  const files = await readDir(templatesPath)

  if (!files || !files.length) {
    res.send('No templates present!')
    return
  }

  const templateData = []

  for (const file of files) {
    const filePath = `${TemplatesPath}/${file.name}`
    // TODO: refactor this to use promisesArr
    const template = await readFromFile(filePath)

    const data = {
      id: file.name,
      name: file.name.replace('.html', ''),
      template,
    }

    templateData.push(data)
  }

  res.send(templateData)
})

router.get(APIs.TemplateDetails, async (req, res) => {
  const params = req.query

  const { templateId } = params

  if (!templateId) {
    res.send({ success: false, error: 'Provide templateId' })
    return
  }

  const data = (await readFromFile(TemplatesMetaDataPath)) as string
  const templatesMetaData = JSON.parse(data)

  const templateMetaData = templatesMetaData[templateId as string]

  res.send(templateMetaData)
})

// API to fill template details
router.post(APIs.TemplateDetails, jsonParser, async (req, res) => {
  const { templateId, companyName } = req.body

  const templateDetails = {
    companyName,
  }

  const templatePath = `${TemplatesPath}/${templateId}`

  const contents = (await readFromFile(templatePath)) as string

  const modifiedContents = fillTemplateDetails(contents, templateDetails)

  const filePath = `${PreviewFilesPath}/${templateId}`

  await writeToFile(filePath, modifiedContents)

  res.send({ success: true })
})

// API to showcase final template with filled in details
router.get(APIs.TemplateReview, async (req, res) => {
  const params = req.query

  const { templateId } = params

  // TODO: make this more robust
  if (!templateId) {
    return
  }

  const filepath = `${PreviewFilesPath}/${templateId}`
  const template = await readFromFile(filepath)

  const response = {
    template,
  }

  res.send(response)
})

// API to generate PDF from template HTML file
router.get(APIs.GeneratePdf, async (req, res) => {
  const params = req.query

  const { templateId } = params

  // TODO: make this more robust
  if (!templateId) {
    return
  }

  const filepath = `${PreviewFilesPath}/${templateId}`
  const outputPath = `${OutputFilesPath}/${templateId}.pdf`

  generatePdf(filepath, outputPath)
})

// API to parse html template
router.get(APIs.ParseHtml, async (req, res) => {
  const params = req.query

  const { templateId } = params

  // TODO: make this more robust
  if (!templateId) {
    return
  }

  await parseTemplate(templateId as string)

  res.send({ success: true })
})

export default router
