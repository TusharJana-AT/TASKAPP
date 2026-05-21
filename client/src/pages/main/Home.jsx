import React, { useEffect, useState } from "react";
import { deleteTask, getTask } from "../../api/taskAPI";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { getStatusColor } from "../../utils/task.utils";
import TaskCard from "../../components/task/TaskCard";
import FilterDropdown from "../../components/task/FilterDropdown";
import TaskModal from "../../components/task/TaskModal";
import Pagination from "../../components/task/Pagination";

function Home() {
  const [task, setTask] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");
  const [filter, setFilter] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const taskListing = async () => {
    try {
      setLoading(true);
      const res = await getTask({
        page,
        limit: 5,
        status,
      });
      console.log("MY DATA", res.data?.data);

      setTask(res.data?.data?.tasks);
      setTotalPages(res.data.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    taskListing();
  }, [page, status]);

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
      await taskListing();
      // setTask((prev) => prev.filter((p) => p.id !== id));
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
            <FilterDropdown
              filter={filter}
              setStatus={setStatus}
              setPage={setPage}
              setFilter={setFilter}
            />

            <button
              className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition"
              onClick={handleAddTask}
            >
              + Add Task
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center mt-10 text-xl font-semibold">
            Loading Tasks...
          </div>
        ) : task.length === 0 ? (
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
              <TaskCard
                key={t.id}
                task={t}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                setSelectedTask={setSelectedTask}
                setOpenModal={setOpenModal}
              />
            ))}
          </div>
        )}
        <TaskModal
          openModal={openModal}
          selectedTask={selectedTask}
          setOpenModal={setOpenModal}
        />
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}

export default Home;
