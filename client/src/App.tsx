import { useEffect, useState } from 'react'
import './App.css'
import ApiService from './services/ApiService'
import TemplateCard from './components/TemplateCard/TemplateCard'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectTemplate } from './store/templateSlice'
import Paths from './common/paths'
import Header from './components/Header/Header'
import { themeSelector } from './store'
import { Theme } from './common'


function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = useSelector(themeSelector)
  
  const [templatesData, setTemplatesData] = useState<any[] | null>(null)

  useEffect(() => {

    const getTemplates = async () => {

      const data = await ApiService.getTemplates()
      setTemplatesData(data)
    }

    getTemplates();
  }, [])

  const templateClickHandler = (i: number) => {

    const payload = templatesData && templatesData[i].id
    dispatch(selectTemplate(payload))
    navigate(Paths.TemplateForm)
  }

  const getTemplatesView = () => {

    if (!templatesData) {
      return null;
    } else if (!templatesData.length) {
      return 'No templates found!'
    }

    return (
      <div className='flex flex-row m-4'>
        {templatesData.map((templateData, i) => {
          return (
          <TemplateCard
            key={i}
            name={templateData.name}
            template={templateData.template}
            clickCallback={templateClickHandler}
            index={i}/>)
        })}
      </div>
    )
  }

  return (
    <div className={theme === Theme.Light ? '' : 'dark'}>
      <div className="w-full h-screen bg-white dark:bg-sky-950">
      
        <Header />

        {getTemplatesView()}
      </div>
    </div>
  )
}

export default App
