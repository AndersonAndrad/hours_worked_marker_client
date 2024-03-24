import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger
} from '@/components/ui/dialog.tsx';
import { Task } from '@/interfaces/task.interface.ts';

import { TaskApi } from '@/application/tasks/task.api';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useState } from 'react';

interface CUSubTaskComponentProps {
    task: Task;
    refreshParent: () => void;
}


export function CUSubTask({ task, refreshParent }: CUSubTaskComponentProps) {
    const taskApi = new TaskApi();
    const [subTaskDescription, setSubTaskDescription] = useState<string>('');

    const registerSubTask = async (): Promise<void> => {
        await taskApi.addNotation(task._id, { notation: subTaskDescription }).then(() => refreshParent());
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
