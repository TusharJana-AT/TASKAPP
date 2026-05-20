import { messages } from "../messages/index.js";
import { getUser, loginUser, registerUser } from "../services/user.service.js";
import { response } from "../utils/response.util.js";


export const register=async(req,res,next)=>{
    try {
        const data=await registerUser(req.body);

        return response(res,{
            statusCode:200,
            message:messages.auth.SIGNUP_SUCCESS,
            data,
        })
    } catch (error) {
        next(error)
    }
}

export const login=async(req,res,next)=>{
    try {
        const data=await loginUser(req.body);

        return response(res,{
            statusCode:200,
            message:messages.auth.SIGNIN_SUCCESS,
            data,
        })
    } catch (error) {
        next(error)
    }
}

export const getCurrentUser=async(req,res,next)=>{
    try {
        const userId=req.user.id
        // console.log("YOLO ",userId);
        
        const data=await getUser({userId})

        return response(res,{
            statusCode:200,
            data
        })
    } catch (error) {
        next(error)
    }
}