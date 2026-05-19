import jwt from "jsonwebtoken"
import { response } from "../utils/response.util.js"
import { messages } from "../messages/index.js"

const SECRET=process.env.MY_SECRET

export const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.authorization

    if(!authHeader){
        // return res.status(401).json({message:"Unauthorized"})
        return response({
            statusCode:200,
            message:messages.general.UNAUTHORIZED
        })
    }

    try {
        const token=authHeader.split(" ")[1]
        const decode = jwt.verify(token,SECRET)

        req.user=decode

        next()
    } catch (error) {
        next(error)
    }
}