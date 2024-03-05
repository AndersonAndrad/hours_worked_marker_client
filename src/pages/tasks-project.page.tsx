import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

import { Container } from "@/components/common/container.component";
import { Header } from "@/components/common/header.component";
import { Main } from "@/components/common/main.component";
import { CreateOrUpdateTask } from "@/components/tasks/createOrUpdateTask.component";
import { TaskDescription } from "@/components/tasks/task-description.component";
import { TaskMenu } from "@/components/tasks/task-menu.component";
import { serverApi } from "@/infra/api/server.api";
import { Task } from "@/interfaces/task.interface";
import { formatDate } from "@/utils/date-converter.utils";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

export function TasksProjectPage() {
  const { state: { project } } = useLocation();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task | undefined>(undefined);

  useEffect(() => { loadTasks() }, []);

  const loadTasks = (): void => {
    /**
     * @TODO change this to receive dynamic project id
     */
    serverApi.get(`tasks/projectId`)
      .then(({ data }) => {
        const { items } = JSON.parse(data) as { items: Task[] }
        /**
         * @TODO remove this filter when return data because return filtered
         */
        setTasks(items.filter(task => task.project._id === project._id));
      })
      .catch((error) => {
        toast('Error to load projects', { description: error.message })
      })
  }

  const selectTask = (task: Task): void => {
    setTask(task);
  }

  const columns: string[] = ['Name', 'Description', 'Date', '']

  return (
    <div className="flex flex-row h-full gap-10">
      <div className="w-3/4">
        <Container>
          <Header title={project.name}>
            <CreateOrUpdateTask project={project} whenCreated={loadTasks} />
          </Header>
          <Main>
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableHead key={index}>{column}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks && tasks.map(task => (
                  <TableRow key={task._id}>
                    <TableCell
                      className="cursor-pointer"
                      onClick={() => { selectTask(task) }}
                    >{task.name}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>{formatDate(task.start)} - {task?.finished && formatDate(task.finish)}</TableCell>
                    <TableCell>
                      <TaskMenu task={task} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Main>
        </Container>
      </div>
      <div className="w-2/5">
        <TaskDescription task={task} />
      </div>
    </div>
  )
}