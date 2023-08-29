import { themeSelector } from '../../store/store'
import { toggleTheme } from '../../store/themeSlice'
import {Theme} from '../../common/constants'
import { useDispatch, useSelector } from 'react-redux'
import {ReactComponent as SunSvg}  from '../../assets/sun.svg'
import {ReactComponent as MoonSvg}  from '../../assets/moon.svg'

const Header = () => {

  const dispatch = useDispatch()
  const theme = useSelector(themeSelector)

  const toggleThemeHandler = () => {
    dispatch(toggleTheme())
  }

  const getThemeToggleButton = () => {

    if (theme === Theme.Light) {
      return <MoonSvg></MoonSvg>
    } else {
      return <SunSvg></SunSvg>
    }
  }

  return (
    <header className='flex justify-between items-center text-3xl p-4 bg-sky-600'>
      <span className='text-xl text-white font-bold'>PDF Generator</span>
      <div className='h-6 w-6 text-white hover:cursor-pointer' onClick={toggleThemeHandler}>{getThemeToggleButton()}</div>
    </header>
  )
}

export default Header;

      