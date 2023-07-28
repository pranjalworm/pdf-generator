import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import apiRouter from './routes/apiRoutes'
import { parseAllTemplates } from './utils/templateParser'

parseAllTemplates()

const app = express()

dotenv.config()

const PORT = process.env.PORT

app.use(cors())

app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log(`PDF Generator Server is started on port: ${PORT}`)
})
