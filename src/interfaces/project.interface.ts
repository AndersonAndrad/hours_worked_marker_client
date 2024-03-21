import { Task } from "./task.interface";

export interface Project {
  _id: string;
  name: string;
  enable: boolean;
  tasks: Task[];
  /**
   * save always in cents
   */
  hoursPrice: number;
}
