import { useSelector } from "react-redux"
import { templateSelector } from "../../store/store"
import { useEffect, useState } from "react"
import ApiService from "../../services/ApiService"
import { useNavigate } from "react-router-dom"
import Paths from "../../common/paths"
import TextInput from "../TextInput"
import TextAreaInput from "../TextAreaInput"
import NumberInput from "../NumberInput"
import ImageInput from "../ImageInput"

const TemplateDetails = () => {

  const navigate = useNavigate()
  const templateId = useSelector(templateSelector)

  const [processing, setProcessing] = useState(false)
  const [templateDetails, setTemplateDetails] = useState<any[]>([])

  useEffect(() => {
    const getTemplateDetails = async () => {
      const templateDetails = await ApiService.getTemplateDetails(templateId)
      setTemplateDetails(templateDetails)
      console.log(templateDetails)
    }

    getTemplateDetails()
  }, [])

  const previewPdfHandler = async () => {

    const details = {
      templateId
    }

    setProcessing(true)

    await ApiService.sendTemplateDetails(details)

    setProcessing(false)

    navigate(Paths.TemplateReview)
  }

  const getInputField = (entry: {[key: string]: string}, i: number) => {

    switch(entry.type) {
      case 'text':
        return <TextInput key={i} defaultValue=""/>

      case 'textarea':
        return <TextAreaInput key={i} defaultValue=""/>

      case 'number':
        return <NumberInput key={i} defaultValue="" />

      case 'image':
        return <ImageInput key={i} defaultValue=""/>
    }
  }

  return (
    <div className="flex flex-col bg-slate-50 h-screen w-1/2 items-start p-8 m-8">

      {
        templateDetails.length && templateDetails.map((entry, i) => getInputField(entry, i))
      }

      <button className="border rounded px-4 py-2 bg-blue-900 text-white w-36"
        onClick={previewPdfHandler}>
        Preview PDF
      </button>
    </div>
  )
}

export default TemplateDetails