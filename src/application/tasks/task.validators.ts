import { ZodError, z } from 'zod';

import { Task } from '@/interfaces/task.interface';
import { organizeErrorsToPresent } from '@/utils/zod.utils';

export const updateTasksValidateSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  description: z.string().min(3).max(250).optional(),
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

export const createTasksValidate = (task: Pick<Task, 'name' | 'description' | 'project'>) => {
  try {
    z.object({
      name: z.string().min(3).max(50),
      description: z.string().min(3).max(250),
      project: z.object({
        _id: z.string().min(24),
        name: z.string().min(3),
        hoursPrice: z.number().int(),
      }),
    }).parse(task);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(organizeErrorsToPresent(error));
    }
    throw error;
  }
};

export const updateTasksValidate = (task: Partial<Omit<Task, 'start'>>) => {
  try {
    updateTasksValidateSchema.parse(task);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(JSON.parse(error.message));
    }
    throw error;
  }
};
