import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx';
import { CheckCheck, Pause, Play, Trash2 } from 'lucide-react';

import { Alert } from '@/components/common/alert.component.tsx';
import { SubTasksComponent } from '@/components/tasks/sub-tasks.component';
import { Button } from '@/components/ui/button.tsx';
import { Work } from '@/interfaces/task.interface';
import { CUSubTask } from '@/modules/taskManager/components/CU-sub-task.component.tsx';

interface ListTasksProps {
    work: Work;
}

export function ListTasks({ work }: ListTasksProps) {

    const formatDate = (date: Date): string => {
        const newDate = new Date(date);

        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short', // 'short' will give you the abbreviated month name
            year: 'numeric',
        });

        return dateFormatter.format(newDate);
    };

    return (
        <>
            <div className='flex flex-row gap-1'>
                <ul className="p-4 flex flex-col gap-2 w-full">
                    {work.tasks && work.tasks.map(task => {
                        return (
                            <li key={task._id} id={task._id}>
                                <div className="flex flex-col border-2 p-4 rounded-lg">
                                    <div className="flex flex-row gap-3 items-center justify-between">
                                        <div className="w-full flex flex-row gap-2 items-center text-2xl">
                                            <span className='font-bold'>{task.name}</span>
                                            <span> - {formatDate(task.start)}</span>
                                            <span>{task.finished ?? formatDate(task.finished)}</span>
                                        </div>
                                        <div>
                                            <span>{task.description}</span>
                                        </div>
                                        <div className="flex flex-row justify-end gap-2 w-full">
                                            <Alert
                                                title={`Alert, you are deleting`}
                                                description={`Do you want delete ${task.name} ?`}
                                            >
                                                <Button><Trash2 /></Button>
                                            </Alert>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button>Action</Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem className="flex flex-row gap-2">
                                                            <Play />
                                                            Play
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="flex flex-row gap-2">
                                                            <Pause />
                                                            Pause
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="flex flex-row gap-2">
                                                            <CheckCheck />
                                                            Finish
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            {!task.finished && <CUSubTask task={task}></CUSubTask>}
                                        </div>
                                    </div>

                                    {/* list sub tasks */}
                                    <ul className="p-4 flex flex-col gap-2">
                                        {task.subTasks && task.subTasks.map(subTask => {
                                            return (
                                                <li key={subTask._id} id={subTask._id}>
                                                    <div className="flex flex-row items-center justify-between">
                                                        {subTask.description}
                                                        <Alert title={`Alert, you are deleting a sub task`}
                                                            description={`Do you want delete ${subTask.description} ?`}>
                                                            <Button><Trash2 /></Button>
                                                        </Alert>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <div className='w-full max-w-screen-sm'>
                    <SubTasksComponent />
                </div>
            </div>
        </>
    );
}
