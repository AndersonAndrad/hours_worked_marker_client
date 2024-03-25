import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "../ui/dialog";

import { TaskApi } from "@/application/tasks/task.api";
import { Task } from "@/interfaces/task.interface";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface UpdateTaskDialog {
  task: Task;
  open: boolean;
  refresh: () => void;
}

export function UpdateTaskDialog({ task, open, refresh }: UpdateTaskDialog) {
  const taskApi = new TaskApi();
  const [taskName, setTaskName] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');

  const updateTask = async () => {
    await taskApi.update(task._id, {
      name: taskName,
      description: taskDescription,
    }).then(() => {
      refresh(),
        setTaskName('');
      setTaskDescription('');
    })
  };

  return (
    <>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader className="font-bold">Update Task</DialogHeader>
          <DialogDescription>
            Update the task <span>{task && task.name}</span>
          </DialogDescription>
          <div className='flex flex-col gap-2'>
            <div className="flex flex-col gap-1">
              <label htmlFor="task-description">Name</label>
              <Input
                id="task-description"
                onChange={(event) => setTaskName(event.target.value)}
                value={taskName}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="task-description">Description</label>
              <Textarea
                id="task-description"
                onChange={(event) => setTaskDescription(event.target.value)}
                value={taskDescription}
                className='resize-none'
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant={'secondary'} onClick={() => { open = false }} >Cancel</Button>
            </DialogClose>
            <DialogClose>
              <Button onClick={() => updateTask()}>Save</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

