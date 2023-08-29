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
    <div className="flex flex-col">
      <div className="flex flex-col items-center border rounded p-4 m-4 bg-slate-50">
        {templateHtml ? <TemplatePreview template={templateHtml}/> : 'Loading'}
      </div>
      <div className="flex flex-row justify-evenly mt-8">
        <button onClick={goBackHandler} className="mx-8 py-2 px-4 text-sky-800 border rounded">Go back</button>
        <button onClick={downloadPdfHandler} className="py-2 px-4 bg-blue-900 text-white border rounded">Download PDF</button>
      </div>
    </div>
    
  )
}

export default TemplateReview