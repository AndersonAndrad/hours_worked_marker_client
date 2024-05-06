import { Project } from './project.interface';
export interface Task {
  _id: string;
  name: string;
  description: string;
  project: Omit<Project, 'enabled' | 'tasks'>;
  start: Date;
  finish?: Date;
  finished: boolean;
  paused: boolean;
  notations: TaskNotation[];
  pauses: Pause[];
  scheduled: boolean;
}

export interface RegisterTask extends Pick<Task, 'name' | 'description' | 'project' | 'scheduled' | 'finish'> {
  start?: Date;
}

export interface Pause {
  _id: string;
  start: Date;
  end?: Date;
  activityBeforePause?: string;
}

export interface TaskNotation {
  _id: string;
  notation: string;
}

export interface Filter {
  projectIds?: Project['_id'][];
  start?: Date;
  finish?: Date;
  scheduled?: boolean;
}

export interface CalculatorTask {
  openedTask: string;
  finishedTask: string;
  pauseTask: string;
  moneyEarned: string;
}
