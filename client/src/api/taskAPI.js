import { api } from "./api"



export const addTask=(data)=>{
    return api.post('/task/addTask',data)
}

export const deleteTask=(taskId)=>{
    return api.delete(`/task/deleteTask/${taskId}`)
}

export const editTask=(data,taskId)=>{
    return api.put(`/task/editTask/${taskId}`,data)
}

export const getTask=()=>{
    return api.get('/task/getTask')
}