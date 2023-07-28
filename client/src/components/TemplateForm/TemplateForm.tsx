import Header from "../Header/Header"
import TemplateDetails from "../TemplateDetails"
// import TemplatePreview from "../TemplatePreview"

const TemplateForm = () => {

  
  return (

    <>
    <Header />
    <div className="flex flex-row max-w-full justify-center items-center">
      
      <TemplateDetails />

      {/* <TemplatePreview /> */}
    </div>
    </>
    
  )
}

export default TemplateForm