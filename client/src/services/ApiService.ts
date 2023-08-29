import { APIs } from '../common/constants'

export default class ApiService {
  static async getTemplates() {
    try {
      const response = await fetch(APIs.Templates)
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  }

  static async getTemplateDetails(templateId: string) {
    try {
      const apiUrl = `${APIs.TemplateDetails}?templateId=${templateId}`
      const response = await fetch(apiUrl)
      const data = response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  }

  static async sendTemplateDetails(payload: any) {
    try {
      const response = await fetch(APIs.TemplateDetails, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      return data
    } catch (error) {
      console.error(error)
    }
  }

  static async getTemplatePreview(templateId: string) {
    try {
      const apiUrl = `${APIs.TemplatePreview}?templateId=${templateId}`
      const response = await fetch(apiUrl)
      const data = await response.json()
      return data.template
    } catch (error) {
      console.error(error)
    }
  }

  static async generatePdf(templateId: string) {
    try {
      const apiUrl = `${APIs.GeneratePdf}?templateId=${templateId}`
      const response = await fetch(apiUrl)
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  }
}
