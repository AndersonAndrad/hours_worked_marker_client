import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

import { TaskApi } from "@/application/tasks/task.api";
import { Container } from "@/components/common/container.component";
import { Header } from "@/components/common/header.component";
import { Main } from "@/components/common/main.component";
import { CreateOrUpdateTask } from "@/components/tasks/createOrUpdateTask.component";
import { TaskDescription } from "@/components/tasks/task-description.component";
import { TaskMenu } from "@/components/tasks/task-menu.component";
import { Task } from "@/interfaces/task.interface";
import { formatDate } from "@/utils/date-converter.utils";
import { useLocation } from "react-router-dom";

export function TasksProjectPage() {
  const taskApi = new TaskApi()
  const { state: { project } } = useLocation();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task | undefined>(undefined);

  useEffect(() => { loadTasks() }, []);

  const loadTasks = async (): Promise<void> => {
    const { items } = await taskApi.findAll({ projectIds: [project._id] })

    setTasks(items)
  }

  const selectTask = (task: Task): void => {
    setTask(task);
  }

  const columns: string[] = ['Name', 'Description', 'Date', '']

  return (
    <div className="flex flex-row h-full gap-10">
      <div className={task ? 'w-3/4' : 'w-full  '}>
        <Container>
          <Header title={project.name} pathNavigation="/tasks">
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
                      className={`cursor-pointer ${task.finished ? "line-through" : ''}`}
                      onClick={() => { selectTask(task) }}
                    >{task.name}
                    </TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>{formatDate(task.start)} - {task?.finished && formatDate(task.finish)}</TableCell>
                    <TableCell>
                      <TaskMenu task={task} refreshParent={loadTasks} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Main>
        </Container>
      </div>
      {task &&
        <div className="w-2/5">
          {task && <TaskDescription task={task} />}
        </div>
      }
    </div>
  )
}