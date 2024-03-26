import { Project } from "./project.interface";
export interface Task {
  _id: string;
  name: string;
  description: string;
  project: Omit<Project, "enabled" | "tasks">;
  start: Date;
  finish?: Date;
  finished: boolean;
  paused: boolean;
  notations: TaskNotation[];
  pauses: Pause[];
}

export interface Pause {
  _id: string;
  start: Date;
  end?: Date;
}

export interface TaskNotation {
  _id: string;
  notation: string;
}

export interface Filter {
  projectIds?: Project["_id"][];
  start?: Date;
  finish?: Date;
}
