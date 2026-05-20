import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import { messages } from "../messages/index.js";

export const registerUser = async ({ name, email, password }) => {
  const exist = await User.findOne({ where: { email } });
  if (exist) {
    const err = new Error(messages.user.USER_ALREADY_EXIST);
    err.statusCode = 409;
    throw err;
  }
  const hashed = await bcrypt.hash(password,10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  const token = generateToken({ id: user.id });

  const { password: _, ...userData } = user.toJSON();
  return { user: userData, token };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    const err = new Error(messages.user.USER_NOT_FOUND);
    err.statusCode = 409;
    throw err;
  }

  const match=await bcrypt.compare(password,user.password)
  if(!match){
    const err = new Error(messages.user.WRONG_PASSWORD)
    err.statusCode=401
    throw err
  }

  const token = generateToken({id:user.id})
  const { password: _, ...userData } = user.toJSON();

  return { user: userData, token };
};


export const getUser=async({userId})=>{
  const user = await User.findOne({where:{id:userId}})

      //  console.log("YOLO ",userId);
  if(!user){
    const err=new Error('No User Found')
    err.statusCode=400
    throw err
  }

  return user
}