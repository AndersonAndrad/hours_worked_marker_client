import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog.tsx';

import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { PlusIcon } from 'lucide-react';
import { Project } from '@/interfaces/project.interface';
import serverApi from "@/infra/api/server.api";
import { toast } from 'sonner';
import { useState } from 'react';

interface CreateOrUpdateProps {
  project: Project;
  whenCreated: () => void;
}

export function CreateOrUpdateTask({ project, whenCreated }: CreateOrUpdateProps) {
  const [taskName, setTaskName] = useState<string>('');

  const registerTask = () => {
    serverApi.post(`tasks`, { taskName, project })
      .then(() => {
        whenCreated();
        toast('Task created with success');
      }).catch((error) => {
        toast('Not is possible create a taks', { description: error.message });
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
          <DialogDescription>Create a task for <span
            className="font-bold">{project.name}</span></DialogDescription>
          <div>
            <div className="flex flex-col gap-1">
              <label htmlFor="task-description">Description</label>
              <Input
                id="task-description"
                onChange={(event) => setTaskName(event.target.value)}
                value={taskName}
              />
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
