import { CreateProject, Project } from '@/interfaces/project.interface';
import { Model, createServer } from 'miragejs';

import { Task } from '@/interfaces/task.interface.ts';
import { generateHash } from '@/utils/base64.utils';

export const makeServer = () => {
  return createServer({
    models: {
      task: Model.extend<Partial<Task>>({}),
      project: Model.extend<Partial<Project>>({}),
    },

    routes() {
      /* project */
      this.post('/project', (schema, request) => {
        const data: CreateProject = request.requestBody as any;

        const project: Project = {
          _id: generateHash(),
          enable: true,
          hashId: generateHash(),
          tasks: [],
          ...data
        };

        return schema.create('project', project as any).attrs;
      });

      this.get('/project/find-all', (schema) => {
        const projects = schema.all('project').models;

        return {
          items: projects ?? [],
        };
      });
    },
  });
};
