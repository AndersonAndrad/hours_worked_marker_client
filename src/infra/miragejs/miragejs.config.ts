import { Day, SubTask, Task, Work } from "@/interfaces/task.interface.ts";
import { Model, createServer } from "miragejs";

import { Project } from "@/interfaces/project.interface";
import { generateHash } from "@/utils/base64.utils";

export const makeServer = () => {
  return createServer({
    models: {
      work: Model.extend<Partial<Work>>({}),
      day: Model.extend<Partial<Day>>({}),
      task: Model.extend<Partial<Task>>({}),
      subTask: Model.extend<Partial<SubTask>>({}),
      project: Model.extend<Partial<Project>>({}),
    },

    seeds(server) {},

    routes() {
      this.namespace = "api";

      /* projects */
      this.post("/projects", (schema, request) => {
        const { name, hourPrice } = request.requestBody as any;

        const project: Project = {
          _id: generateHash(),
          hourPrice,
          name,
          enable: true,
          tasks: [],
        };

        return schema.create("project", project as any).attrs;
      });

      this.get("/projects", (schema) => {
        const projects = schema.all("project").models;

        return {
          items: projects ?? [],
        };
      });

      /* work */
      this.get("/works", (schema) => {
        const users = schema.all("work").models;
        return {
          items: users,
        };
      });

      this.post("/works", (schema, request) => {
        return schema.create("work", JSON.parse(request.requestBody));
      });

      /* tasks */
      this.post("/tasks", (schema, request) => {
        const body: { taskName: string } = request.requestBody as any;

        const task: Task = {
          _id: generateHash(),
          description: "",
          finished: false,
          name: body.taskName,
          paused: false,
          start: new Date(),
          subTasks: [],
        };

        return schema.create("task", task as any).attrs;
      });

      /* sub_tasks */
      this.post("/sub-tasks", (schema, request) => {
        const body: { subTaskDescription: string } = request.requestBody as any;

        const subTask: SubTask = {
          _id: generateHash(),
          description: body.subTaskDescription,
          finished: false,
        };

        return schema.create("subTask", subTask as any).attrs;
      });
    },
  });
};
