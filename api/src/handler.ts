import type { VercelRequest, VercelResponse } from '@vercel/node'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import expensesRouter from '../../api/src/routes/expenses'
import tasksRouter from '../../api/src/routes/tasks'
import reportsRouter from '../../api/src/routes/reports'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/expenses', expensesRouter)
app.use('/tasks', tasksRouter)
app.use('/reports', reportsRouter)

app.get('/health', (req: any, res: any) => {
  res.json({ status: 'ok' })
})

export default app
