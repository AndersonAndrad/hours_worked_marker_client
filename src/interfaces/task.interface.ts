export interface Work {
  _id: string;
  name: string;
  enable: boolean;
  days?: Day[];
}

export interface Day {
  _id: string;
  day: Date;
  tasks?: Task[];
  resume: string;
}

export interface Task {
  _id: string;
  description: string;
  start: Date;
  finish?: Date;
  finished: boolean;
  paused: boolean;
  subTasks: SubTask[];
}

export interface SubTask {
  _id: string;
  description: string;
  finished: boolean;
}
