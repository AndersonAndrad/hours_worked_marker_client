import serverApi from '@/infra/api/server.api';
import { PaginatedResponse } from '@/interfaces/paginate.interface';
import { Project } from '@/interfaces/project.interface';
import { convertCentsToMoney } from '@/utils/currency.utils';
import { buildParamsFromObject } from '@/utils/http.utils';
import { toast } from 'sonner';

export class ProjectApi {
  private readonly PROJECT_URL: string = 'project';

  update(projectId: Project['_id'], project: Partial<Omit<Project, '_id'>>): Promise<void> {
    return new Promise((resolve, reject) => {
      serverApi
        .patch(`${this.PROJECT_URL}/${projectId}`, project)
        .then(() => {
          toast('Project updated successfully.');
          resolve();
        })
        .catch((error) => {
          toast('An error occurred while trying to update the project.', { description: error.message });
          reject(error);
        });
    });
  }

  findAll(filter?: any): Promise<PaginatedResponse<Project>> {
    return new Promise((resolve, reject) => {
      serverApi
        .get(`${this.PROJECT_URL}/find-all?${buildParamsFromObject(filter)}`)
        .then(({ data }) => {
          const { items, meta } = data as PaginatedResponse<Project>;
          const paginatedResponse: PaginatedResponse<Project> = {
            items: items.map((project) => {
              return { ...project, hoursPrice: convertCentsToMoney(project.hoursPrice) };
            }),
            meta,
          };
          resolve(paginatedResponse);
        })
        .catch((error) => {
          toast('Error loading projects.', { description: error.message });
          reject(error);
        });
    });
  }

  delete(projectId: Project['_id']): Promise<void> {
    return new Promise((resolve, reject) => {
      serverApi
        .delete(`${this.PROJECT_URL}/${projectId}`)
        .then(() => {
          toast('Project deleted successfully.');
          resolve();
        })
        .catch((error) => {
          toast('An error occurred while trying to delete the project.', { description: error.message });
          reject(error);
        });
    });
  }
}
