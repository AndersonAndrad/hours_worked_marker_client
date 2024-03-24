import { ZodError, z } from "zod";

import { Task } from "@/interfaces/task.interface";

export const createTasksValidateSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  project: z.object({
    _id: z.string().min(24),
    name: z.string().min(3),
    hoursPrice: z.number().int(),
  }),
});

export const updateTasksValidateSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(3).optional(),
  project: z
    .object({
      _id: z.string().min(24).optional(),
      name: z.string().min(3).optional(),
      hoursPrice: z.number().int().optional(),
    })
    .optional(),
  finish: z.date().optional().optional(),
  finished: z.boolean().optional(),
  paused: z.boolean().optional(),
});

export const createTasksValidate = (
  task: Pick<Task, "name" | "description" | "project">
) => {
  try {
    createTasksValidateSchema.parse(task);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(JSON.parse(error.message));
    }
    throw error;
  }
};

export const updateTasksValidate = (task: Partial<Omit<Task, "start">>) => {
  try {
    updateTasksValidateSchema.parse(task);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(JSON.parse(error.message));
    }
    throw error;
  }
};
