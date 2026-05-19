import express from 'express'
import userRouter from './routers/user.router.js'
import { messages } from './messages/index.js'
import { response } from './utils/response.util.js'
import taskRouter from './routers/task.router.js'

const app=express()

app.use(express.json())


app.use('/api/user',userRouter)

app.use('/api/task',taskRouter)


app.use((err,req,res,next)=>{
    console.log(err);

    return response(res, {
    statusCode: err.statusCode || 500,
    message: err.message || messages.general.INTERNAL_SERVER_ERROR,
    error: err,
  });
})


export default app;