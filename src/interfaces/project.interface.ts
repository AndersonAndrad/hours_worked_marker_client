import { Task } from './task.interface';

export interface Project {
  _id: string;
  name: string;
  enable: boolean;
  hashId: string;
  tasks: Task[];
  /**
   * save always in cents
   */
  hoursPrice: number;
  expectedHoursPerDay: number;
}

export interface CreateProject extends Pick<Project, 'name' | 'hoursPrice' | 'expectedHoursPerDay'> {}

export interface UpdateProject extends Partial<CreateProject> {}
