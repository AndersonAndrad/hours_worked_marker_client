import { SendHorizonal, Trash2Icon } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Task, TaskNotation } from "@/interfaces/task.interface";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { TaskApi } from "@/application/tasks/task.api";
import { Textarea } from "../ui/textarea";

interface SideNotationProps {
  task: Task;
}

export function SideNotation({ task }: SideNotationProps) {
  const taskApi = new TaskApi();
  const [notation, setNotation] = useState<string>('');
  const [notations, setNotations] = useState<TaskNotation[]>([]);

  useEffect(() => { loadNotations() }, [task])

  const registerNotation = async (): Promise<void> => {
    if (!notation.length) return;

    await taskApi.addNotation(task._id, { notation }).then(() => {
      loadNotations()
      setNotation('');
    }).catch((error) => console.log(error))
  }

  const loadNotations = async (): Promise<void> => {
    const response = await taskApi.getNotationsByTask(task._id)

    setNotations(response);
  }

  const deleteCommentary = async (notationId: string): Promise<void> => {
    await taskApi.deleteNotations(task._id, notationId).then(() => loadNotations())
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className={`h-fit text-start text-wrap ${task?.finished ? 'line-through' : ''}`}>
          {task.name}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{task.name}</SheetTitle>
          <SheetDescription>Add notes to know what was done throughout the task.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-3">
          <header>
            <div>
              <label htmlFor="">Notation</label>
              <div className="flex flex-col items-center gap-2">
                <Textarea
                  onChange={(event) => setNotation(event.target.value)}
                  value={notation}
                  className="resize-none"
                />
                <Button onClick={() => registerNotation()} className="ml-auto">
                  <SendHorizonal />
                </Button>
              </div>
            </div>
          </header>
          <ScrollArea className="h-96 rounded-md border">
            {notations.map((notation) => {
              return (
                <>
                  <div key={notation._id} className="flex flex-row justify-between items-center py-3">
                    <span className="px-2">{notation.notation}</span>
                    <Button onClick={() => deleteCommentary(notation._id)} variant='destructive'>
                      <Trash2Icon />
                    </Button>
                  </div>
                  <Separator />
                </>
              )
            })}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}