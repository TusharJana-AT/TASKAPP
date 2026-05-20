import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editTask, getSingleTask } from "../../api/taskAPI";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const editTaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),

  description: z.string().min(5, "Description must be at least 5 characters"),

  status: z.enum(["pending", "in-progress", "completed"]),

  dueDate: z.coerce.date().refine(
    (date) => {
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      return date >= today;
    },
    {
      message: "Past dates are not allowed",
    },
  ),
});

function EditTask() {
  const { id } = useParams();
  //   const [form, setForm] = useState({
  //     title: "",
  //     description: "",
  //     dueDate: "",
  //     status: "",
  //   });
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(editTaskSchema) });
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await getSingleTask(id);
        reset({
          title: res.data?.data?.title || "",
          description: res.data?.data?.description || "",
          dueDate: res.data?.data?.dueDate?.split("T")[0] || "",
          status: res.data?.data?.status || "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchTask();
  }, []);

  const onSubmit = async (data) => {
    try {
      await editTask(data, id);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Edit Task</h2>

        <div>
          <input
            name="title"
            placeholder="Title"
            {...register("title")}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <input
            name="description"
            placeholder="description"
            type="text"
            {...register("description")}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <input
            name="dueDate"
            type="date"
            {...register("dueDate")}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>
          )}
        </div>

        <div>
          <select
            {...register("status")}
            className="w-full p-2 border rounded-lg"
          >
            <option value="pending">Pending</option>
            <option value="in-progress" id="">
              In Progress
            </option>
            <option value="completed">Completed</option>
          </select>

          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Editing" : "Edit"}
        </button>
      </form>
    </div>
  );
}

export default EditTask;
