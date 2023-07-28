import { configureStore } from '@reduxjs/toolkit'
import templateReducer from './templateSlice'
import themeReducer from './themeSlice'

const store = configureStore({
  reducer: {
    template: templateReducer,
    theme: themeReducer,
  },
})

export const templateSelector = () => store.getState().template.value

export const themeSelector = () => store.getState().theme.value

export default store
