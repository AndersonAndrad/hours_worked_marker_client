import { SubTask, Task } from "@/interfaces/task.interface.ts";
import { Model, createServer } from "miragejs";

import { Project } from "@/interfaces/project.interface";
import { generateHash } from "@/utils/base64.utils";
import { faker } from "@faker-js/faker";

export const makeServer = () => {
  return createServer({
    models: {
      task: Model.extend<Partial<Task>>({}),
      subTask: Model.extend<Partial<SubTask>>({}),
      project: Model.extend<Partial<Project>>({}),
    },

    seeds(server) {
      Array.from({ length: 32 }).forEach(() => {
        faker;
        server.create("project", {
          _id: generateHash(),
          name: faker.person.jobArea(),
          enable: true,
          tasks: [],
          hourPrice: faker.finance.amount(),
        } as any);
      });
    },

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

      /* tasks */
      this.post("/tasks", (schema, request) => {
        const body: {
          taskName: string;
          project: Omit<Project, "enable" | "tasks">;
        } = request.requestBody as any;

        const task: Task = {
          _id: generateHash(),
          description: "",
          project: body.project,
          finished: false,
          name: body.taskName,
          paused: false,
          start: new Date(),
          subTasks: [],
        };

        return schema.create("task", task as any).attrs;
      });

      this.get("/tasks/projectId", (schema) => {
        const tasks = schema.all("task").models as any;

        return {
          items: tasks ?? [],
        };
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
