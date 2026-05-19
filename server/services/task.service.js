import { messages } from "../messages/index.js";
import { Task } from "../models/index.js";
import { response } from "../utils/response.util.js";

export const createTask = async ({ title, description, dueDate, userId }) => {
  if (!title || !description) {
    const err = new Error(messages.task.EMPTY_FIELD);
    err.statusCode = 400;
    throw err;
  }
  const data = await Task.create({
    title,
    description,
    dueDate,
    userId,
  });

  return data;
};

export const destroyTask = async ({ taskId, userId }) => {
  const deleted = await Task.destroy({
    where: { id: taskId, userId },
  });
  if (!deleted) {
    const err = new Error("Task not found");
    err.statusCode = 404;
    throw err;
  }
  return true;
};

export const updateTask = async ({
  title,
  description,
  status,
  dueDate,
  taskId,
  userId,
}) => {
  const [updated] = await Task.update(
    { title, description, status, dueDate },
    { where: { id: taskId, userId } },
  );
  if (!updated) {
    const err = new Error(messages.task.TASK_NOTFOUNT);
    err.statusCode = 400;
    throw err;
  }

  const editedTask = await Task.findOne({
    where: {
      id: taskId,
      userId,
    },
  });

  return editedTask;
};


export const getData = async({userId})=>{
    const data=await Task.findAll({where:{userId}})
    if(!data){
        const err=new Error(messages.general.DATA_NOT_FOUND)
        err.statusCode=400
        throw err
    }

    return data
}