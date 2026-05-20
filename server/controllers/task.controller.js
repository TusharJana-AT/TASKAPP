import { messages } from "../messages/index.js";
import {
  createTask,
  destroyTask,
  fetchSingleTask,
  fetchTasks,
  
  updateTask,
} from "../services/task.service.js";
import { response } from "../utils/response.util.js";

export const addTask = async (req, res, next) => {
  try {
    const data = await createTask({ ...req.body, userId: req.user.id });
    console.log(req.user.id);

    return response(res, {
      statusCode: 200,
      message: messages.task.TASK_ADDED,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const userId = req.user.id;
    await destroyTask({ taskId, userId });

    return response(res, {
      statusCode: 200,
      message: messages.task.DELETE_TASK,
    });
  } catch (error) {
    next(error);
  }
};

export const editTask = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const userId = req.user.id;
    const edited = await updateTask({ ...req.body, taskId, userId });

    return response(res, {
      statusCode: 200,
      message: messages.general.SUCCESS,
      data: edited,
    });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 5, status } = req.query;
    const tasks = await fetchTasks({
      userId,
      page,
      limit,
      status,
    });

    return response(res, {
      statusCode: 200,
      data:tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleTask = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const data = await fetchSingleTask({ taskId });

    return response(res, {
      statusCode: 200,
      message: messages.general.SUCCESS,
      data,
    });
  } catch (error) {
    next(error);
  }
};
