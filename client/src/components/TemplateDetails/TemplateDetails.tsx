import { useSelector } from "react-redux"
import { templateSelector } from "../../store/store"
import { useState } from "react"
import ApiService from "../../services/ApiService"
import { useNavigate } from "react-router-dom"
import Paths from "../../common/paths"

const TemplateDetails = () => {

  const navigate = useNavigate()

  const templateId = useSelector(templateSelector)

  const [processing, setProcessing] = useState(false)

  const [companyName, setCompanyName] = useState('')

  const generatePdfClickHandler = async () => {

    const details = {
      companyName,
      templateId
    }

    setProcessing(true)

    await ApiService.sendInputDetails(details)

    setProcessing(false)

    navigate(Paths.TemplateReview)
  }

  const getGenerateButton = () => {

    const buttonText = processing ? 'Generating...' : 'Generate PDF'

    return (
      <button className="border rounded px-4 py-2 bg-blue-900 text-white w-36"
        onClick={generatePdfClickHandler}>
          {buttonText}
      </button>
    )
  }

  return (
    <div className="flex flex-col bg-slate-50 h-screen w-1/2 items-start p-8 m-8">
      <input className="border rounded p-2 my-4 w-2/3"
        name="company-name"
        defaultValue={companyName}
        placeholder="Company Name"
        onChange={e => setCompanyName(e.target.value)} />

      {/* <input className="border rounded p-2 my-4 w-2/3"
        name="company-name"
        defaultValue={companyName}
        placeholder="Company Name"
        onChange={e => setCompanyName(e.target.value)} /> */}

        {getGenerateButton()}
    </div>
  )
}

export default TemplateDetails