import * as z from "zod";

export const addTaskValidation = z.object({
  title: z.string().min(3),

  description: z.string().min(5),


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

export const editTaskValidation = z.object({
  title: z.string().min(3).optional(),

  description: z.string().min(5).optional(),

  status: z.enum([
    "pending",
    "in-progress",
    "completed",
  ]).optional(),

  dueDate: z.coerce.date().refine(
    (date) => {
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      return date >= today;
    },
    {
      message: "Past dates are not allowed",
    },
  ).optional(),
});
