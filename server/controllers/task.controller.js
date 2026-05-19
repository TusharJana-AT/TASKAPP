import { messages } from "../messages/index.js"
import { createTask, destroyTask, getData, updateTask } from "../services/task.service.js"
import { response } from "../utils/response.util.js"

export const addTask=async(req,res,next)=>{
    try {
        const data=await createTask({...req.body,userId:req.user.id})
        console.log(req.user.id)

        return response(res,{
            statusCode:200,
            message:messages.task.TASK_ADDED,
            data
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTask=async(req,res,next)=>{
    try {
 
        const taskId=req.params.taskId
        const userId=req.user.id
        await destroyTask({taskId,userId})

        return response(res,{
            statusCode:200,
            message:messages.task.DELETE_TASK
        })
    } catch (error) {
        next(error)
    }
}


export const editTask=async(req,res,next)=>{
    try {
        const taskId=req.params.taskId
        const userId=req.user.id
        const edited=await updateTask({...req.body,taskId,userId})

        return response(res,{
            statusCode:200,
            message:messages.general.SUCCESS,
            data:edited
        })
    } catch (error) {
        next(error)
    }
}

export const getTask=async(req,res,next)=>{
    try {
        const userId=req.user.id
        const data=await getData({userId})

        return response(res,{
            statusCode:200,
            data
        })
    } catch (error) {
        next(error)
    }
}