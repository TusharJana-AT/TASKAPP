import { Router } from "express"
import { addTask, deleteTask, editTask, getTask } from "../controllers/task.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js"


const taskRouter=Router()

taskRouter.post('/addTask',verifyToken,addTask)
taskRouter.delete('/deleteTask/:taskId',verifyToken,deleteTask)
taskRouter.put('/editTask/:taskId',verifyToken,editTask)
taskRouter.get('/getTask',verifyToken,getTask)

export default taskRouter   