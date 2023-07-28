import { createSlice } from '@reduxjs/toolkit'
import { Theme } from '../common/constants'

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: Theme.Light,
  },
  reducers: {
    toggleTheme: (state) => {
      if (state.value === Theme.Light) {
        state.value = Theme.Dark
      } else {
        state.value = Theme.Light
      }
    },
  },
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer
