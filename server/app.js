import express from 'express'

const app=express()



app.use('/',(req,res)=>{
    res.send('Hey Man ')
})



export default app