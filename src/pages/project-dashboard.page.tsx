import { FilterSideDashboard, SideFilterDashboard } from "@/components/dashboard/side-filter.component";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Task } from "@/interfaces/task.interface";
import { CalcuateExpectedHoursToWork, calculateEstimatedEarned } from "@/utils/project.utils";
import { formatHoursToDDHHMMSS, parseDDHHMMSSToHours } from "@/utils/time.utils";

import { DashboardApi } from "@/application/dashboard/dashboard.api";
import { Container } from "@/components/common/container.component";
import { Main } from "@/components/common/main.component";
import { Project } from "@/interfaces/project.interface";
import { getFirstAndLastDayOfCurrentMonth } from "@/utils/date.utils";
import { allCalculators } from "@/utils/task.utils";
import { useState } from 'react';

export function ProjectDashboard() {
  const dashboardApi = new DashboardApi();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projectName, setProjectName] = useState<string>('no projects researched');
  const { finishedTask, moneyEarned } = allCalculators(tasks)
  const [project, setProject] = useState<Project>();

  const hoursToWork: number = CalcuateExpectedHoursToWork({ expectedHoursPerDay: project?.expectedHoursPerDay ?? 0, fullMonth: true });
  const calculateEspectedMoney = calculateEstimatedEarned(hoursToWork, project?.hoursPrice ?? 0);

  const initTasks = async (filter?: Filter) => {
    await dashboardApi.findAll(filter).then(loadedTasks => {
      setTasks(loadedTasks);
    })
  }

  const implementFilters = async (filter: FilterSideDashboard) => {

    const finalFilter: Filter = {}

    if (filter?.project) {
      finalFilter['hashId'] = [filter.project.hashId]
      setProjectName(filter.project.name);
      setProject(filter.project);
    }

    const { firstDate, lastDate } = getFirstAndLastDayOfCurrentMonth();

    await initTasks({ ...finalFilter, start: firstDate, finish: lastDate });
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
        <header className="grid grid-cols-4 gap-3">
          <Card>
            <CardHeader className="flex flex-col justify-center">
              <CardTitle className="text-center">Monthly time worked</CardTitle>
              <CardDescription className="mx-auto">{finishedTask} - {parseDDHHMMSSToHours(finishedTask)}</CardDescription>
            </CardHeader>
          </Card>
          <Card >
            <CardHeader className="flex flex-col justify-center">
              <CardTitle className="text-center">Estimed work hours</CardTitle>
              <CardDescription className="mx-auto">{hoursToWork}hrs - {formatHoursToDDHHMMSS(hoursToWork)}</CardDescription>
            </CardHeader>
          </Card>
          <Card >
            <CardHeader className="flex flex-col justify-center">
              <CardTitle className="text-center">All earned</CardTitle>
              <CardDescription className="mx-auto">{moneyEarned}</CardDescription>
            </CardHeader>
          </Card>
          <Card >
            <CardHeader className="flex flex-col justify-center">
              <CardTitle className="text-center">All earned estimed</CardTitle>
              <CardDescription className="mx-auto">{calculateEspectedMoney}</CardDescription>
            </CardHeader>
          </Card>
        </header>
      </Main>
    </Container>
  )
}