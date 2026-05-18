import { User } from "../models/index.js"


export const registerUser=async(data)=>{
    const exist=await User.findOne(data.id)
    if(exist){
        throw "error"
    }
}


export const loginUser=()=>{
    
}