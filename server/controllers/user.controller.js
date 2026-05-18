import { loginUser, registerUser } from "../services/user.service.js";


export const register=async(req,res,next)=>{
    try {
        const data=await registerUser(req.body);
    } catch (error) {
        next(error)
    }
}

export const login=async(req,res,next)=>{
    try {
        const data=await loginUser();
    } catch (error) {
        next(error)
    }
}