import { Task, TaskNotation } from "@/interfaces/task.interface";
import { Trash2Icon, X } from "lucide-react";
import { useEffect, useState } from "react";

import { TaskApi } from "@/application/tasks/task.api";
import { CardComponent } from "../common/card.component";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface TaskDescriptionProps {
  task: Task,
  hidden: () => void;
}

export function TaskDescription({ task, hidden }: TaskDescriptionProps) {
  const taskApi = new TaskApi();
  const [notation, setNotation] = useState<string>('');
  const [notations, setNotations] = useState<TaskNotation[]>([]);

  useEffect(() => { loadNotations() }, [task])

  const registerCommentary = async (): Promise<void> => {
    if (!notation.length) return;

    await taskApi.addNotation(task._id, { notation }).then(() => {
      loadNotations()
      setNotation('');
    })
  }

  const loadNotations = async (): Promise<void> => {
    const response = await taskApi.getNotationsByTask(task._id)

    setNotations(response);
  }

  const hiddenNotations = () => {
    hidden();
  }

  const deleteCommentary = async (notationId: string): Promise<void> => {
    await taskApi.deleteNotations(task._id, notationId).then(() => loadNotations())
  }

  return (
    <CardComponent>
      <header className="flex flex-row justify-between items-center">
        <span>{task?.name}</span>
        <Button variant={'ghost'} onClick={() => hiddenNotations()}>
          <X />
        </Button>
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