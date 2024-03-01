import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger
} from '@/components/ui/dialog.tsx';
import { SubTask, Task } from '@/interfaces/task.interface.ts';

import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useWork } from '@/contexts/work.context';
import { serverApi } from '@/infra/api/server.api.ts';
import { useState } from 'react';

interface CUSubTaskComponentProps {
    task: Task;
}


export function CUSubTask({ task }: CUSubTaskComponentProps) {
    const { insertSubTaskToTask } = useWork();
    const [subTaskDescription, setSubTaskDescription] = useState<string>('');

    const registerSubTask = (): void => {
        serverApi.post('sub-tasks', { subTaskDescription }).then(({ data }) => {
            const subTask: SubTask = JSON.parse(data);

            insertSubTaskToTask(subTask, task._id);
        });
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>New sub task</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader className="font-bold">New sub Task</DialogHeader>
                    <DialogDescription>Create a sub task for <span
                        className="font-bold">{task.name}</span></DialogDescription>
                    <div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="task-description">Description</label>
                            <Input
                                id="task-description"
                                onChange={(event) => setSubTaskDescription(event.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose>
                            <Button variant={'secondary'}>Cancel</Button>
                        </DialogClose>
                        <DialogClose>
                            <Button onClick={() => registerSubTask()}>Save</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
