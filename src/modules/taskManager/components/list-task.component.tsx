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
import { Task, Work } from '@/interfaces/task.interface';
import { useState } from 'react';
import { formatDate } from '@/app/utils/date-converter.utils.ts';

interface ListTasksProps {
    work: Work;
}

export function ListTasks( { work }: ListTasksProps ) {
    const [ task, setTask ] = useState<Task | undefined>( undefined );

    return (
        <>
            <div className="flex flex-row gap-1">
                <ul className="p-4 flex flex-col gap-2 w-full">
                    { work.tasks && work.tasks.map( task => {
                        return (
                            <li key={ task._id } id={ task._id }>
                                <div className="flex flex-col border-2 p-4 rounded-lg">
                                    <div className="flex flex-row gap-3 items-center justify-between">
                                        <div className="w-full flex flex-row gap-2 items-center text-2xl">
                                            <span className="font-bold">{ task.name }</span>
                                            <span> - { formatDate( task.start ) }</span>
                                            <span>{ task.finished ?? formatDate( task.finished ) }</span>
                                        </div>
                                        <div>
                                            <span>{ task.description }</span>
                                        </div>
                                        <div className="flex flex-row justify-end gap-2 w-full">
                                            <Alert
                                                title={ `Alert, you are deleting` }
                                                description={ `Do you want delete ${ task.name } ?` }
                                            >
                                                <Button><Trash2/></Button>
                                            </Alert>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button>Action</Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem className="flex flex-row gap-2">
                                                            <Play/>
                                                            Play
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="flex flex-row gap-2">
                                                            <Pause/>
                                                            Pause
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="flex flex-row gap-2">
                                                            <CheckCheck/>
                                                            Finish
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            {/* @TODO: remove this button and implement other method to select tasks */ }
                                            <Button onClick={ () => setTask( task ) }>select task</Button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    } ) }
                </ul>
                <div className="w-full max-w-screen-sm">
                    { task && <SubTasksComponent task={ task }/> }
                </div>
            </div>
        </>
    );
}
