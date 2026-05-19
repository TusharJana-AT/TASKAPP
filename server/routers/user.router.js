import { Router } from "express";
import { getCurrentUser, login, register } from "../controllers/user.controller.js";


const userRouter = Router()

userRouter.post('/register',register)
userRouter.post('/login',login)

userRouter.get('/get-user/',getCurrentUser)

export default userRouter