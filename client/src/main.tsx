import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import TemplateForm from './components/TemplateForm'
import Paths from './common/paths'
import TemplateReview from './components/TemplateReview'

const router = createBrowserRouter([
  {
    path: Paths.Root,
    element: <App></App>
  },
  {
    path: Paths.TemplateForm,
    element: <TemplateForm />
  },
  {
    path: Paths.TemplateReview,
    element: <TemplateReview />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>,
)
