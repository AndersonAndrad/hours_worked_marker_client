import serverApi from '@/infra/api/server.api';
import { Task } from '@/interfaces/task.interface';
import { buildParamsFromObject } from '@/utils/http.utils';
import { toast } from 'sonner';

export class DashboardApi {
  private readonly DASHBOARD_URL: string = 'dashboard';

  findAll(filter?: any): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      serverApi
        .get(`${this.DASHBOARD_URL}/tasks?${buildParamsFromObject(filter)}`)
        .then(({ data }) => {
          const tasks = data as Task[];

          resolve(tasks);
        })
        .catch((error) => {
          toast('Error loading tasks.', { description: error.message });
          reject(error);
        });
    });
  }
}
