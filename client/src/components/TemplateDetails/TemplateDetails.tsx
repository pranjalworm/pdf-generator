import { useSelector } from "react-redux"
import { templateSelector } from "../../store/store"
import { useEffect, useState, useRef } from "react"
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

  const inputDetails = useRef<{[key: string]: string | number}>({})

  const [templateDetails, setTemplateDetails] = useState<any[]>([])

  useEffect(() => {
    const getTemplateDetails = async () => {
      const templateDetails = await ApiService.getTemplateDetails(templateId)
      console.log('template details', templateDetails)
      setTemplateDetails(templateDetails)

      for (const entry of templateDetails) {
        const key = entry.key
        inputDetails.current[key] = entry.value
      }
    }

    getTemplateDetails()
  }, [])

  const previewPdfHandler = async () => {

    const inputValues = inputDetails.current

    const payload = {
      templateId,
      details: inputValues
    }

    await ApiService.sendTemplateDetails(payload)

    navigate(Paths.TemplateReview)
  }

  const onInputChangeHandler = (key: string, value: string | number) => {
    
    inputDetails.current[key] = value
  }

  const getInputField = (entry: {[key: string]: string}, i: number) => {

    const {key, type, value} = entry

    switch(type) {
      case 'text':
        return <TextInput key={i} fieldKey={key} defaultValue={value} changeCallback={onInputChangeHandler}/>

      case 'textarea':
        return <TextAreaInput key={i} fieldKey={key} defaultValue={value} changeCallback={onInputChangeHandler} />

      case 'number':
        return <NumberInput key={i} fieldKey={key} defaultValue={value} changeCallback={onInputChangeHandler} />

      case 'image':
        return <ImageInput key={i} fieldKey={key} defaultValue={value} changeCallback={onInputChangeHandler}/>
    }
  }

  return (
    <div className="flex flex-col items-center bg-slate-50 h-screen w-1/2 p-8 m-8">

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