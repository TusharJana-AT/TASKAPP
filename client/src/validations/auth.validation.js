import * as z from "zod";

export const addTaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),

  description: z.string().min(5, "Description must be at least 5 characters"),


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


export const editTaskSchema = z.object({
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