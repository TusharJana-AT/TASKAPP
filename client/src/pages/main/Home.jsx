import React, { useEffect, useState } from "react";
import { deleteTask, getTask } from "../../api/taskAPI";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { IoFilterOutline } from "react-icons/io5";

function Home() {
  const [task, setTask] = useState([]);
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");
  const [filter, setFilter] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  useEffect(() => {
    const taskListing = async () => {
      try {
        const res = await getTask({
          page,
          limit: 5,
          status,
        });
        setTask(res.data?.data?.tasks);
        setTotalPages(res.data.data.totalPages);
        // console.log(res.data.data.tasks);
      } catch (error) {
        console.log(error);
      }
    };

    taskListing();
  }, [page, status]);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  const navigate = useNavigate();

  const handleAddTask = async () => {
    try {
      navigate("/addTask");
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (id) => {
    try {
      navigate(`/editTask/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTask((prev) => prev.filter((p) => p.id !== id));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col">
      <div className="max-w-6xl mx-auto flex-1 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome {user?.name}
            </h1>
            <p className="text-gray-500 mt-1">Manage your daily tasks easily</p>
          </div>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <IoFilterOutline
                onClick={() => setFilter((prev) => !prev)}
                className="text-2xl cursor-pointer"
              />

              {filter && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 p-2 z-10">
                  <button
                    onClick={() => {
                      setStatus("");
                      setFilter(false);
                      setPage(1);
                    }}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    All
                  </button>

                  <button
                    onClick={() => {
                      setStatus("pending");
                      setFilter(false);
                      setPage(1);
                    }}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    Pending
                  </button>

                  <button
                    onClick={() => {
                      setStatus("in-progress");
                      setFilter(false);
                      setPage(1);
                    }}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    In Progress
                  </button>

                  <button
                    onClick={() => {
                      setStatus("completed");
                      setFilter(false);
                      setPage(1);
                    }}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    Completed
                  </button>
                </div>
              )}
            </div>

            <button
              className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition"
              onClick={handleAddTask}
            >
              + Add Task
            </button>
          </div>
        </div>

        {task.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              No Tasks Found
            </h2>
            <p className="text-gray-500 mt-2">
              Start by creating your first task
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {task.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {t.title}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      t.status,
                    )}`}
                  >
                    {t.status}
                  </span>
                </div>

                <p className="text-gray-600 mb-2 line-clamp-3">
                  {t.description}
                </p>

                {t.description.length > 100 && (
                  <button
                    className="text-blue-500 text-sm hover:underline"
                    onClick={() => {
                      setSelectedTask(t);
                      setOpenModal(true);
                    }}
                  >
                    Read More
                  </button>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Due Date</p>
                    <p className="font-medium text-gray-700">
                      {new Date(t.dueDate).toDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                      onClick={() => handleEdit(t.id)}
                    >
                      Edit
                    </button>

                    <button
                      className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {openModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl w-[90%] max-w-lg shadow-xl">
              <h2 className="text-2xl font-bold mb-4">{selectedTask.title}</h2>

              <p className="text-gray-700 mb-5">{selectedTask.description}</p>

              <button
                onClick={() => setOpenModal(false)}
                className="bg-black text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-8 px-6 py-3 rounded-xl">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <h1>{page}</h1>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
