import React from "react";
import { getStatusColor } from "../../utils/task.utils";

function TaskCard({task,handleEdit,handleDelete,setSelectedTask,setOpenModal}) {
  return (
    <div

      className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            task.status,
          )}`}
        >
          {task.status}
        </span>
      </div>

      <p className="text-gray-600 mb-2 line-clamp-2">{task.description}</p>

      {task.description.length > 100 && (
        <button
          className="text-blue-500 text-sm hover:underline"
          onClick={() => {
            setSelectedTask(task);
            setOpenModal(true);
          }}
        >
          Read More
        </button>
      )}

      <div className="flex items-start justify-between mt-4">
        <div>
          <p className="text-sm text-gray-400">Task Assigned On :</p>
          <p className="font-medium text-gray-700">
            {new Date(task.createdAt).toDateString()}
          </p>

          <p className="text-sm text-gray-400 mt-2">Due Date :</p>
          <p className="font-medium text-gray-700">
            {new Date(task.dueDate).toDateString()}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            onClick={() => handleEdit(task.id)}
          >
            Edit
          </button>

          <button
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            onClick={() => handleDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
