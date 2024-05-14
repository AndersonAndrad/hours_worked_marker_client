import { Filter, Task } from '@/interfaces/task.interface';

import serverApi from '@/infra/api/server.api';
import { convertCentsToMoney } from '@/utils/currency.utils';
import { buildParamsFromObject } from '@/utils/http.utils';
import { toast } from 'sonner';

export class DashboardApi {
  private readonly DASHBOARD_URL: string = 'dashboard';

  findAll(filter?: Filter): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      serverApi
        .get(`${this.DASHBOARD_URL}/tasks?${buildParamsFromObject(filter)}`)
        .then(({ data }) => {
          let tasks = data as Task[];

          tasks = tasks.map((task) => {
            task.project.hoursPrice = convertCentsToMoney(task.project.hoursPrice);

            return task;
          });

          resolve(tasks);
        })
        .catch((error) => {
          toast('Error loading tasks.', { description: error.message });
          reject(error);
        });
    });
  }
}
