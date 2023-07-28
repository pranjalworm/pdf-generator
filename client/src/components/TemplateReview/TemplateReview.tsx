import { useEffect, useState } from "react"
import TemplatePreview from "../TemplatePreview/TemplatePreview"
import ApiService from "../../services/ApiService"
import { useSelector } from "react-redux"
import { templateSelector } from "../../store"
import { useNavigate } from "react-router-dom"

const TemplateReview = () => {

  const template = useSelector(templateSelector)
  const navigate = useNavigate()
  const [templateHtml, setTemplateHtml] = useState<TrustedHTML | null>(null)

  useEffect(() => {

    const fetchTemplate = async () => {
      const templateHtml = await ApiService.getTemplatePreview(template)
      console.log('template', templateHtml)
      setTemplateHtml(templateHtml)
    }

    fetchTemplate()
  }, [])

  const goBackHandler = () => {
    navigate(-1)
  }

  const downloadPdfHandler = () => {
    ApiService.generatePdf(template)
  }
 
  return (
    <div>
      <div className="">
        {templateHtml ? <TemplatePreview template={templateHtml}/> : 'Loading'}
      </div>
      <div>
        <button onClick={goBackHandler}>Back</button>
        <button onClick={downloadPdfHandler}>Download PDF</button>
      </div>
    </div>
    
  )
}

export default TemplateReview