import { createSlice } from '@reduxjs/toolkit'

const templateSlice = createSlice({
  name: 'template',
  initialState: {
    value: '',
  },
  reducers: {
    selectTemplate: (state, action) => {
      const templateId = action.payload
      state.value = templateId
    },
  },
})

export const { selectTemplate } = templateSlice.actions

export default templateSlice.reducer
