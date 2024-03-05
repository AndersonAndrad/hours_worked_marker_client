import { SubTask, Task } from "@/interfaces/task.interface";
import { useEffect, useState } from "react";

import { serverApi } from "@/infra/api/server.api";
import { Trash2Icon } from "lucide-react";
import { CardComponent } from "../common/card.component";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface TaskDescriptionProps {
  task?: Task
}

export function TaskDescription({ task }: TaskDescriptionProps) {
  const [commentary, setCommentary] = useState<string>('');
  const [commentaries, setCommentaries] = useState<SubTask[]>([]);

  useEffect(() => { loadComentaries() }, [task])

  const registerCommentary = (): void => {
    if (!commentary.length) return;

    serverApi.post('/task/commentary', { commentary: commentary.trim(), task }).then(() => {
      loadComentaries();
      setCommentary('');
    })
  }

  const loadComentaries = () => {
    serverApi.get('/task/comentaries').then(({ data }) => {
      let { items } = JSON.parse(data) as { items: SubTask[] };

      if (task && items.length) {
        items = items.filter((item) => item.task._id === task._id);
      }

      setCommentaries(items);
    })
  }

  return (
    <CardComponent>
      <header>
        <span>{task?.name}</span>
      </header>
      <main className="flex flex-col">
        <Textarea
          onChange={(event) => { setCommentary(event.target.value) }}
          className="resize-none"
          value={commentary}
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
        {commentaries.map(comentary => {
          return (
            <li key={comentary._id}>
              <CardComponent>
                <div className="flex flex-row items-center justify-between">
                  {comentary.description}
                  <Button>
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