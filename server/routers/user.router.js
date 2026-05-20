import { Router } from "express";
import { getCurrentUser, login, register } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validations.middleware.js";
import { loginValidation, registerValidation } from "../validations/auth.validation.js";


const userRouter = Router()

userRouter.post('/register',validate(registerValidation),register)
userRouter.post('/login',validate(loginValidation),login)

userRouter.get('/get-user',verifyToken,getCurrentUser)

export default userRouter