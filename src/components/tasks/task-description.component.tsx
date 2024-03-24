import { Task, TaskNotation } from "@/interfaces/task.interface";
import { useEffect, useState } from "react";

import { TaskApi } from "@/application/tasks/task.api";
import serverApi from "@/infra/api/server.api";
import { Trash2Icon } from "lucide-react";
import { CardComponent } from "../common/card.component";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface TaskDescriptionProps {
  task: Task
}

export function TaskDescription({ task }: TaskDescriptionProps) {
  const taskApi = new TaskApi();
  const [notation, setNotation] = useState<string>('');
  const [notations, setNotations] = useState<TaskNotation[]>([]);

  useEffect(() => { loadNotations() }, [task])

  const registerCommentary = async (): Promise<void> => {
    if (!notation.length) return;

    await taskApi.addNotation(task._id, { notation }).then(() => loadNotations())
  }

  const loadNotations = async (): Promise<void> => {

  }

  const deleteCommentary = async (commentaryId: string): Promise<void> => {
    serverApi.delete(`/task/commentary/${commentaryId}`).then(() => {
      const filtered = notations.filter(commentary => commentary._id !== commentaryId);

      setNotations(filtered);
    })
  }

  return (
    <CardComponent>
      <header>
        <span>{task?.name}</span>
      </header>
      <main className="flex flex-col">
        <Textarea
          onChange={(event) => { setNotation(event.target.value) }}
          className="resize-none"
          value={notation}
        />
        <section className="flex flex-row justify-end">
          <Button
            onClick={() => { registerCommentary() }}
          >
            Register
          </Button>
        </section>
      </main>
      <ul className="flex flex-col gap-2">
        {notations.map(notation => {
          return (
            <li key={notation._id}>
              <CardComponent>
                <div className="flex flex-row items-center justify-between">
                  {notation.notation}
                  <Button
                    onClick={() => deleteCommentary(notation._id)}
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              </CardComponent>
            </li>
          )
        })}
      </ul>
    </CardComponent>
  )
}