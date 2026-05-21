import express from 'express'
import cors from 'cors'
import userRouter from './routers/user.router.js'
import { messages } from './messages/index.js'
import { response } from './utils/response.util.js'
import taskRouter from './routers/task.router.js'
import { errorMiddleware } from './middleware/error.middleware.js'

const app=express()

app.use(cors())
app.use(express.json())


app.use('/api/user',userRouter)

app.use('/api/task',taskRouter)


app.use(errorMiddleware)


export default app;