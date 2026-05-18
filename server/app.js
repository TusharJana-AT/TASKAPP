import express from 'express'
import userRouter from './routers/user.router.js'

const app=express()



app.use('/api/user',userRouter)


app.use((err,req,res,next)=>{
    console.log(err);
    
})


export default app;