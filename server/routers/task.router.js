import { Router } from "express"
import { addTask, deleteTask, editTask, getSingleTask, getTask } from "../controllers/task.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js"
import { validate } from "../middleware/validations.middleware.js"
import { addTaskValidation, editTaskValidation } from "../validations/task.validation.js"


const taskRouter=Router()

taskRouter.post('/addTask',verifyToken,validate(addTaskValidation),addTask)
taskRouter.delete('/deleteTask/:taskId',verifyToken,deleteTask)
taskRouter.put('/editTask/:taskId',verifyToken,validate(editTaskValidation),editTask)
taskRouter.get('/getTask',verifyToken,getTask)
taskRouter.get('/getSingleTask/:taskId',verifyToken,getSingleTask)

export default taskRouter   