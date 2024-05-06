import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog.tsx';

import { TaskApi } from '@/application/tasks/task.api';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Project } from '@/interfaces/project.interface';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';

interface CreateOrUpdateProps {
  project: Project;
  whenCreated: () => void;
}

export function CreateOrUpdateTask({ project, whenCreated }: CreateOrUpdateProps) {
  const taskApi = new TaskApi();
  const [taskName, setTaskName] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [scheduled, setScheduled] = useState<boolean>(false);

  const registerTask = async () => {
    await taskApi.create({
      name: taskName,
      description: taskDescription,
      project,
      scheduled
    }).then(() => {
      whenCreated();
      setTaskName('');
      setTaskDescription('');
    })
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'ghost'} className='flex flex-row gap-2'>
            <PlusIcon />
            New task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="font-bold">New Task</DialogHeader>
          <DialogDescription>
            Create a task for
            <span
              className="font-bold">
              {project.name}
            </span>
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
            <div className='flex flex-row items-center gap-1'>
              <Switch id='scheduled-switch' onCheckedChange={(event) => setScheduled(event)} />
              <label htmlFor="scheduled-switch" className='cursor-pointer select-none'>Are scheduled?</label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant={'secondary'}>Cancel</Button>
            </DialogClose>
            <DialogClose>
              <Button onClick={() => registerTask()}>Save</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
