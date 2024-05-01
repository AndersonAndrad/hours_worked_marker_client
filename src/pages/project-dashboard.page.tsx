import { FilterSideDashboard, SideFilterDashboard } from "@/components/dashboard/side-filter.component";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Task } from "@/interfaces/task.interface";

import { DashboardApi } from "@/application/dashboard/dashboard.api";
import { Container } from "@/components/common/container.component";
import { Main } from "@/components/common/main.component";
import { calculateFinishedTasksTime } from "@/utils/task.utils";
import { useState } from 'react';

export function ProjectDashboard() {
  const dashboardApi = new DashboardApi();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projectName, setProjectName] = useState<string>('no projects researched');

  const initTasks = async (filter?: Filter) => {
    await dashboardApi.findAll(filter).then(loadedTasks => {
      setTasks(loadedTasks);
    })
  }

  const implementFilters = async (filter: FilterSideDashboard) => {

    const finalFilter: Filter = {}

    if (filter?.project) {
      finalFilter['projectIds'] = [filter.project._id]
      setProjectName(filter.project.name);
    }

    await initTasks(finalFilter);
  }

  return (
    <Container>
      <header className='flex flex-row items-center justify-between'>
        <div className="flex flex-row gap-2 items-center">
          <span className="text-3xl">Dashboard</span>
          <span className="text-1xl">- {projectName}</span>
        </div>
        <SideFilterDashboard filter={async (filter) => implementFilters(filter)} />
      </header>
      <Main>
        <header className="flex flex-row gap-3">
          <Card>
            <CardHeader>
              <CardTitle>Monthly time worked</CardTitle>
              <CardDescription className="mx-auto">{calculateFinishedTasksTime(tasks)}</CardDescription>
            </CardHeader>
          </Card>
        </header>
        {/* <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            <Bar dataKey="oc" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
          </BarChart>
        </ResponsiveContainer> */}
      </Main>
    </Container>
  )
}