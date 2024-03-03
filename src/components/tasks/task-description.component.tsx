import { Task } from "@/interfaces/task.interface";
import { useState } from "react";
import { CardComponent } from "../common/card.component";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface TaskDescriptionProps {
  task?: Task
}

export function TaskDescription({ task }: TaskDescriptionProps) {
  const [commentary, setCommentary] = useState<string>('');
  const [commentaries, setCommentaries] = useState<string[]>([]);

  const registerCommentary = (): void => {
    if (!commentary.length) return;

    setCommentaries([...commentaries, commentary]);
  }

  return (
    <CardComponent>
      <div className="w-full flex flex-col gap-4">
        <header>
          <span>{task?.name}</span>
        </header>
        <div className="flex flex-col">
          <Textarea
            onChange={(event) => { setCommentary(event.target.value) }}
            className="resize-none"
          />
          <section className="flex flex-row justify-end">
            <Button
              onClick={() => { registerCommentary() }}
            >
              Register
            </Button>
          </section>
        </div>
      </div>
    </CardComponent>
  )
}